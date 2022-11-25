import axios from "axios";
import Head from "next/head";
import { GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";

import { Post } from "types/types";
import { useAuth } from "context/AuthContext";
import PostDetail from "components/posts/PostDetail";

export type PostProps = {
  post: Post;
};

export default function postDetailPage({ post }: PostProps) {
  const { currentUser } = useAuth();
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    if (currentUser && post.user_uid === currentUser.uid) {
      setIsAuthor(true);
    }
  }, []);

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name={post.title} content={post.body} />
      </Head>
      <PostDetail post={post} isAuthor={isAuthor} currentUser={currentUser} />
    </>
  );
}

export async function getStaticPaths() {
  const response = await axios.get("/posts");
  const posts: Post[] = response.data;

  return {
    fallback: "blocking",
    paths: posts.map((post) => ({
      params: {
        id: post.id.toString(),
      },
    })),
  };
}

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { id } = context.params as Params;

  try {
    const response = await axios.get(`/posts/${id}`);
    const post: Post = response.data;
    return {
      props: {
        post: post,
      },
    };
  } catch (err) {
    let message;
    if (axios.isAxiosError(err) && err.response) {
      console.error(err.response.data.message);
    } else {
      message = String(err);
      console.error(message);
    }
  }
};
