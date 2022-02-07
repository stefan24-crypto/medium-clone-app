import { NextPage } from "next";
import Head from "next/head";
import YourPosts from "../components/YourPosts/YourPosts";

const your_posts: NextPage = () => {
  return (
    <section>
      <Head>
        <title>Your Posts</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="logo.png" />
      </Head>
      <YourPosts />
    </section>
  );
};

export default your_posts;
