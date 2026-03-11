import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { User } from "../types";
import { api, getAuth, setAuth } from "./api";

type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: { name: string; email: string; phone?: string; password: string; avatar?: string }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => getAuth()?.user || null);
  const [token, setToken] = useState<string | null>(() => getAuth()?.token || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On refresh, validate token if present
    const init = async () => {
      try {
        if (token) {
          const me = await api.me();
          setUser(me.user);
          setAuth({ user: me.user, token });
        }
      } catch {
        setAuth(null);
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo<AuthState>(
    () => ({
      user,
      token,
      loading,
      login: async (email, password) => {
        const res = await api.login(email, password);
        setUser(res.user);
        setToken(res.token);
        setAuth(res);
      },
      register: async (payload) => {
        const res = await api.register(payload as any);
        setUser(res.user);
        setToken(res.token);
        setAuth(res);
      },
      logout: () => {
        setAuth(null);
        setUser(null);
        setToken(null);
      }
    }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
