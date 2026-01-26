/* eslint-disable react-refresh/only-export-components */
// Global authentication state management using React Context.
//
// Provides user session, loading state, and auth methods (sign up, sign in, sign out).
// Synced with Supabase Auth via real-time listeners.
// Consumed by routes via useAuth() hook.
//
// Usage:
// 1. AuthProvider wraps entire app in main.tsx
// 2. Components call useAuth() to access user state and methods
// 3. RequireAuth component uses useAuth() to protect routes
//
// Session lifecycle:
// - On mount: loads current session from Supabase
// - On auth change: updates user state in real-time
// - On unmount: cleans up listeners

import type { Session, User } from "@supabase/supabase-js";
import { createContext, type ReactNode,useContext, useEffect, useMemo, useState } from "react";

import { authApi } from "@/features/auth/api";

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error?: string }>;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadSession = async () => {
      const { data, error } = await authApi.getSession();
      if (error) {
        setSession(null);
        setUser(null);
      }
      if (isMounted) {
        setSession(data.session ?? null);
        setUser(data.session?.user ?? null);
        setLoading(false);
      }
    };

    loadSession();

    const { data: listener } = authApi.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user,
      loading,
      signUp: async (email, password, fullName) => {
        const { error } = await authApi.signUp(email, password, fullName);
        if (error) {
          return { error: error.message };
        }
        return {};
      },
      signIn: async (email, password) => {
        const { error } = await authApi.signInWithPassword(email, password);
        if (error) {
          return { error: error.message };
        }
        return {};
      },
      signOut: async () => {
        await authApi.signOut();
      },
    }),
    [session, user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
