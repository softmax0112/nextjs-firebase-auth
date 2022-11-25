import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

export default function ProtectedPage() {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading && !currentUser) router.push("/login");
  }, [currentUser, loading]);

  return <h1>This page only for logged in users.</h1>;
}
