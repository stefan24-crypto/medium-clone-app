import { NextPage } from "next";
import Head from "next/head";
import LikedPosts from "../components/LikedPosts/LikedPosts";

const Favourites: NextPage = () => {
  return (
    <section>
      <Head>
        <title>Favourite Posts</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="logo.png" />
      </Head>
      <LikedPosts />
    </section>
  );
};

export default Favourites;
