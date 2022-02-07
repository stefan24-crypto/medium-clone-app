import { NextPage } from "next";
import Head from "next/head";
import AddPost from "../components/AddPost/AddPost";

const Add: NextPage = () => {
  return (
    <section className="h-full">
      <Head>
        <title>Add Post</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="logo.png" />
      </Head>
      <AddPost />
    </section>
  );
};

export default Add;
