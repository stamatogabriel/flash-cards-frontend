/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { setPix, setPaymentType, setStatus, setErrorMessage } from "../checkoutSlice";
import { Payment, initMercadoPago } from "@mercadopago/sdk-react";
import { IPaymentBrickCustomization } from "@mercadopago/sdk-react/esm/bricks/payment/type";
import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function MPBriksComponent() {
  const { user } = useAppSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isProcessing, setIsProcessing] = useState(false);

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
    setIsProcessing(true);
    return new Promise((resolve, reject) => {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/signatures`;

      const paymentRequest = {
        plan_id: "67aa92e6c94be053a9bb85d8",
        signature_value: formData.transaction_amount.toString(),
        status: "awaiting_payment",
        user_id: user?._id,
        paymentBody: formData,
      };

      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(paymentRequest),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then(errorData => {
              throw new Error(errorData.message || 'Erro ao processar pagamento');
            });
          }
          return response.json();
        })
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
          const errorMessages: { [key: string]: string } = {
            'You already have an active subscription for this plan': 'Você já possui uma assinatura ativa para este plano',
            'Plan not found': 'Plano não encontrado',
            'Payment amount does not match plan value': 'O valor do pagamento não corresponde ao valor do plano',
            'Payment Refused': 'Pagamento recusado',
            'Error creating signature': 'Erro ao criar assinatura'
          };

          const errorMessage = errorMessages[error.message] || 'Ocorreu um erro ao processar seu pagamento. Por favor, tente novamente.';
          
          dispatch(setStatus("error"));
          dispatch(setErrorMessage(errorMessage));
          router.push("/checkout/error");
          reject(error);
        })
        .finally(() => {
          setIsProcessing(false);
        });
    });
  };

  const onError = async (error: unknown) => {
    console.error(error);
    setIsProcessing(false);
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
