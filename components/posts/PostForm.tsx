import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import Head from "next/head";
import { User } from "firebase/auth";

import { Post } from "types/types";
import { useAuth } from "context/AuthContext";

type Props = {
  post?: Post;
  currentUser: User | null;
};

export default function PostForm(props: Props) {
  const { currentUser } = useAuth();
  const router = useRouter();

  // if no post varaible passed in => add new post
  const post = props?.post;
  const isAddMode = !post;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Post>();

  const onSubmit: SubmitHandler<Post> = (postData: Post) => {
    return isAddMode ? createPost(postData) : updatePost(post.id, postData);
  };

  async function setConfig() {
    const token = await currentUser?.getIdToken();
    console.log("Calling API with user token:", token);
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    return config;
  }

  async function createPost(postData: Post) {
    const config = await setConfig();

    try {
      const response = await axios.post("/posts", { post: postData }, config);
      console.log(response.data);
      if (response.status === 200) {
        alert("Post is created successfully");
        router.push("/");
        return response.data;
      }
    } catch (err) {
      let message;
      if (axios.isAxiosError(err) && err.response) {
        console.error(err.response.data.message);
      } else {
        message = String(err);
        console.error(message);
      }
    }
  }

  async function updatePost(id: number, postData: Post) {
    const config = await setConfig();

    try {
      const response = await axios.patch(
        `/posts/${id}`,
        { post: postData },
        config
      );
      console.log(response.data);
      if (response.status === 200) {
        alert("Post is updated successfully");
        router.push(`/posts/${id.toString()}`);
        return response.data;
      }
    } catch (err) {
      let message;
      if (axios.isAxiosError(err) && err.response) {
        console.error(err.response.data.message);
      } else {
        message = String(err);
        console.error(message);
      }
    }
  }

  return (
    <>
      <Head>
        <title>{post?.title || "Firebase Auth Sample App"}</title>
        <meta
          name="description"
          content={
            post?.body || "This is a sample app using firebase authenticate"
          }
        />
      </Head>
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-wrap -m-2"
          >
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="title"
                  className="leading-7 text-sm text-gray-600"
                >
                  Title
                </label>
                <input
                  {...register("title", { required: true, maxLength: 60 })}
                  defaultValue={props.post?.title}
                  aria-invalid={errors.title ? "true" : "false"}
                  type="text"
                  id="title"
                  name="title"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                {errors.title &&
                  "Title is required and should be less than 60 characters."}
              </div>
            </div>

            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="body"
                  className="leading-7 text-sm text-gray-600"
                >
                  Body
                </label>
                <textarea
                  {...register("body", { required: true, maxLength: 500 })}
                  defaultValue={props.post?.body}
                  id="body"
                  name="body"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                ></textarea>
                {errors.body &&
                  "Body is required and should be less than 500 characters."}
              </div>
            </div>
            <div className="p-2 w-full">
              <button
                type="submit"
                className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                {isAddMode ? "Create Post" : "Update Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
