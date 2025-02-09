'use client';

import { useRouter } from "next/navigation";
import { PixSuccess } from "./components/PixSuccess";
import { useAppSelector } from "@/hooks/useStore";
import { CardSuccess } from "./components/CardSuccess";

export function SuccessComponent() {
  const { paymentType } = useAppSelector((state) => state.checkout);
  const router = useRouter();

  if (paymentType === 'pix') {
    return <PixSuccess />;
  }

  if (paymentType === 'card') {
    return <CardSuccess />;
  }

  router.push('/');
}