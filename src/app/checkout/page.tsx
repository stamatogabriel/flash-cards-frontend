import { CheckoutComponent } from "@/features/checkout/CheckoutComponent";
import { PageProps } from "../../../.next/types/app/page";

export default async function Checkout({
  searchParams,
}: PageProps) {
  const planId = (await searchParams)?.plan || '';

  return <CheckoutComponent planId={planId} />;
}
