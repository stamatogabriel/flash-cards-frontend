import type { Metadata } from "next";
import { LoggedLayout } from "@/components/LoggedLayout";

export const metadata: Metadata = {
  title: "Flashy - Flashcards Inteligentes",
  description:
    "Diga adeus à procrastinação! Crie flashcards personalizados em segundos para acelerar seu aprendizado.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LoggedLayout>{children}</LoggedLayout>;
}
