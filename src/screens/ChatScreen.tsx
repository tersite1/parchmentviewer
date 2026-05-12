import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import * as Location from 'expo-location';
import { COLORS, SPACING, TYPOGRAPHY, CATEGORIES } from '../config/constants';
import { Icon } from '../components/Icon';
import type { Place, PlaceCategory } from '../types/database';
import { isSafeImageUrl } from '../utils/sanitizeUrl';

const SUPABASE_URL =
  process.env.EXPO_PUBLIC_SUPABASE_URL ?? 'https://qkvvwkimzdztalstfgol.supabase.co';
const SUPABASE_KEY =
  process.env.EXPO_PUBLIC_SUPABASE_KEY ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrdnZ3a2ltemR6dGFsc3RmZ29sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0ODMwNzMsImV4cCI6MjA5NDA1OTA3M30.qc4rlq7weETPbxrEuN_OBZZzE04evVf4Oe7Ev6smTdw';

const MAX_INPUT_LEN = 1000;
const MAX_HISTORY = 12;
const REQUEST_TIMEOUT_MS = 35_000;

interface ChatMsg {
  role: 'user' | 'assistant';
  content: string;
  places?: Place[];
  error?: boolean;
}

const GREETING: ChatMsg = {
  role: 'assistant',
  content: '안녕하세요. 어디로 떠나고 싶으세요?\n도시·분위기·카테고리 — 무엇이든 편하게 말해주세요.',
};

const QUICK_PROMPTS = [
  '대전 카페 추천',
  '분위기 좋은 술집',
  '도쿄 산책 좋은 곳',
  '서울 야경 보러 가고 싶어',
  '주변에 뭐 있어?',
];

