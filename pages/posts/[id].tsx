import Head from "next/head";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import fetch from "node-fetch";

import { Post } from "types/types";
import { useAuthContext } from "context/AuthContext";
import PostDetail from "components/posts/PostDetail";

export type Props = {
  post: Post;
};

export default function PostDetailPage({ post }: Props) {
  const { currentUser } = useAuthContext();
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    if (currentUser && currentUser.uid === post.user_uid) {
      setIsAuthor(true);
    }
  }, []);

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name={post?.title} content={post?.body} />
      </Head>
      <PostDetail post={post} isAuthor={isAuthor} currentUser={currentUser} />
    </>
  );
}

// Use Server-Side Rendering
export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { id } = context.query;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${id}`);

  const post: Post = (await res.json()) as any;

  res.headers.set(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  return { props: { post } };
};

// Use Static Site Generation
// export async function getStaticPaths() {
//   const response = await axios.get("/posts");
//   const posts: Post[] = response.data;

//   return {
//     fallback: "blocking",
//     paths: posts.map((post) => ({
//       params: {
//         id: post.id.toString(),
//       },
//     })),
//   };
// }

// interface Params extends ParsedUrlQuery {
//   id: string;
// }

// export const getStaticProps = async (context: GetStaticPropsContext) => {
//   const { id } = context.params as Params;

//   try {
//     const response = await axios.get(`/posts/${id}`);
//     const post: Post = response.data;
//     return {
//       props: {
//         post: post,
//       },
//       revalidate: 1,
//     };
//   } catch (err) {
//     let message;
//     if (axios.isAxiosError(err) && err.response) {
//       console.error(err.response.data.message);
//     } else {
//       message = String(err);
//       console.error(message);
//     }
//   }
// };
