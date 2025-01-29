import type { Metadata } from "next";
import StoreProvider from "@/providers/StoreProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

import { Roboto } from "next/font/google";
import AuthProvider from "@/providers/AuthProvider";
import { auth } from "@/auth";
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
  const session = await auth();

  return (
    <html lang="en">
      <head>
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}`}
          crossOrigin="anonymous"
        />
      </head>
      <StoreProvider>
        <AuthProvider session={session}>
          <body className={roboto.variable}>
            <AppRouterCacheProvider>
              <Layout>{children}</Layout>
            </AppRouterCacheProvider>
          </body>
        </AuthProvider>
      </StoreProvider>
    </html>
  );
}
