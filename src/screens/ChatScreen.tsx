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
} from 'react-native';
import { Image } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, CATEGORIES } from '../config/constants';
import { Icon } from '../components/Icon';
import type { Place, PlaceCategory } from '../types/database';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL ?? 'https://qkvvwkimzdztalstfgol.supabase.co';
const SUPABASE_KEY =
  process.env.EXPO_PUBLIC_SUPABASE_KEY ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrdnZ3a2ltemR6dGFsc3RmZ29sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0ODMwNzMsImV4cCI6MjA5NDA1OTA3M30.qc4rlq7weETPbxrEuN_OBZZzE04evVf4Oe7Ev6smTdw';

interface ChatMsg {
  role: 'user' | 'assistant';
  content: string;
  places?: Place[];
}

const GREETING: ChatMsg = {
  role: 'assistant',
  content: '안녕하세요. 어디로 떠나고 싶으세요?\n도시·분위기·카테고리 — 무엇이든 편하게 말해주세요.',
};

export function ChatScreen({ navigation }: any) {
  const [messages, setMessages] = useState<ChatMsg[]>([GREETING]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 80);
  }, [messages, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const next: ChatMsg[] = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SUPABASE_KEY}`,
          apikey: SUPABASE_KEY,
        },
        body: JSON.stringify({
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
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
      setMessages([
        ...next,
        {
          role: 'assistant',
          content: '큐레이터와 연결이 잘 안 됐어요. 잠시 후 다시 시도해주세요.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={s.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.headerBtn}>
          <Icon name="close" size={22} color={COLORS.bone} />
        </TouchableOpacity>
        <View style={s.headerCenter}>
          <Icon name="sparkle" size={14} color={COLORS.bone} />
          <Text style={s.headerTitle}>CURATOR</Text>
        </View>
        <View style={s.headerBtn} />
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
              ]}
            >
              <Text style={[s.bubbleText, m.role === 'user' ? s.bubbleTextUser : s.bubbleTextBot]}>
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
      </ScrollView>

      <View style={s.inputBar}>
        <TextInput
          style={s.input}
          placeholder="어디로 가고 싶으세요?"
          placeholderTextColor={COLORS.tabInactive}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={send}
          editable={!loading}
          returnKeyType="send"
          multiline
        />
        <TouchableOpacity
          onPress={send}
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
  return (
    <View style={s.miniCard}>
      {place.image_url ? (
        <Image source={{ uri: place.image_url }} style={s.miniImage} />
      ) : (
        <View style={[s.miniImage, { backgroundColor: COLORS.graphite }]} />
      )}
      <View style={{ flex: 1, gap: 4 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          {cat && <View style={[s.catDot, { backgroundColor: cat.color }]} />}
          <Text style={s.miniName} numberOfLines={1}>{place.name}</Text>
        </View>
        {place.address && (
          <Text style={s.miniAddr} numberOfLines={1}>{place.address}</Text>
        )}
        {place.vibe && (
          <Text style={s.miniVibe} numberOfLines={2}>{place.vibe}</Text>
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
  headerBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
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
