import type { AppProps } from "next/app";
import axios from "axios";

import "../styles/globals.css";
import Layout from "../components/layout/Layout";

axios.defaults.baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001/api/v1";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
