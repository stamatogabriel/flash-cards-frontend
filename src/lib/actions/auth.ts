"use server";

import { signIn, signOut, auth } from "@/auth";
import { headers } from "next/headers";
import { cookies } from "next/headers";

export const login = async ({ email, password, callbackUrl = null }: { email: string, password: string, callbackUrl?: string | null }) => {
  await signIn("credentials", { 
    email, 
    password, 
    redirect: true, 
    redirectTo: callbackUrl ? callbackUrl : "/dashboard/flashcards" 
  });
};

export const loginCheckout = async ({ email, password }: { email: string, password: string }) => {
  const headersList = await headers();
  const referer = headersList.get("referer") || "/checkout";
  
  const result = await signIn("credentials", { 
    email, 
    password, 
    redirect: false,
    callbackUrl: referer
  });
  
  if (result?.error) {
    throw new Error(result.error);
  }

  // Aguarda um momento para garantir que o token foi atualizado
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Tenta pegar o token da sessão
  const session = await auth();
  if (session?.access_token) {
    return result;
  }

  // Se não encontrou na sessão, tenta pegar dos cookies
  const cookieStore = cookies();
  const nextAuthSession = (await cookieStore).get("next-auth.session-token");
  
  if (!nextAuthSession) {
    throw new Error("Token não disponível após login");
  }

  // Força uma nova sessão com o token do cookie
  await auth();
  
  return result;
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};

export const getAccessToken = async () => {
  const session = await auth();

  if (session) {
    return session.access_token;
  }

  return null;
};