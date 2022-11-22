import { Data } from "./PostList";

interface Prop {
  postDetail: Data;
}

const PostDetail = (props: Prop): JSX.Element => {
  return (
    <div className="py-8 flex flex-wrap md:flex-nowrap">
      <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
        <span className="mt-1 text-gray-500 text-sm">
          {props.postDetail.date}
        </span>
      </div>
      <div className="md:flex-grow">
        <h2 className="text-2xl font-medium text-gray-800 title-font mb-2">
          {props.postDetail.title}
        </h2>
        <p className="leading-relaxed">{props.postDetail.body}</p>
      </div>
    </div>
  );
};

export default PostDetail;
