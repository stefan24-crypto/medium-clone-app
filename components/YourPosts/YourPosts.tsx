import Button from "../UI/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useAppSelector } from "../../store/hooks";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import PostItem from "../Home/Post";
const YourPosts: React.FC = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const curUser = useAppSelector((state) => state.auth.curUser);
  const curUserProfile = useAppSelector((state) => state.data.users).find(
    (each) => each.id === curUser?.uid
  );
  if (!curUserProfile) return <></>;
  const curUserPosts = [...curUserProfile!.posts];
  if (value === "1") {
    curUserPosts.sort((a, b) => {
      if (a.time.toMillis() > b.time.toMillis()) return -1;
      else {
        return 1;
      }
    });
  } else if (value === "2") {
    curUserPosts.sort((a, b) => {
      if (a.time.toMillis() > b.time.toMillis()) return 1;
      else {
        return -1;
      }
    });
  } else {
    curUserPosts.sort((a, b) => {
      if (a.liked_by.length > b.liked_by.length) return -1;
      else return 1;
    });
  }

  return (
    <>
      {!curUser ? (
        <section className="h-screen flex justify-center items-center">
          <h1 className="font-serif text-3xl">Please Login</h1>
        </section>
      ) : (
        <section className="p-8">
          <header className="flex flex-col gap-4">
            <h1 className="text-3xl font-serif">Your Posts</h1>
            <TabContext value={value}>
              <TabList onChange={handleChange}>
                <Tab label="Newest" value="1" />
                <Tab label="Oldest" value="2" />
                <Tab label="Most Popular" value="3" />
              </TabList>
              <TabPanel value="1">
                {curUserPosts.map((each) => (
                  <PostItem
                    id={each.id}
                    key={each.id}
                    title={each.title}
                    category={each.category}
                    author={each.author_name}
                    pic={each.author_profile_pic}
                    description={each.description}
                    createdAt={each.time}
                    mainImage={each.main_image}
                  />
                ))}
              </TabPanel>
              <TabPanel value="2">
                {curUserPosts.map((each) => (
                  <PostItem
                    id={each.id}
                    key={each.id}
                    title={each.title}
                    category={each.category}
                    author={each.author_name}
                    pic={each.author_profile_pic}
                    description={each.description}
                    createdAt={each.time}
                    mainImage={each.main_image}
                  />
                ))}
              </TabPanel>
              <TabPanel value="3">
                {" "}
                {curUserPosts.map((each) => (
                  <PostItem
                    id={each.id}
                    key={each.id}
                    title={each.title}
                    category={each.category}
                    author={each.author_name}
                    pic={each.author_profile_pic}
                    description={each.description}
                    createdAt={each.time}
                    mainImage={each.main_image}
                  />
                ))}
              </TabPanel>
            </TabContext>
          </header>
        </section>
      )}
    </>
  );
};

export default YourPosts;
