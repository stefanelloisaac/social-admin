import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../providers/theme.provider";
import { AppSidebar } from "@/components/layout/app-sidebar";

export const metadata: Metadata = {
  title: "Social Admin",
  description: "Gerenciador de redes sociais",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          storageKey="social-admin-theme"
          disableTransitionOnChange
          enableSystem
          defaultTheme="light"
        >
          <div className="flex h-screen overflow-hidden">
            <AppSidebar />
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
