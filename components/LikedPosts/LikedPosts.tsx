import { useState } from "react";
import { useAppSelector } from "../../store/hooks";

const LikedPosts: React.FC = () => {
  const curUser = useAppSelector((state) => state.auth.curUser);

  const posts = useAppSelector((state) => state.data.users).flatMap(
    (each) => each.posts
  );

  return (
    <>
      {!curUser ? (
        <section className="h-screen flex justify-center items-center">
          <h1 className="font-serif text-3xl">Please Login</h1>
        </section>
      ) : (
        <section className="p-8">
          <header>
            <h1 className="text-3xl font-serif">Liked Posts</h1>
          </header>
          <main>{}</main>
        </section>
      )}
    </>
  );
};

export default LikedPosts;
