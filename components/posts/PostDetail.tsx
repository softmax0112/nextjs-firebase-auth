import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { User } from "firebase/auth";

import { Post } from "types/types";
import { useAuthContext } from "context/AuthContext";

type Props = {
  post: Post;
  isAuthor: Boolean;
  currentUser: User | null;
};

const PostDetail = (props: Props) => {
  const { post, isAuthor } = props;
  const { currentUser } = useAuthContext();
  const router = useRouter();
  const date = new Date(post.created_at);

  const deletePost = async () => {
    const result = confirm("Want to delete?");
    if (result) {
      const token = await currentUser?.getIdToken();
      console.log("Calling API with user token:", token);

      const config = {
        headers: { authorization: `Bearer ${token}` },
      };

      try {
        const response = await axios.delete(`/posts/${post.id}`, config);
        if (response.status === 200) {
          router.push("/");
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
  };

  return (
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
            {isAuthor && (
              <Link
                href={`/posts/edit/${post.id}`}
                type="button"
                className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                Edit
              </Link>
            )}
            {isAuthor && (
              <button
                onClick={deletePost}
                className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostDetail;
