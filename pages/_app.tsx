import type { AppProps } from "next/app";
import axios from "axios";

import "../styles/globals.css";
import Layout from "../components/layout/Layout";
import { AuthContextProvider } from "../context/AuthContext";

axios.defaults.baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001/api/v1";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  );
}
