import { CheckoutComponent } from "@/features/checkout/CheckoutComponent";

export default function Checkout({
  searchParams,
}: {
  searchParams: { plan?: string };
}) {
  const planId = searchParams.plan;

  return <CheckoutComponent planId={planId || ""} />;
}
