import { useRouter } from "next/router";
import React from "react";
import PostDetail from "../../components/PostDetail/PostDetail";
import { useAppSelector } from "../../store/hooks";
import Head from "next/head";

const PostPage = () => {
  const router = useRouter();
  const { postID } = router.query;
  const users = useAppSelector((state) => state.data.users);
  const posts = users.flatMap((each) => each.posts);
  const curPost = posts.find((post) => post.id === postID);
  if (!curPost) return <div>No Post Found</div>;
  return (
    <section>
      <Head>
        <title>Post Detail</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="../logo.png" />
      </Head>
      <PostDetail
        id={curPost!.id}
        title={curPost!.title}
        main_image={curPost!.main_image}
        author={curPost!.author_name}
        author_pic={curPost.author_profile_pic}
        body={curPost.body}
        description={curPost.description}
        time={curPost.time}
        category={curPost.category}
      />
    </section>
  );
};

export default PostPage;

// export const getStaticPaths = async () => {
//     const query =
// };
