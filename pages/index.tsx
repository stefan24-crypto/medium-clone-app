import type { NextPage } from "next";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Posts from "../components/Home/Posts";
import Layout from "../components/Layout/Layout";

import { useAppDispatch } from "../store/hooks";

import { dataActions } from "../store/data-slice";
import Button from "../components/UI/Button";
import { auth, db } from "../firebase";
import { authActions } from "../store/auth-slice";
import { useRouter } from "next/router";
import { onSnapshot, collection } from "firebase/firestore";

const Home = () => {
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
        <title>Medium</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="logo.png" />
      </Head>
      <Posts />
    </section>
  );
};

export default Home;
