import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import type { AppProps } from "next/app";
import { pressStart2P } from "@/fonts";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <ToastContainer
        toastStyle={{ fontFamily: pressStart2P.className }}
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
      />
    </SessionProvider>
  );
}
