import type { AppProps } from "next/app";
import axios from "axios";
import { ToastContainer } from "react-toastify";

import "../styles/globals.css";
import Layout from "components/layout/Layout";
import { AuthContextProvider } from "context/AuthContext";

axios.defaults.baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://127.0.0.1:3001/api/v1";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        theme="colored"
      />
    </AuthContextProvider>
  );
}
