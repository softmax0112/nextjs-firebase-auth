import type { NextPage } from "next";

import Header from "../components/Header";
import PostList from "../components/PostList";

const Dashboard: NextPage = () => {
  const DUMMY_DATA = [
    {
      id: 1,
      date: "12 Jun 2019",
      title: "Bitters hashtag waistcoat fashion axe",
      body: "Glossier echo park pug, church-key sartorial biodiesel vexillologist pop-up snackwave ramps cornhole.",
    },
    {
      id: 2,
      date: "12 Jun 2019",
      title: "Meditation bushwick direct trade",
      body: "Glossier echo park pug, church-key sartorial biodiesel vexillologist pop-up snackwave ramps cornhole.",
    },
  ];

  return (
    <div className="mx-auto py-0 px-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        <PostList postData={DUMMY_DATA} />
      </div>
    </div>
  );
};

export default Dashboard;
