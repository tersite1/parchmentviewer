import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Linking,
  Switch,
  ActivityIndicator,
  Image,
} from 'react-native';
import Animated, { FadeIn, FadeInRight } from 'react-native-reanimated';
import * as Haptics from '../utils/haptics';
import * as SecureStore from '../utils/secureStore';
import { storage } from '../utils/storage';
import { COLORS, SPACING, CATEGORIES } from '../config/constants';
import { Icon } from '../components/Icon';
import { Toast } from '../components/Toast';
import { useLanguageStore, LanguageOption } from '../stores/languageStore';
import { useAuthStore } from '../stores/authStore';
import { signInWithKakao } from '../utils/kakaoAuth';

interface ProfileScreenProps {
  navigation: any;
}

export function ProfileScreen({ navigation }: ProfileScreenProps) {
  const { user, loading, signIn, signUp, signOut, initialize, isAnonymous } = useAuthStore();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { language, setLanguage } = useLanguageStore();
  const [showSettings, setShowSettings] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);
  const [kakaoLoading, setKakaoLoading] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' as 'success' | 'error' | 'info' });
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ visible: true, message, type });
  };

  const toastElement = <Toast {...toast} onHide={() => setToast(t => ({ ...t, visible: false }))} />;

  // Load saved credentials on mount
  useEffect(() => {
    loadSavedCredentials();
  }, []);

  const loadSavedCredentials = async () => {
    const savedEmail = await SecureStore.getItemAsync('savedEmail');
    const savedPassword = await SecureStore.getItemAsync('savedPassword');
    const savedRemember = await storage.getItem('rememberPassword');

    if (savedRemember === 'true' && savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberPassword(true);
    }
  };

  const saveCredentials = async () => {
    if (rememberPassword) {
      await SecureStore.setItemAsync('savedEmail', email);
      await SecureStore.setItemAsync('savedPassword', password);
      await storage.setItem('rememberPassword', 'true');
    } else {
      await SecureStore.deleteItemAsync('savedEmail');
      await SecureStore.deleteItemAsync('savedPassword');
      await storage.setItem('rememberPassword', 'false');
    }
  };

  const handleKakaoLogin = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setKakaoLoading(true);

    try {
      const result = await signInWithKakao();

      if (result) {
        // Refresh auth state
        await initialize();
        showToast('환영합니다!', 'success');
      }
    } catch (error: any) {
      showToast(error.message || '카카오 로그인에 실패했습니다', 'error');
    } finally {
      setKakaoLoading(false);
    }
  };

  const handleAuth = async () => {
    if (!email || !password) {
      showToast('이메일과 비밀번호를 입력해주세요', 'error');
      return;
    }

    if (isSignUp && !name) {
      showToast('이름을 입력해주세요', 'error');
      return;
    }

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // Save credentials if remember is enabled
    await saveCredentials();

    // Supabase auth
    if (isSignUp) {
      const { error } = await signUp(email, password, name);
      if (error) {
        showToast(error, 'error');
      } else {
        showToast('환영합니다!', 'success');
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        showToast(error, 'error');
      }
    }
  };

  const handleLogout = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await signOut();
    setEmail('');
    setPassword('');
    setName('');
    setShowSettings(false);
  };

  const handleDonate = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // Open donation link (e.g., Ko-fi, Buy Me a Coffee, etc.)
    const donationUrl = 'https://toss.me/parchment';
    try {
      const supported = await Linking.canOpenURL(donationUrl);
      if (supported) {
        await Linking.openURL(donationUrl);
      } else {
        showToast('기부 페이지를 열 수 없습니다', 'error');
      }
    } catch (error) {
      showToast('기부 페이지를 열 수 없습니다', 'error');
    }
  };

  const getLanguageLabel = (lang: LanguageOption) => {
    switch (lang) {
      case 'kr': return '한국어';
      case 'en': return 'English';
      case 'all': return '모두 / All';
    }
  };

  if (showSettings) {
    return (
      <View style={styles.container}>
        {toastElement}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => setShowSettings(false)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon name="chevronLeft" size={24} color={COLORS.bone} />
          </TouchableOpacity>
          <Text style={styles.title}>설정</Text>
          <View style={{ width: 24 }} />
        </View>

        <Animated.ScrollView entering={FadeInRight.duration(250)} style={styles.settingsContent}>
          {/* Language Settings */}
          <View style={styles.settingsSection}>
            <Text style={styles.settingsSectionTitle}>언어 설정</Text>
            <Text style={styles.settingsSectionDesc}>표시할 콘텐츠 언어를 선택하세요</Text>

            <View style={styles.languageOptions}>
              {(['kr', 'en', 'all'] as LanguageOption[]).map((lang) => (
                <TouchableOpacity
                  key={lang}
                  style={[
                    styles.languageOption,
                    language === lang && styles.languageOptionActive,
                  ]}
                  onPress={async () => {
                    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setLanguage(lang);
                  }}
                >
                  <Text style={[
                    styles.languageOptionText,
                    language === lang && styles.languageOptionTextActive,
                  ]}>
                    {getLanguageLabel(lang)}
                  </Text>
                  {language === lang && (
                    <Icon name="check" size={18} color={COLORS.coal} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Donation */}
          <View style={styles.settingsSection}>
            <Text style={styles.settingsSectionTitle}>개발자 지원</Text>
            <Text style={styles.settingsSectionDesc}>Parchment를 만드는 데 도움을 주세요</Text>

            <TouchableOpacity style={styles.donateButton} onPress={handleDonate}>
              <Icon name="heart" size={20} color="#FFFFFF" />
              <Text style={styles.donateButtonText}>개발자에게 기부하기</Text>
            </TouchableOpacity>
          </View>

          {/* App Info */}
          <View style={styles.settingsSection}>
            <Text style={styles.settingsSectionTitle}>앱 정보</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>버전</Text>
              <Text style={styles.infoValue}>1.0.0</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>문의</Text>
              <Text style={styles.infoValue}>hello@parchment.app</Text>
            </View>
          </View>
        </Animated.ScrollView>
      </View>
    );
  }

  if (user && !isAnonymous) {
    const displayName = user.user_metadata?.name || user.email?.split('@')[0] || '사용자';
    const displayEmail = user.email || '';
    const avatarUrl = user.user_metadata?.avatar_url;

    return (
      <View style={styles.container}>
        {toastElement}
        <View style={styles.header}>
          <Text style={styles.title}>프로필</Text>
        </View>

        <Animated.View entering={FadeIn.duration(300)} style={styles.profileSection}>
          {avatarUrl ? (
            <Image source={{ uri: avatarUrl }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{displayName.charAt(0).toUpperCase()}</Text>
            </View>
          )}
          <Text style={styles.profileName}>{displayName}</Text>
          <Text style={styles.profileEmail}>{displayEmail}</Text>
        </Animated.View>

        <Animated.View entering={FadeIn.delay(100).duration(300)} style={styles.menuSection}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={async () => {
              await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              navigation.navigate('북마크');
            }}
          >
            <Icon name="heart" size={20} color={CATEGORIES.bar.color} />
            <Text style={styles.menuText}>내 북마크</Text>
            <Icon name="chevronRight" size={20} color={COLORS.textLight} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={async () => {
              await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              navigation.navigate('추가');
            }}
          >
            <Icon name="plus" size={20} color={CATEGORIES.cafe.color} />
            <Text style={styles.menuText}>공간 추가하기</Text>
            <Icon name="chevronRight" size={20} color={COLORS.textLight} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={async () => {
              await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setShowSettings(true);
            }}
          >
            <Icon name="settings" size={20} color={COLORS.textLight} />
            <Text style={styles.menuText}>설정</Text>
            <Icon name="chevronRight" size={20} color={COLORS.textLight} />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeIn.delay(200).duration(300)}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>로그아웃</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {toastElement}
      <ScrollView contentContainerStyle={styles.authContainer}>
        <View style={styles.authHeader}>
          <Text style={styles.authTitle}>
            {isSignUp ? '회원가입' : '로그인'}
          </Text>
          <Text style={styles.authSubtitle}>
            {isSignUp
              ? '새로운 공간을 발견하고 공유하세요'
              : '다시 오신 것을 환영합니다'}
          </Text>
        </View>

        <View style={styles.form}>
          {isSignUp && (
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>이름</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="홍길동"
                placeholderTextColor={COLORS.textLight}
                autoCapitalize="words"
              />
            </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>이메일</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="hello@example.com"
              placeholderTextColor={COLORS.textLight}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>비밀번호</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor={COLORS.textLight}
              secureTextEntry
            />
          </View>

          {/* Remember Password */}
          {!isSignUp && (
            <View style={styles.rememberRow}>
              <Text style={styles.rememberText}>로그인 정보 저장</Text>
              <Switch
                value={rememberPassword}
                onValueChange={setRememberPassword}
                trackColor={{ false: '#E0E0E0', true: COLORS.coal }}
                thumbColor={rememberPassword ? COLORS.bone : '#F4F4F4'}
              />
            </View>
          )}

          <TouchableOpacity style={styles.authButton} onPress={handleAuth} disabled={loading}>
            <Text style={styles.authButtonText}>
              {loading ? '처리중...' : isSignUp ? '가입하기' : '로그인'}
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>또는</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Kakao Login */}
          <TouchableOpacity
            style={styles.kakaoButton}
            onPress={handleKakaoLogin}
            disabled={kakaoLoading}
          >
            {kakaoLoading ? (
              <ActivityIndicator color="#191919" />
            ) : (
              <Text style={styles.kakaoButtonText}>카카오로 {isSignUp ? '가입하기' : '로그인'}</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.switchAuthMode}
            onPress={async () => {
              await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setIsSignUp(!isSignUp);
            }}
          >
            <Text style={styles.switchText}>
              {isSignUp ? '이미 계정이 있으신가요? ' : '계정이 없으신가요? '}
              <Text style={styles.switchTextHighlight}>
                {isSignUp ? '로그인' : '회원가입'}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bone,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: SPACING.xl + SPACING.lg,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
    backgroundColor: COLORS.coal,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.bone,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.coal,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: SPACING.md,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '600',
    color: COLORS.bone,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
  },
  profileEmail: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: SPACING.xs,
  },
  menuSection: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    gap: SPACING.md,
    backgroundColor: '#FFFFFF',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
  },
  logoutButton: {
    margin: SPACING.lg,
    padding: SPACING.md,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  logoutText: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  authHeader: {
    marginBottom: SPACING.xl,
  },
  authTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
  },
  authSubtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: SPACING.sm,
  },
  form: {
    gap: SPACING.md,
  },
  inputGroup: {
    gap: SPACING.xs,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + 4,
    fontSize: 16,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  authButton: {
    backgroundColor: COLORS.coal,
    borderRadius: 8,
    padding: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  authButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.bone,
  },
  switchAuthMode: {
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  switchText: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  switchTextHighlight: {
    color: COLORS.text,
    fontWeight: '500',
  },
  rememberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
  },
  rememberText: {
    fontSize: 14,
    color: COLORS.text,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    fontSize: 12,
    color: COLORS.textLight,
    marginHorizontal: SPACING.md,
  },
  kakaoButton: {
    backgroundColor: '#FEE500',
    borderRadius: 8,
    padding: SPACING.md,
    alignItems: 'center',
  },
  kakaoButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#191919',
  },
  // Settings styles
  settingsContent: {
    flex: 1,
    padding: SPACING.lg,
  },
  settingsSection: {
    marginBottom: SPACING.xl,
  },
  settingsSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  settingsSectionDesc: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: SPACING.md,
  },
  languageOptions: {
    gap: SPACING.sm,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: SPACING.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  languageOptionActive: {
    backgroundColor: COLORS.bone,
    borderColor: COLORS.coal,
    borderWidth: 2,
  },
  languageOptionText: {
    fontSize: 16,
    color: COLORS.text,
  },
  languageOptionTextActive: {
    fontWeight: '600',
  },
  donateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6B6B',
    padding: SPACING.md,
    borderRadius: 8,
    gap: SPACING.sm,
  },
  donateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  infoLabel: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  infoValue: {
    fontSize: 14,
    color: COLORS.text,
  },
});
