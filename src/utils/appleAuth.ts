import { Platform } from 'react-native';
import { supabase } from '../config/supabase';

/**
 * Apple Sign-In via Supabase OAuth (id_token flow).
 * iOS only — expo-apple-authentication is no-op on Android/Web.
 *
 * Requires:
 * - app.config.js → ios.usesAppleSignIn: true
 * - Supabase Auth → Providers → Apple enabled (Service ID + key)
 */
export async function signInWithApple() {
  if (Platform.OS !== 'ios') {
    throw new Error('Apple Sign-In is iOS-only.');
  }

  const AppleAuth = await import('expo-apple-authentication');

  const available = await AppleAuth.isAvailableAsync();
  if (!available) {
    throw new Error('Apple Sign-In is not available on this device.');
  }

  const credential = await AppleAuth.signInAsync({
    requestedScopes: [
      AppleAuth.AppleAuthenticationScope.FULL_NAME,
      AppleAuth.AppleAuthenticationScope.EMAIL,
    ],
  });

  if (!credential.identityToken) {
    throw new Error('Apple Sign-In: no identity token returned.');
  }

  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: 'apple',
    token: credential.identityToken,
  });

  if (error) throw error;

  return { user: data.user, session: data.session };
}
