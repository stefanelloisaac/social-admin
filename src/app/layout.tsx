import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../providers/theme.provider";
import { Toaster } from "@/components/ui/sonner";

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
          {children}
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
