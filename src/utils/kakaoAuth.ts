import { Platform } from 'react-native';
import { supabase } from '../config/supabase';

// Only call maybeCompleteAuthSession on native
if (Platform.OS !== 'web') {
  import('expo-web-browser').then((WebBrowser) => {
    WebBrowser.maybeCompleteAuthSession();
  });
}

// Use Supabase OAuth for Kakao - handles redirect properly
export async function signInWithKakao() {
  try {
    const { makeRedirectUri } = await import('expo-auth-session');

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

    if (Platform.OS === 'web') {
      // On web, redirect directly
      window.location.href = data.url;
      return null;
    }

    // On native, open in-app browser
    const WebBrowser = await import('expo-web-browser');
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