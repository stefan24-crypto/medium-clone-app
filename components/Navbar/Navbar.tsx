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
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const users = useAppSelector((state) => state.data.users);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [showLogin, setShowLogin] = useState(false);
  const stopShowingLogin = () => {
    setShowLogin(false);
    console.log("here");
  };
  const curUser = useAppSelector((state) => state.auth.curUser);

  const curUserProfile = users.find((each) => each.id === curUser?.uid);

  const deleteAccountHandler = () => {
    const approved = prompt(
      "Are you sure you would like to delete your account, y or n? "
    );
    if (approved === "y") {
      //Remove From following and followed_by list:
      const filteredFollowing = users.map((user) =>
        user.following.map((each) => {
          if (each.id !== curUser.uid) {
            return each;
          } else {
            return null;
          }
        })
      );
      console.log(filteredFollowing);
      // const filteredFollowers = users.map((user) =>
      //   user.followed_by.filter((each) => each.id !== curUser?.uid)
      // );
      // remove from likes
      //Delete from users
      //auth.delete();
    }
    setAnchorEl(null);
  };

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
              <Avatar
                src={curUserProfile?.pic}
                alt="profile_pic"
                onClick={handleClick}
              />
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem>
                  Followers {curUserProfile?.followed_by?.length}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    auth.signOut();
                    setAnchorEl(null);
                  }}
                >
                  Logout
                </MenuItem>
                <MenuItem
                  onClick={deleteAccountHandler}
                  className="text-red-600"
                >
                  Delete
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <>
              <IconButton
                className="text-black"
                onClick={() => {
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
