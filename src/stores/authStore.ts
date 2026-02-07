import { create } from 'zustand';
import { supabase } from '../config/supabase';
import type { User, Session } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  initialized: boolean;
  isAnonymous: boolean;

  // Actions
  initialize: () => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  ensureSession: () => Promise<string | null>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  loading: false,
  initialized: false,
  isAnonymous: false,

  initialize: async () => {
    try {
      // Get current session
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        const isAnon = session.user?.is_anonymous ?? false;
        set({
          user: session.user,
          session,
          initialized: true,
          isAnonymous: isAnon,
        });
      } else {
        // No session - create anonymous session for bookmark sync
        const { data, error } = await supabase.auth.signInAnonymously();
        if (!error && data.session) {
          set({
            user: data.user,
            session: data.session,
            initialized: true,
            isAnonymous: true,
          });
        } else {
          set({ initialized: true });
        }
      }

      // Listen for auth changes
      supabase.auth.onAuthStateChange((_event, session) => {
        const isAnon = session?.user?.is_anonymous ?? false;
        set({
          user: session?.user ?? null,
          session,
          isAnonymous: isAnon,
        });
      });
    } catch (error) {
      console.error('Auth initialization error:', error);
      set({ initialized: true });
    }
  },

  // Ensure we have a session (anonymous or authenticated)
  ensureSession: async () => {
    const { session } = get();
    if (session) return session.user.id;

    // Try to create anonymous session
    const { data, error } = await supabase.auth.signInAnonymously();
    if (!error && data.session) {
      set({
        user: data.user,
        session: data.session,
        isAnonymous: true,
      });
      return data.user?.id ?? null;
    }
    return null;
  },

  signUp: async (email, password, name) => {
    set({ loading: true });
    try {
      const { user: currentUser } = get();

      // If currently anonymous, link the account
      if (currentUser?.is_anonymous) {
        const { data, error } = await supabase.auth.updateUser({
          email,
          password,
          data: { name },
        });

        if (error) {
          set({ loading: false });
          return { error: error.message };
        }

        set({
          user: data.user,
          loading: false,
          isAnonymous: false,
        });

        return { error: null };
      }

      // Normal signup
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      });

      if (error) {
        set({ loading: false });
        return { error: error.message };
      }

      set({
        user: data.user,
        session: data.session,
        loading: false,
        isAnonymous: false,
      });

      return { error: null };
    } catch (error: any) {
      set({ loading: false });
      return { error: error.message || '회원가입에 실패했습니다.' };
    }
  },

  signIn: async (email, password) => {
    set({ loading: true });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        set({ loading: false });
        return { error: error.message };
      }

      set({
        user: data.user,
        session: data.session,
        loading: false,
        isAnonymous: false,
      });

      return { error: null };
    } catch (error: any) {
      set({ loading: false });
      return { error: error.message || '로그인에 실패했습니다.' };
    }
  },

  signOut: async () => {
    set({ loading: true });
    try {
      await supabase.auth.signOut();

      // Create new anonymous session after logout
      const { data } = await supabase.auth.signInAnonymously();

      set({
        user: data.user ?? null,
        session: data.session ?? null,
        loading: false,
        isAnonymous: true,
      });
    } catch (error) {
      console.error('Sign out error:', error);
      set({ loading: false });
    }
  },
}));
