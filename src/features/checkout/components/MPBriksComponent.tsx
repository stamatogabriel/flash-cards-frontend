/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { setPix, setPaymentType, setStatus } from "../checkoutSlice";
import { Payment, initMercadoPago } from "@mercadopago/sdk-react";
import { IPaymentBrickCustomization } from "@mercadopago/sdk-react/esm/bricks/payment/type";
import { Paper } from "@mui/material";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function MPBriksComponent() {
  const { user } = useAppSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const initialization = {
    amount: 100,
    preferenceId: "teste",
  };

  const customization: IPaymentBrickCustomization = {
    paymentMethods: {
      atm: [],
      bankTransfer: "all",
      creditCard: "all",
      ticket: [],
      mercadoPago: [],
      maxInstallments: 1,
    },
    visual: {
      style: {
        theme: "dark",
      },
    },
  };

  const onSubmit = async ({
    selectedPaymentMethod,
    formData,
  }: {
    selectedPaymentMethod: string;
    formData: any;
  }) => {
    return new Promise((resolve, reject) => {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/signatures`;

      const paymentRequest = {
        signature_type: "teste",
        signature_value: formData.transaction_amount.toString(),
        status: "awaiting_payment",
        user_id: user?._id,
        paymentBody: formData,
      };

      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentRequest),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.qrCode) {
            dispatch(setPaymentType("pix"));
            dispatch(
              setPix({
                qrCode: response.qrCode,
                qrCodeBase64: response.qrCodeBase64,
              })
            );
            setStatus("awaiting_payment");
            router.push("/checkout/success");
            return resolve(void 0);
          }

          if (response.status === "approved") {
            dispatch(setPaymentType("card"));
            dispatch(setStatus("approved"));
            router.push("/checkout/success");
            return resolve(void 0);
          }

          dispatch(setStatus("refused"));
          router.push("/checkout/error");
          resolve(void 0);
        })
        .catch((error) => {
          console.error(error);
          reject();
        });
    });
  };
  const onError = async (error: unknown) => {
    console.log(error);
  };
  const onReady = async () => {
    console.log("MP Briks ready");
  };

  useEffect(() => {
    initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_KEY ?? "", {
      locale: "pt-BR",
    });
  }, []);

  return (
    <Paper elevation={2} sx={{ borderRadius: 4, mb: 4 }}>
      <Payment
        initialization={initialization}
        customization={customization}
        onSubmit={onSubmit}
        onReady={onReady}
        onError={onError}
      />
    </Paper>
  );
}
