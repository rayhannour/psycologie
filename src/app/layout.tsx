import type { Metadata } from "next";
import "./globals.css";
import ConditionalNavbar from "@/components/ConditionalNavbar";

export const metadata: Metadata = {
  title: "CGPR Psycologie | L'IA au service du bien-être mental",
  description: "Espace privé et outils d'IA avancés pour les professionnels de la psychologie.",
};

import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" data-scroll-behavior="smooth">
      <body>
        <AuthProvider>
          <ConditionalNavbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
