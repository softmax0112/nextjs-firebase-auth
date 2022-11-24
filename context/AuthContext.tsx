import { createContext, useEffect, useState } from "react";
import { User } from "firebase/auth";

import { auth } from "../lib/initFirebase";

type AuthContextProps = {
  currentUser: User | null | undefined;
};

export const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  );

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
