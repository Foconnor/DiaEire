"use client";
import { Toaster } from "react-hot-toast";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster position="top-right" />
      <PayPalScriptProvider
        options={{
          clientId: "AVJuWRMOQVv6eE1g7U6orf1Su4PvRoYH2q1SPR55hZIF4J7fEZE36WaNTjDjTqY3eXL0xIj28w0vv3fb",
          currency: "EUR",
        }}
      >
        {children}
      </PayPalScriptProvider>
    </>
  );
}