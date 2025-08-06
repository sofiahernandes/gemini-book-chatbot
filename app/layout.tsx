import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Gia - Assistente de Produtividade",
  description: "Sua guia para foco, disciplina e resultados consistentes",
  keywords: ["produtividade", "disciplina", "foco", "assistente virtual"],
  authors: [{ name: "Sofia Botechia Hernandes" }],
  icons: { icon: "/favicon-16x16.png" },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="pt-BR" className={`${inter.variable} theme-light`}>
      <head>
        <link rel="icon" sizes="16x16" href="/favicon-16x16.png"></link>
        <link rel="icon" sizes="16x16" href="/favicon.ico"></link>
      </head>
      <body className={`${inter.className} antialiased`}>
        <Providers session={session}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
