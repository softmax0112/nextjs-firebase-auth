import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";

import { useAuth } from "context/AuthContext";
import PostForm from "components/posts/PostForm";
import { Post } from "types/types";

type Props = {
  post: Post;
};

export default function EditPostPage() {
  const [postData, setPostData] = useState<Post | undefined>(undefined);
  const { currentUser } = useAuth();
  const { id } = useRouter().query;

  useEffect(() => {
    const getPostData = async () => {
      const response = await axios.get(`/posts/${id}`);
      const post: Post = response.data;
      if (!currentUser || currentUser.uid !== post.user_uid) {
        useRouter().push("/login");
      } else {
        setPostData(post);
      }
    };
    getPostData();
  }, []);

  return (
    <>
      <Head>
        <title>Firebase Auth Sample App</title>
        <meta
          name="description"
          content="This is a sample app using firebase authenticate"
        />
      </Head>
      <h3 className="text-3xl font-medium text-center">Edit Post</h3>
      <PostForm post={postData} />
    </>
  );
}
