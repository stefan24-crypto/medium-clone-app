import Button from "../UI/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useAppSelector } from "../../store/hooks";
const YourPosts: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const curUser = useAppSelector((state) => state.auth.curUser);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      {!curUser ? (
        <section className="h-screen flex justify-center items-center">
          <h1 className="font-serif text-3xl">Please Login</h1>
        </section>
      ) : (
        <section className="p-8">
          <header className="flex justify-between">
            <h1 className="text-3xl font-serif">Your Posts</h1>
            <Button type="button" onClick={handleClick}>
              Sort By
            </Button>
            <Menu
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
              <MenuItem>Oldest</MenuItem>
              <MenuItem>Newest</MenuItem>
              <MenuItem>Most Popular</MenuItem>
            </Menu>
          </header>
        </section>
      )}
    </>
  );
};

export default YourPosts;
