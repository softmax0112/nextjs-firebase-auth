const NewPostForm = (): JSX.Element => {
  return (
    <div className="container px-5 py-24 mx-auto">
      <div className="lg:w-1/2 md:w-2/3 mx-auto">
        <form className="flex flex-wrap -m-2">
          <div className="p-2 w-full">
            <div className="relative">
              <label
                htmlFor="title"
                className="leading-7 text-sm text-gray-600"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>

          <div className="p-2 w-full">
            <div className="relative">
              <label htmlFor="body" className="leading-7 text-sm text-gray-600">
                Body
              </label>
              <textarea
                id="body"
                name="body"
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              ></textarea>
            </div>
          </div>
          <div className="p-2 w-full">
            <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default NewPostForm;
