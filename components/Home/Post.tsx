import { useState } from "react";
import moment from "moment";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { IconButton } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import { useRouter } from "next/router";
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
  const [curUserLiked, setCurUserLiked] = useState(false);
  const router = useRouter();
  return (
    <section className="pt-8 w-full border-b-2">
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
        <IconButton>
          <FavoriteBorderOutlinedIcon />
        </IconButton>
      </footer>
    </section>
  );
};

export default PostItem;
