import Head from "next/head";
import { GetServerSideProps } from "next";
import fetch from "node-fetch";

import { PostData } from "types/types";
import PostListItem from "components/posts/PostListItem";

type Props = {
  posts: PostData[];
};

export default function HomePage({ posts }: Props) {
  return (
    <>
      <Head>
        <title>Firebase Auth Sample App</title>
        <meta
          name="description"
          content="This is a sample app using firebase authenticate"
        />
      </Head>
      <section className="mx-auto py-10 px-8">
        <div className="px-40">
          <h3 className="text-3xl font-medium text-center">All Posts</h3>
          <div className="container py-6 mx-auto text-gray-600 body-font overflow-hidden">
            <div className="divide-y-2 divide-gray-100">
              {posts?.map((post) => (
                <PostListItem key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>
      </section>
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
export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/`);
  // const res = await fetch("http://127.0.0.1:3001/api/v1/posts/");

  const posts: PostData[] = (await res.json()) as any;

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
