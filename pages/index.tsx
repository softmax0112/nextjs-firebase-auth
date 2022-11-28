import Head from "next/head";
import { GetServerSideProps } from "next";
import Link from "next/link";

import PostList from "../components/posts/PostList";
import { Post } from "types/types";
import ProtectedPage from "./protected";

type Posts = {
  posts: Post[];
};

export default function HomePage({ posts }: Posts) {
  return (
    <>
      <Head>
        <title>Firebase Auth Sample App</title>
        <meta
          name="description"
          content="This is a sample app using firebase authenticate"
        />
      </Head>
      {/* protected link below is just for test */}
      {/* <Link href="/protected">Protected</Link> */}
      <PostList posts={posts} />
    </>
  );
}

// Use Server-Side Rendering
// This value is considered fresh for ten seconds (s-maxage=10).
// If a request is repeated within the next 10 seconds, the previously
// cached value will still be fresh. If the request is repeated before 59 seconds,
// the cached value will be stale but still render (stale-while-revalidate=59).
//
// In the background, a revalidation request will be made to populate the cache
// with a fresh value. If you refresh the page, you will see the new value.
export const getServerSideProps: GetServerSideProps<{ posts: Posts }> = async (
  context
) => {
  const res = await fetch(
    "https://rails-firebase-auth-sample.herokuapp.com/api/v1/posts/"
  );

  const posts: Posts = await res.json();

  res.headers.set(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  return { props: { posts } };
};

// Use Static Site Generation
// code execute when npm run build, not on server-side or client-side
// export async function getStaticProps() {
//   try {
//     const response = await axios.get("/posts");
//     const posts: Post[] = response.data;
//     return {
//       props: {
//         posts,
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
// }
