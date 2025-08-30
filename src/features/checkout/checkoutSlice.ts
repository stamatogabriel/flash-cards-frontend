import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Pix {
  qrCode: string | null;
  qrCodeBase64: string | null;
}

interface CheckoutState {
  paymentType: string | null;
  pix: Pix;
  status: string | null;
  errorMessage: string | null;
}

const initialState: CheckoutState = {
  paymentType: null,
  pix: {
    qrCode: null,
    qrCodeBase64: null
  },
  status: null,
  errorMessage: null,
};

interface SetPixPayload {
  qrCode: string;
  qrCodeBase64: string;
}

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setPaymentType: (state: CheckoutState, action: PayloadAction<string>) => {
      state.paymentType = action.payload;
    },
    setPix: (state: CheckoutState, action: PayloadAction<SetPixPayload>) => {
      state.pix = action.payload;
    },
    setStatus: (state: CheckoutState, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    setErrorMessage: (state: CheckoutState, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    }
  },
});

export const { setPaymentType, setPix, setStatus, setErrorMessage } = checkoutSlice.actions;

export default checkoutSlice.reducer;