export function ChatScreen({ navigation }: any) {
  const [messages, setMessages] = useState<ChatMsg[]>([GREETING]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [useLocation, setUseLocation] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    const t = setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 80);
    return () => clearTimeout(t);
  }, [messages, loading]);

  async function toggleLocation() {
    if (useLocation) {
      setUseLocation(false);
      setCoords(null);
      return;
    }
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('위치 권한 필요', '주변 추천을 위해 위치 권한을 허용해주세요.');
        return;
      }
      const pos = await Location.getCurrentPositionAsync({});
      setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      setUseLocation(true);
    } catch {
      Alert.alert('위치 확인 실패', '잠시 후 다시 시도해주세요.');
    }
  }

  async function sendText(textIn: string, retryHistory?: ChatMsg[]) {
    const text = textIn.trim().slice(0, MAX_INPUT_LEN);
    if (!text || loading) return;

    const base = retryHistory ?? messages;
    const next: ChatMsg[] = [...base, { role: 'user', content: text }];
    setMessages(next);
    setInput('');
    setLoading(true);

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), REQUEST_TIMEOUT_MS);

    try {
      const payload: Record<string, unknown> = {
        messages: next
          .slice(-MAX_HISTORY)
          .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_INPUT_LEN) })),
      };
      if (useLocation && coords) payload.userLocation = coords;

      const res = await fetch(`${SUPABASE_URL}/functions/v1/chat`, {
        method: 'POST',
        signal: ctrl.signal,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SUPABASE_KEY}`,
          apikey: SUPABASE_KEY,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || `HTTP ${res.status}`);
      }
      setMessages([
        ...next,
        {
          role: 'assistant',
          content: data.reply || '답변을 만들지 못했어요. 다시 한 번 말씀해주세요.',
          places: Array.isArray(data.places) ? data.places : [],
        },
      ]);
    } catch (e: any) {
      const aborted = e?.name === 'AbortError';
      setMessages([
        ...next,
        {
          role: 'assistant',
          content: aborted
            ? '응답이 너무 늦어요. 잠시 후 다시 시도해주세요.'
            : '큐레이터와 연결이 잘 안 됐어요. 잠시 후 다시 시도해주세요.',
          error: true,
        },
      ]);
    } finally {
      clearTimeout(timer);
      setLoading(false);
    }
  }

  function retryLast() {
    // 마지막 user 메시지를 찾아 이전 history로 다시 보냄
    const lastUserIdx = [...messages].reverse().findIndex((m) => m.role === 'user');
    if (lastUserIdx === -1) return;
    const idxFromStart = messages.length - 1 - lastUserIdx;
    const history = messages.slice(0, idxFromStart);
    const text = messages[idxFromStart].content;
    sendText(text, history);
  }

  const lastMsg = messages[messages.length - 1];
  const showRetry = lastMsg?.role === 'assistant' && lastMsg?.error;
  const showQuick = messages.length <= 1 && !loading;

  return (
    <KeyboardAvoidingView
      style={s.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.headerBtn}>
          <Icon name="close" size={22} color={COLORS.bone} />
        </TouchableOpacity>
        <View style={s.headerCenter}>
          <Icon name="sparkle" size={14} color={COLORS.bone} />
          <Text style={s.headerTitle}>CURATOR</Text>
        </View>
        <TouchableOpacity
          onPress={toggleLocation}
          style={[s.headerBtn, useLocation && s.headerBtnActive]}
          accessibilityLabel={useLocation ? '위치 사용 중 — 끄기' : '위치 사용 안 함 — 켜기'}
          accessibilityRole="button"
          accessibilityState={{ selected: useLocation }}
        >
          <Icon name="location" size={20} color={useLocation ? COLORS.coal : COLORS.bone} />
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={s.list}
        keyboardShouldPersistTaps="handled"
      >
        {messages.map((m, i) => (
          <View key={i} style={{ gap: SPACING.sm }}>
            <View
              style={[
                s.bubble,
                m.role === 'user' ? s.bubbleUser : s.bubbleBot,
                m.error && s.bubbleError,
              ]}
            >
              <Text
                style={[
                  s.bubbleText,
                  m.role === 'user' ? s.bubbleTextUser : s.bubbleTextBot,
                ]}
              >
                {m.content}
              </Text>
            </View>
            {m.places && m.places.length > 0 && (
              <View style={{ gap: SPACING.sm, marginTop: SPACING.xs }}>
                {m.places.map((p) => (
                  <PlaceMiniCard key={p.id} place={p} />
                ))}
              </View>
            )}
          </View>
        ))}
        {loading && (
          <View style={[s.bubble, s.bubbleBot, { flexDirection: 'row', gap: SPACING.sm }]}>
            <ActivityIndicator size="small" color={COLORS.bone} />
            <Text style={s.bubbleTextBot}>큐레이터가 살펴보는 중…</Text>
          </View>
        )}
        {showRetry && (
          <TouchableOpacity onPress={retryLast} style={s.retryBtn} activeOpacity={0.85}>
            <Text style={s.retryText}>다시 시도</Text>
          </TouchableOpacity>
        )}
        {showQuick && (
          <View style={s.chipsWrap}>
            {QUICK_PROMPTS.map((q) => (
              <TouchableOpacity
                key={q}
                style={s.chip}
                activeOpacity={0.85}
                onPress={() => sendText(q)}
              >
                <Text style={s.chipText}>{q}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      <View style={s.inputBar}>
        <TextInput
          style={s.input}
          placeholder="어디로 가고 싶으세요?"
          placeholderTextColor={COLORS.tabInactive}
          value={input}
          onChangeText={(t) => setInput(t.slice(0, MAX_INPUT_LEN))}
          editable={!loading}
          multiline
          maxLength={MAX_INPUT_LEN}
        />
        <TouchableOpacity
          onPress={() => sendText(input)}
          disabled={loading || !input.trim()}
          style={[s.sendBtn, (!input.trim() || loading) && s.sendBtnDisabled]}
          activeOpacity={0.85}
        >
          <Icon name="send" size={18} color={COLORS.coal} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

function PlaceMiniCard({ place }: { place: Place }) {
  const cat = CATEGORIES[place.category as PlaceCategory];
  const safeImg = isSafeImageUrl(place.image_url) ? place.image_url : null;
  return (
    <View style={s.miniCard} accessibilityLabel={`${place.name}, ${place.city}`}>
      {safeImg ? (
        <Image source={{ uri: safeImg }} style={s.miniImage} />
      ) : (
        <View style={[s.miniImage, { backgroundColor: COLORS.graphite }]} />
      )}
      <View style={{ flex: 1, gap: 4 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          {cat && <View style={[s.catDot, { backgroundColor: cat.color }]} />}
          <Text style={s.miniName} numberOfLines={1}>
            {place.name}
          </Text>
        </View>
        {place.address && (
          <Text style={s.miniAddr} numberOfLines={1}>
            {place.address}
          </Text>
        )}
        {place.vibe && (
          <Text style={s.miniVibe} numberOfLines={2}>
            {place.vibe}
          </Text>
        )}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.coal },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingTop: Platform.OS === 'ios' ? 56 : SPACING.md,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.glassHint,
  },
  headerBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20 },
  headerBtnActive: { backgroundColor: COLORS.bone },
  headerCenter: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  headerTitle: {
    color: COLORS.bone,
    fontSize: TYPOGRAPHY.sizes.caption,
    letterSpacing: 3,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  list: { padding: SPACING.md, gap: SPACING.md, paddingBottom: SPACING.xl },
  bubble: {
    maxWidth: '85%',
    padding: SPACING.md,
    borderRadius: 18,
  },
  bubbleUser: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.bone,
    borderBottomRightRadius: 4,
  },
  bubbleBot: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.obsidian,
    borderWidth: 1,
    borderColor: COLORS.glassHint,
    borderBottomLeftRadius: 4,
  },
  bubbleError: { borderColor: COLORS.errorAction },
  bubbleText: { fontSize: TYPOGRAPHY.sizes.body, lineHeight: 22 },
  bubbleTextUser: { color: COLORS.coal },
  bubbleTextBot: { color: COLORS.bone },
  miniCard: {
    flexDirection: 'row',
    gap: SPACING.md,
    padding: SPACING.sm,
    backgroundColor: COLORS.obsidian,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.glassHint,
    alignItems: 'center',
  },
  miniImage: { width: 72, height: 72, borderRadius: 10, backgroundColor: COLORS.graphite },
  catDot: { width: 6, height: 6, borderRadius: 3 },
  miniName: { color: COLORS.bone, fontSize: TYPOGRAPHY.sizes.md, fontWeight: TYPOGRAPHY.weights.medium, flex: 1 },
  miniAddr: { color: COLORS.tabInactive, fontSize: TYPOGRAPHY.sizes.caption },
  miniVibe: { color: COLORS.bone, fontSize: TYPOGRAPHY.sizes.caption, opacity: 0.75, lineHeight: 16 },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginTop: SPACING.sm,
  },
  chip: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.obsidian,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.glassHint,
  },
  chipText: { color: COLORS.bone, fontSize: TYPOGRAPHY.sizes.caption },
  retryBtn: {
    alignSelf: 'flex-start',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.rust,
    borderRadius: 20,
    marginTop: SPACING.xs,
  },
  retryText: { color: COLORS.bone, fontSize: TYPOGRAPHY.sizes.caption, fontWeight: TYPOGRAPHY.weights.medium },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: SPACING.sm,
    padding: SPACING.md,
    paddingBottom: Platform.OS === 'ios' ? SPACING.lg : SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.glassHint,
    backgroundColor: COLORS.coal,
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 120,
    backgroundColor: COLORS.obsidian,
    color: COLORS.bone,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + 2,
    borderRadius: 22,
    fontSize: TYPOGRAPHY.sizes.body,
    borderWidth: 1,
    borderColor: COLORS.glassHint,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.bone,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: { opacity: 0.4 },
});
