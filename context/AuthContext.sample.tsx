// "pages/_app.tsx" when using AuthContext
// import type { AppProps } from "next/app";

// import "../styles/globals.css";
// import Layout from "../components/layout/Layout";
// import { AuthContextProvider } from "../context/AuthContext";

// export default function App({ Component, pageProps }: AppProps) {
//   return (
//     <AuthContextProvider>
//       <Layout>
//         <Component {...pageProps} />
//       </Layout>
//     </AuthContextProvider>
//   );
// }
//
// When using context
// const [user] = useContext(AuthContext)
// if (user){ do something}

import { createContext } from "react";
import { User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../lib/initFirebase";

type AuthContextProps = {
  children?: React.ReactNode;
};

export type AuthProps = {
  user: User | null | undefined;
};

export const AuthContext = createContext<AuthProps>({
  user: null,
});

export const AuthContextProvider = (props: AuthContextProps) => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error happened: {error.message}</p>
      </div>
    );
  }

  console.log(user);

  return (
    <AuthContext.Provider value={{ user }}>
      {props.children}
    </AuthContext.Provider>
  );
};
