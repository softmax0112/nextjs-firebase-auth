import { useState, useEffect } from "react";
import {
  User,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { auth } from "../lib/initFirebase";

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const user = await signInWithPopup(auth, provider);
  return user;
};

export default function useFirebaseAuth() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const authStateChanged = async (user: User | null) => {
    if (!user) {
      setCurrentUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setCurrentUser(user);
    setLoading(false);
  };

  const clear = () => {
    setCurrentUser(null);
    setLoading(true);
  };

  const signOut = () => auth.signOut().then(clear);

  // listen for Firebase state change
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    currentUser,
    loading,
    loginWithGoogle,
    signOut,
  };
}
