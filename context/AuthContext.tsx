import { createContext, useContext } from "react";
import useFirebaseAuth from "hooks/useFirebaseAuth";
import { User } from "firebase/auth";

interface AuthContext {
  currentUser: User | null;
  loading: boolean;
  loginWithGoogle: () => Promise<User | undefined>;
  logout: () => Promise<void>;
}

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthCtx = createContext({} as AuthContext);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const { currentUser, loading, loginWithGoogle, logout } = useFirebaseAuth();

  const AuthContext: AuthContext = {
    currentUser: currentUser,
    loading: true,
    loginWithGoogle: loginWithGoogle,
    logout: logout,
  };

  return <AuthCtx.Provider value={AuthContext}>{children}</AuthCtx.Provider>;
}
// custom hook to use the userContext and access currentUser and loading
export const useAuthContext = () => useContext(AuthCtx);
