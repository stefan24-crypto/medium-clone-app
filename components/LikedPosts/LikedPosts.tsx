import { useState } from "react";
import { useAppSelector } from "../../store/hooks";
import PostItem from "../Home/Post";

const LikedPosts: React.FC = () => {
  const curUser = useAppSelector((state) => state.auth.curUser);
  console.log(curUser);
  const posts = useAppSelector((state) => state.data.users).flatMap(
    (each) => each.posts
  );
  // const likedByIDs = posts.map.id
  console.log(posts);

  const likedByCurUserPosts = posts.filter((post) => {
    const likedByIDs = post.liked_by.map((user) => user.id);
    if (likedByIDs.includes(curUser?.uid)) return true;
  });

  console.log(likedByCurUserPosts);

  if (likedByCurUserPosts.length === 0)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <h1 className="font-serif text-3xl">You Have No Liked Posts</h1>
      </div>
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
          <main>
            {likedByCurUserPosts.map((post) => (
              <PostItem
                id={post!.id}
                key={post?.id}
                description={post!.description}
                mainImage={post!.main_image}
                title={post!.title}
                createdAt={post!.time}
                pic={post!.author_profile_pic}
                author={post!.author_name}
                category={post!.category}
              />
            ))}
          </main>
        </section>
      )}
    </>
  );
};

export default LikedPosts;
