import { NextPage } from "next";
import Head from "next/head";
import YourPosts from "../components/YourPosts/YourPosts";
import { useAppDispatch } from "../store/hooks";
import { useEffect } from "react";
import { auth, db } from "../firebase";
import { onSnapshot, collection } from "firebase/firestore";
import { authActions } from "../store/auth-slice";
import { dataActions } from "../store/data-slice";

const Your_posts = () => {
  const dispatch = useAppDispatch();

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

export default Your_posts;
