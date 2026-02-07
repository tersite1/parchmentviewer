import { makeRedirectUri } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { supabase } from '../config/supabase';

WebBrowser.maybeCompleteAuthSession();

// Use Supabase OAuth for Kakao - handles redirect properly
export async function signInWithKakao() {
  try {
    // Create redirect URL for the app
    const redirectTo = makeRedirectUri({
      scheme: 'parchment',
      path: 'auth-callback',
    });

    console.log('Kakao OAuth redirect URL:', redirectTo);

    // Use Supabase's built-in Kakao OAuth
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo,
        skipBrowserRedirect: true,
      },
    });

    if (error) throw error;
    if (!data.url) throw new Error('No OAuth URL returned');

    // Open the OAuth URL in browser
    const result = await WebBrowser.openAuthSessionAsync(
      data.url,
      redirectTo,
    );

    if (result.type === 'success' && result.url) {
      // Extract the tokens from the URL
      const url = new URL(result.url);

      // Check for hash fragment (Supabase returns tokens in hash)
      if (url.hash) {
        const params = new URLSearchParams(url.hash.substring(1));
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');

        if (accessToken && refreshToken) {
          // Set the session in Supabase
          const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (sessionError) throw sessionError;

          return {
            user: sessionData.user,
            session: sessionData.session,
          };
        }
      }

      // Check for code parameter (authorization code flow)
      const code = url.searchParams.get('code');
      if (code) {
        const { data: sessionData, error: sessionError } = await supabase.auth.exchangeCodeForSession(code);
        if (sessionError) throw sessionError;

        return {
          user: sessionData.user,
          session: sessionData.session,
        };
      }
    }

    return null;
  } catch (error) {
    console.error('Kakao OAuth error:', error);
    throw error;
  }
}

// Hook for components - simplified
export function useKakaoAuth() {
  return {
    signIn: signInWithKakao,
  };
}
