import { useState } from "react";
import logo from "../../images/medium.png";
import Image from "next/image";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import Link from "next/link";
import LoginIcon from "@mui/icons-material/Login";
import { Avatar, IconButton } from "@mui/material";
import Login from "../Login/Login";
import { useRouter } from "next/router";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import EditIcon from "@mui/icons-material/Edit";
import { useAppSelector } from "../../store/hooks";
import { LogoutOutlined, MenuBook } from "@mui/icons-material";
import { auth } from "../../firebase";
import PostAddIcon from "@mui/icons-material/PostAdd";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const Navbar: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const stopShowingLogin = () => {
    setShowLogin(false);
    console.log("here");
  };
  const curUser = useAppSelector((state) => state.auth.curUser);
  const curUserProfile = useAppSelector((state) => state.data.users).find(
    (each) => each.id === curUser?.uid
  );

  console.log(curUserProfile);

  const router = useRouter();
  return (
    <>
      {showLogin && <Login stopShowingLogin={stopShowingLogin} />}
      <nav className="h-screen w-28 border-r flex flex-col justify-between sticky top-0">
        <div className="p-8 flex justify-center align-center">
          <Image src={logo} alt="logo" width={45} height={45} />
        </div>
        <div className="flex flex-col items-center justify-center gap-8">
          <Link href="/" scroll passHref>
            {router.pathname === "/" ? (
              <HomeIcon sx={{ fontSize: "35px" }} />
            ) : (
              <HomeOutlinedIcon
                sx={{ fontSize: "35px" }}
                className="cursor-pointer w-full hover:text-black/75"
              />
            )}
          </Link>
          <Link href="/favourites" scroll passHref>
            {router.pathname === "/favourites" ? (
              <FavoriteIcon sx={{ fontSize: "35px" }} />
            ) : (
              <FavoriteBorderOutlinedIcon
                sx={{ fontSize: "35px" }}
                className="cursor-pointer w-full hover:text-black/75"
              />
            )}
          </Link>
          <Link href="/your_posts" scroll passHref>
            {router.pathname === "/your_posts" ? (
              <MenuBookIcon sx={{ fontSize: "35px" }} />
            ) : (
              <MenuBookIcon
                sx={{ fontSize: "35px" }}
                className="cursor-pointer w-full hover:text-black/75"
              />
            )}
          </Link>
          <Link href="/add" scroll passHref>
            {router.pathname === "/add" ? (
              <EditIcon sx={{ fontSize: "35px" }} />
            ) : (
              <EditOutlinedIcon
                sx={{ fontSize: "35px" }}
                className="cursor-pointer w-full hover:text-black/75"
              />
            )}
          </Link>
        </div>
        <div className="p-8">
          {curUserProfile ? (
            <div className="cursor-pointer">
              <IconButton
                className="text-black"
                onClick={() => {
                  router.push("/");
                  auth.signOut();
                }}
              >
                <LogoutOutlined />
              </IconButton>
              <Avatar src={curUserProfile?.pic} alt="profile_pic" />
            </div>
          ) : (
            <>
              <IconButton
                className="text-black"
                onClick={() => {
                  router.push("/");
                  setShowLogin(true);
                }}
              >
                <LoginIcon />
              </IconButton>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
