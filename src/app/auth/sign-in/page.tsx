"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export default function SignInPage() {
  const router = useRouter();
  const { signIn, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    }
    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await signIn(formData.email, formData.password);
      toast.success("Bem-vindo!");
      // Small delay to ensure session is set before redirect
      setTimeout(() => {
        router.push("/");
      }, 500);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao fazer login"
      );
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="p-6 space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold text-foreground">Entrar</h1>
            <p className="text-sm text-muted-foreground">
              Acesse sua conta para gerenciar suas redes sociais
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Senha
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Sua senha"
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <div className="space-y-2 text-center text-sm">
            <p className="text-muted-foreground">
              Não tem uma conta?{" "}
              <Link href="/auth/sign-up" className="text-primary hover:underline">
                Criar conta
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
