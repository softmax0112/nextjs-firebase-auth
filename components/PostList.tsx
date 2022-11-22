import PostDetail from "./PostDetail";

export interface Data {
  id: number;
  date: string;
  title: string;
  body: string;
}

interface Prop {
  postData: Data[];
}

const PostList = (props: Prop): JSX.Element => {
  return (
    <section className="mx-auto py-10 px-8">
      <div className="px-40">
        <h3 className="text-3xl font-medium text-center">All Posts</h3>
        <div className="container py-6 mx-auto text-gray-600 body-font overflow-hidden">
          <div className="divide-y-2 divide-gray-100">
            {props.postData.map((post) => (
              <PostDetail key={post.id} postDetail={post} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostList;
