"use client";

import { usePageMetadata } from "@/hooks/use-page-metadata";
import Link from "next/link";
import { Music, ArrowRight } from "lucide-react";

export default function Home() {
  usePageMetadata({
    title: "Home",
    description: "Gerencie todas as suas redes sociais em um único lugar",
  });

  return (
    <div className="min-h-screen bg-background">
      <section className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Gerencie suas Redes Sociais
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Organize, agende e administre todos os seus posts de Instagram, Facebook, TikTok e LinkedIn em um único lugar.
          </p>
        </div>
      </section>

      <section className="py-20 px-4">
        <main className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-8">
            <Link href="/instagram">
              <div className="group bg-card rounded-lg p-8 border border-border hover:border-primary/50 transition-all cursor-pointer h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
                    <svg className="h-8 w-8 text-pink-600 dark:text-pink-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.646.069 4.85 0 3.204-.012 3.584-.07 4.85-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Instagram</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Crie, agende e analise seus posts do Instagram com facilidade.
                </p>
                <div className="flex items-center text-primary group-hover:gap-2 transition-all gap-1">
                  <span>Acessar</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>

            <Link href="/facebook">
              <div className="group bg-card rounded-lg p-8 border border-border hover:border-primary/50 transition-all cursor-pointer h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <svg className="h-8 w-8 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Facebook</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Organize e gerencie seus posts do Facebook de forma centralizada.
                </p>
                <div className="flex items-center text-primary group-hover:gap-2 transition-all gap-1">
                  <span>Acessar</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>

            <Link href="/tiktok">
              <div className="group bg-card rounded-lg p-8 border border-border hover:border-primary/50 transition-all cursor-pointer h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-black dark:bg-white/10 rounded-lg">
                    <Music className="h-8 w-8 text-black dark:text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">TikTok</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Crie, agende e controle seu conteúdo do TikTok em um único painel.
                </p>
                <div className="flex items-center text-primary group-hover:gap-2 transition-all gap-1">
                  <span>Acessar</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>

            <Link href="/linkedin">
              <div className="group bg-card rounded-lg p-8 border border-border hover:border-primary/50 transition-all cursor-pointer h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <svg className="h-8 w-8 text-blue-700 dark:text-blue-300" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.474-2.237-1.668-2.237-.909 0-1.451.614-1.688 1.205-.087.21-.109.503-.109.796v5.805h-3.554v-9.671h3.554v1.32h.05c.495-.74 1.685-1.513 3.476-1.513 3.254 0 5.759 2.141 5.759 6.744v3.12zM5.337 9.341c-1.144 0-2.063-.923-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.142-.925 2.065-2.064 2.065zm1.782 10.111H3.555v-9.671h3.564v9.671zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">LinkedIn</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Compartilhe conteúdo profissional e expanda sua rede de negócios.
                </p>
                <div className="flex items-center text-primary group-hover:gap-2 transition-all gap-1">
                  <span>Acessar</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          </div>
        </main>
      </section>

      <section className="py-20 px-4 bg-card">
        <main className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            Funcionalidades Principais
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">📅 Agendamento</h3>
              <p className="text-muted-foreground">
                Agende seus posts com antecedência e deixe o sistema publicar no momento ideal.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">🔍 Gerenciamento</h3>
              <p className="text-muted-foreground">
                Organize, edite e delete seus posts de forma intuitiva e rápida.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">🎯 Estatísticas</h3>
              <p className="text-muted-foreground">
                Visualize os números de likes, comentários e performance de cada post.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">📱 Multiplataforma</h3>
              <p className="text-muted-foreground">
                Gerencie Instagram, Facebook, TikTok e LinkedIn tudo em um único lugar.
              </p>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}
