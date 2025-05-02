"use server";

import { signIn, signOut, auth } from "@/auth";

export const login = async ({ email, password }: { email: string, password: string }) => {
  await signIn("credentials", { email, password, redirect: true, redirectTo: "/dashboard/flashcards" });
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