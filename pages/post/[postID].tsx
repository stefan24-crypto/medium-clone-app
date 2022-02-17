import { useRouter } from "next/router";
import React from "react";
import PostDetail from "../../components/PostDetail/PostDetail";
import { useAppSelector } from "../../store/hooks";
import Head from "next/head";
import { useAppDispatch } from "../../store/hooks";
import { auth } from "../../pages/firebase";
import { authActions } from "../../store/auth-slice";
import { useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../../pages/firebase";
import { dataActions } from "../../store/data-slice";

const PostPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { postID } = router.query;
  const users = useAppSelector((state) => state.data.users);
  const posts = users.flatMap((each) => each.posts);
  const curPost = posts.find((post) => post.id === postID);
  //Authentication
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(authActions.setCurUser(authUser));
      } else {
        dispatch(authActions.setCurUser(null));
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  //Data
  useEffect(() => {
    onSnapshot(collection(db, "users"), (snapshot) => {
      snapshot.docs.map((doc) =>
        dispatch(
          dataActions.setUsers(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          )
        )
      );
    });
  }, []);

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
