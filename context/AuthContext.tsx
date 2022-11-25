import { createContext, useContext } from "react";
import useFirebaseAuth, { loginWithGoogle } from "../hooks/useFirebaseAuth";
import { User, UserCredential } from "firebase/auth";

type AuthContextProps = {
  currentUser: User | null;
  loading: boolean;
  loginWithGoogle: () => Promise<UserCredential>;
  signOut: () => Promise<void>;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
  loading: true,
  loginWithGoogle: loginWithGoogle,
  signOut: async () => {},
});

export function AuthContextProvider({ children }: AuthProviderProps) {
  const auth = useFirebaseAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
// custom hook to use the userContext and access currentUser and loading
export const useAuth = () => useContext(AuthContext);
