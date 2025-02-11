/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { persistor, store, AppStore } from "../lib/store";
import { PersistGate } from "redux-persist/integration/react";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) {
    storeRef.current = store;
  }

  return (
    <Provider store={storeRef.current}>
        <PersistGate persistor={persistor || {} as any} loading={null}>
          {children}
        </PersistGate>
    </Provider>
  );
}
