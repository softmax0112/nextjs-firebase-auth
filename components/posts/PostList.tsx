import PostListItem from "./PostListItem";
import { Post } from "types/types";

type PostListProps = {
  posts?: Post[];
};

const PostList = ({ posts }: PostListProps) => {
  return (
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
  );
};

export default PostList;
