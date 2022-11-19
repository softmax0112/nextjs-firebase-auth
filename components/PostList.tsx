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
    <div className="text-gray-600 body-font overflow-hidden px-6">
      <div className="container px-5 py-24 mx-auto">
        <div className="-my-8 divide-y-2 divide-gray-100"></div>
        {props.postData.map((post) => (
          <PostDetail key={post.id} postDetail={post} />
        ))}
      </div>
    </div>
  );
};

export default PostList;
