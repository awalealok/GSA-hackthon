import React, { createContext, useContext, useState, ReactNode } from "react";
import { loginUser, registerUser } from "../../api/auth.api";

type UserRole = "super_admin" | "store" | "supplier" | "analyst" | "demo";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // 🔐 LOGIN
  const login = async (email: string, password: string) => {
    const res = await loginUser({ email, password });

    localStorage.setItem("token", res.token);
    setUser(res.user);
  };

  // 📝 REGISTER
  const signup = async (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ) => {
    const res = await registerUser({ name, email, password, role });

    localStorage.setItem("token", res.token);
    setUser(res.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
