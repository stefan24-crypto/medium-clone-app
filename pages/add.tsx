import { NextPage } from "next";
import Head from "next/head";
import AddPost from "../components/AddPost/AddPost";
import { useAppDispatch } from "../store/hooks";
import { useEffect } from "react";
import { auth } from "../firebase";
import { authActions } from "../store/auth-slice";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../firebase";
import { dataActions } from "../store/data-slice";

const Add = () => {
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
