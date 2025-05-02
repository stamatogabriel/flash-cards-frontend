"use server";

import { auth } from "@/auth";
import { UserEdit } from "@/features/user/UpdateUser";
import { Suspense } from "react";

export default async function ProfilePage() {
  const session = await auth();

  return (
    <Suspense fallback="loading...">
      <UserEdit id={session?.user?._id ?? ""} />
    </Suspense>
  );
}
