import { useState } from "react";
import { Post } from "../../models";
import { useAppSelector } from "../../store/hooks";
import PostItem from "./Post";
import User from "./User";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box } from "@mui/material";

const Posts = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const curUser = useAppSelector((state) => state.auth.curUser);
  const users = useAppSelector((state) => state.data.users);
  const curUserProfile = users.find((user) => user.id === curUser?.uid);
  const otherUsers = users.filter((user) => user.id !== curUser?.uid);
  const posts = users.flatMap((each) => each.posts);
  const thePosts = [...posts];
  thePosts.sort((a, b) => {
    if (a.time.toMillis() > b.time.toMillis()) return -1;
    else {
      return 1;
    }
  });

  //Filtering
  const followedUserNames = curUserProfile?.following?.map((each) => each.name);
  const followedUserPosts = posts.filter((post) =>
    followedUserNames?.includes(post.author_name)
  );

  return (
    <section className="flex">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TabContext value={value}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            className="px-14 pt-10"
          >
            <Tab label="All" value="1" />
            <Tab label="Following" value="2" />
          </TabList>
          <TabPanel value="1">
            <section className="w-full flex flex-col items-center px-14">
              {thePosts.map((post: Post) => (
                <PostItem
                  id={post.id}
                  author={post.author_name}
                  mainImage={post.main_image}
                  key={post.id}
                  description={post.description}
                  title={post.title}
                  pic={post.author_profile_pic}
                  createdAt={post.time}
                  category={post.category}
                />
              ))}
            </section>
          </TabPanel>
          <TabPanel value="2">
            <section className="w-full p-14">
              {followedUserPosts.map((post) => (
                <PostItem
                  id={post.id}
                  author={post.author_name}
                  mainImage={post.main_image}
                  key={post.id}
                  description={post.description}
                  title={post.title}
                  pic={post.author_profile_pic}
                  createdAt={post.time}
                  category={post.category}
                />
              ))}
            </section>
          </TabPanel>
        </TabContext>
      </Box>
      <section className="h-screen sticky top-0 border-l w-2/3">
        <div>
          <h2 className="font-serif text-2xl p-8">Other People</h2>
        </div>
        <main>
          {otherUsers.map((user) => (
            <User
              id={user.id}
              name={user.name}
              bio={user.bio}
              key={user.id}
              pic={user.pic}
            />
          ))}
        </main>
      </section>
    </section>
  );
};

export default Posts;
