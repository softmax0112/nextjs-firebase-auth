import Head from "next/head";
import type { NextPage } from "next";
import Image from "next/image";

import SignIn from "../components/Signin";

const Home: NextPage = () => {
  return (
    <div className="py-0 px-8 my-30">
      <Head>
        <title>Firebase Auth Sample App</title>
        <meta
          name="description"
          content="This is a sample app using firebase authenticate"
        />
      </Head>

      <div className="max-w-lg mx-auto">
        <h1 className="text-4xl font-medium my-20 text-center">
          Firebase Auth Sample App
        </h1>
      </div>
      <SignIn />
    </div>
  );
};

export default Home;
