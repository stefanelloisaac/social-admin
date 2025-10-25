"use client";

import { useEffect, useState } from "react";
import { createAuthClient } from "better-auth/client";

const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : "",
});

export function useAuth() {
  const [user, setUser] = useState<any>(null);
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

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await authClient.signIn.email({
        email,
        password,
      });

      if (response.error) {
        throw new Error("Sign in failed");
      }

      setUser(response.data?.user ?? null);
      return response.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Sign in failed";
      setError(message);
      throw err;
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
        throw new Error("Sign up failed");
      }

      setUser(response.data?.user ?? null);
      return response.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Sign up failed";
      setError(message);
      throw err;
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
      setError(err instanceof Error ? err.message : "Sign out failed");
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
