import { useEffect, useState } from "react";
import moment from "moment";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { IconButton } from "@mui/material";
import { doc, Timestamp, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAppSelector } from "../../store/hooks";
import { db } from "../../firebase";

interface PostProps {
  id: string;
  title: string;
  author: string;
  pic: string;
  description: string;
  mainImage: string;
  createdAt: Timestamp;
  category: string;
}

const PostItem: React.FC<PostProps> = ({
  id,
  title,
  author,
  pic,
  description,
  mainImage,
  createdAt,
  category,
}) => {
  const clickedOnPostProfile = useAppSelector((state) => state.data.users).find(
    (each) => each.name === author
  );
  const likedByIDs = clickedOnPostProfile?.posts
    .find((each) => each.id === id)
    ?.liked_by.map((user) => user.id);
  const curUser = useAppSelector((state) => state.auth.curUser);
  const isLikedByCurUser = likedByIDs?.includes(curUser?.uid);
  const router = useRouter();

  const thisPost = clickedOnPostProfile?.posts.find((each) => each.id === id);

  const toggleLikedHandler = async () => {
    const userDoc = doc(db, "users", clickedOnPostProfile!.id);
    const otherPosts = clickedOnPostProfile?.posts.filter(
      (post) => post.id !== id
    );
    if (!isLikedByCurUser) {
      const newFields = {
        posts: [
          ...otherPosts!,
          {
            id: id,
            title: title,
            author_name: author,
            author_profile_pic: pic,
            description: description,
            body: thisPost?.body,
            category: category,
            main_image: mainImage,
            time: createdAt,
            liked_by: [
              ...thisPost!.liked_by,
              {
                id: curUser.uid,
                name: curUser.displayName,
                pic: curUser.photoURL,
              },
            ],
          },
        ],
      };
      await updateDoc(userDoc, newFields);
      return;
    } else {
      const updatedLikedBy = thisPost?.liked_by.filter(
        (user) => user.id !== curUser.uid
      );
      const newFields2 = {
        posts: [
          ...otherPosts!,
          {
            id: id,
            title: title,
            author_name: author,
            author_profile_pic: pic,
            description: description,
            body: thisPost?.body,
            category: category,
            main_image: mainImage,
            time: createdAt,
            liked_by: updatedLikedBy,
          },
        ],
      };
      await updateDoc(userDoc, newFields2);
      return;
    }
  };

  return (
    <section className="pt-8 w-full border-b">
      <div className="flex items-center  justify-between ">
        <div className="flex flex-col gap-4 w-3/4 ">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img
                src={pic}
                alt="profile"
                className="w-10 h-10 object-cover rounded-full"
              />
              <p>{author}</p>
            </div>
            ·
            <div className="text-slate-500">
              {moment(createdAt.toDate()).fromNow()}
            </div>
          </div>
          <div
            className="flex flex-col gap-4 cursor-pointer"
            onClick={() => router.push(`/post/${id}`)}
          >
            <h2 className="font-bold text-2xl text-slate-800">{title}</h2>
            <p className="font-normal text-normal font-serif">{description}</p>
          </div>
        </div>
        <div className="w-1/4 h-full flex justify-center">
          <img src={mainImage} alt="main" className="w-40 h-40 object-cover" />
        </div>
      </div>
      <footer className="flex items-center py-4">
        <div className="bg-black/10 p-1 px-2 rounded-full">
          <span className="text-xs">{category}</span>
        </div>
        <IconButton onClick={toggleLikedHandler}>
          {isLikedByCurUser ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
        </IconButton>
        <sub>{thisPost?.liked_by.length}</sub>
      </footer>
    </section>
  );
};

export default PostItem;
