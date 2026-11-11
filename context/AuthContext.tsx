"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { loginCustomer, registerCustomer, StoreUser, AuthResult } from "@/lib/api";

interface AuthContextType {
  user: StoreUser | null;
  jwt: string | null;
  /** false mientras se lee la sesión guardada en el navegador */
  isReady: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const JWT_KEY = "velora_jwt";
const USER_KEY = "velora_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<StoreUser | null>(null);
  const [jwt, setJwt] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Recuperar la sesión guardada
  useEffect(() => {
    try {
      const savedJwt = localStorage.getItem(JWT_KEY);
      const savedUser = localStorage.getItem(USER_KEY);
      if (savedJwt && savedUser) {
        setJwt(savedJwt);
        setUser(JSON.parse(savedUser));
      }
    } catch {
      /* sin acceso a localStorage: la sesión no se recuerda */
    }
    setIsReady(true);
  }, []);

  const saveSession = (result: AuthResult) => {
    setJwt(result.jwt);
    setUser(result.user);
    try {
      localStorage.setItem(JWT_KEY, result.jwt);
      localStorage.setItem(USER_KEY, JSON.stringify(result.user));
    } catch {
      /* ignorar */
    }
  };

  const login = async (identifier: string, password: string) => {
    saveSession(await loginCustomer(identifier, password));
  };

  const register = async (username: string, email: string, password: string) => {
    saveSession(await registerCustomer(username, email, password));
  };

  const logout = () => {
    setJwt(null);
    setUser(null);
    try {
      localStorage.removeItem(JWT_KEY);
      localStorage.removeItem(USER_KEY);
    } catch {
      /* ignorar */
    }
  };

  return (
    <AuthContext.Provider value={{ user, jwt, isReady, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
}
