import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";

import PostList from "../components/posts/PostList";
import { Post } from "types/types";
import ProtectedPage from "./protected";

type Props = {
  posts: Post[];
};

export default function HomePage() {
  const [posts, setPosts] = useState<Post[] | undefined>(undefined);

  useEffect(() => {
    const getPostData = async () => {
      const response = await axios.get("/posts/");
      const posts: Post[] = response.data;
      setPosts(posts);
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
      {/* protected link below is just for test */}
      {/* <Link href="/protected">Protected</Link> */}
      <PostList posts={posts} />
    </>
  );
}

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
