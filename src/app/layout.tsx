import type { Metadata } from "next";
import StoreProvider from "@/providers/StoreProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Roboto } from "next/font/google";
import { Layout } from "@/components/Layout";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

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
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <StoreProvider>
          <AppRouterCacheProvider>
            <Layout>{children}</Layout>
          </AppRouterCacheProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
