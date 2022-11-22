import Head from "next/head";
import Link from "next/link";

import PostList from "../components/PostList";

const HomePage = () => {
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
    <>
      <Head>
        <title>Firebase Auth Sample App</title>
        <meta
          name="description"
          content="This is a sample app using firebase authenticate"
        />
      </Head>
      <PostList postData={DUMMY_DATA} />
      <Link href="/dashboard">Dashbord</Link>
    </>
  );
};

export default HomePage;
