import axios from "axios";
import Head from "next/head";
import { GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";

import PostDetail from "../../../components//posts/PostDetail";
import { Post } from "../../index";

interface PostDetail {
  post: Post;
}

export default function postDetailPage({ post }: PostDetail) {
  const date = new Date(post.created_at);

  return (
    <>
      <Head>
        <title>Firebase Auth Sample App</title>
        <meta name={post.title} content={post.body} />
      </Head>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src="https://dummyimage.com/720x600"
            />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              {post.title}
            </h1>
            <p className="mb-4"> {date.toDateString()}</p>

            <p className="mb-8 leading-relaxed ">{post.body}</p>
            <div className="flex justify-center">
              <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                Edit
              </button>
              <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                Delete
              </button>
            </div>
          </div>
        </div>
      </section>
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
