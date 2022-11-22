import { createContext } from "react";
import { signOut, User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../lib/initFirebase";

type AuthContextProps = {
  children?: React.ReactNode;
};

export type AuthProps = {
  user: User | null | undefined;
  logout: () => void;
};

export const AuthContext = createContext<AuthProps>({
  user: null,
  logout: () => {},
});

export const AuthContextProvider = (props: AuthContextProps) => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  if (error) {
    console.log(error);
    return (
      <div>
        <p>Error happened</p>
      </div>
    );
  }

  const logout = () => {
    signOut(auth);
    console.log("logged out!");
  };

  const value = {
    user,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
