import type { AppProps } from "next/app";
import axios from "axios";
import NextNProgress from "nextjs-progressbar";

import "../styles/globals.css";
import Layout from "components/layout/Layout";
import { AuthContextProvider } from "context/AuthContext";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <NextNProgress />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  );
}
