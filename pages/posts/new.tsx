import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { useAuthContext } from "context/AuthContext";
import PostForm from "components/posts/PostForm";

export default function NewPostPage() {
  const { currentUser, loading } = useAuthContext();
  const router = useRouter();

  // Listen for changes on loading and currentUser, redirect if not logged in
  useEffect(() => {
    if (!loading && !currentUser) {
      router.push("/login");
    }
  }, [loading, currentUser]);

  return (
    <>
      <PostForm />
    </>
  );
}
