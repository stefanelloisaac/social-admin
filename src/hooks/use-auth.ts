"use client";

import { useEffect, useState } from "react";
import { createAuthClient } from "better-auth/client";

const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : "",
});

interface User {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data } = await authClient.getSession();
        setUser(data?.user ?? null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to get session");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    getSession();
  }, []);

  const translateError = (message: string): string => {
    const errorMap: Record<string, string> = {
      "Invalid email or password": "Email ou senha inválidos",
      "User not found": "Usuário não encontrado",
      "Email already exists": "Este email já está registrado",
      "Password is too short": "A senha é muito curta",
      "Invalid email": "Email inválido",
    };
    return errorMap[message] || message;
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await authClient.signIn.email({
        email,
        password,
      });

      if (response.error) {
        const errorMsg = response.error.message || "Falha ao fazer login";
        throw new Error(translateError(errorMsg));
      }

      setUser(response.data?.user ?? null);
      return response.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Falha ao fazer login";
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string = "") => {
    try {
      setIsLoading(true);
      const response = await authClient.signUp.email({
        email,
        password,
        name,
      });

      if (response.error) {
        const errorMsg = response.error.message || "Falha ao criar conta";
        throw new Error(translateError(errorMsg));
      }

      setUser(response.data?.user ?? null);
      return response.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Falha ao criar conta";
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await authClient.signOut();
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao fazer logout");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    error,
    signIn,
    signUp,
    signOut,
  };
}
