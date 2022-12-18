import { useEffect } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

import { useAuthContext } from "context/AuthContext";
import PostForm from "components/posts/PostForm";
import { PostData } from "types/types";

type PostProp = {
  post: PostData;
};

export default function EditPostPage({ post }: PostProp) {
  const { currentUser } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser || currentUser.uid !== post.user_uid) {
      router.push("/login");
    }
  }, [currentUser, post.user_uid]);

  return (
    <>
      <h3 className="text-3xl font-medium text-center">Edit Post</h3>
      <PostForm postData={post} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  post: PostData;
}> = async (context) => {
  const { id } = context.query;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${id}`);
  // const res = await fetch(`http://127.0.0.1:3001/api/v1/posts/${id}`);

  const post: PostData = await res.json();

  return { props: { post } };
};
