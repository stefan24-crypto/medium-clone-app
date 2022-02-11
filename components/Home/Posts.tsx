import { Post } from "../../models";
import { useAppSelector } from "../../store/hooks";
import PostItem from "./Post";
import User from "./User";

const Posts = () => {
  const users = useAppSelector((state) => state.data.users);
  const posts = users.flatMap((each) => each.posts);
  const thePosts = [...posts];
  thePosts.sort((a, b) => {
    if (a.time.toMillis() > b.time.toMillis()) return -1;
    else {
      return 1;
    }
  });
  return (
    <section className="flex">
      <section className="w-full flex flex-col items-center p-14">
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
      <section className="h-screen sticky top-0 border-l">
        <div>
          <h2 className="font-serif text-2xl p-8">Follow</h2>
        </div>
        <main>
          {users.map((user) => (
            <User
              id={user.id}
              name={user.name}
              pic={user.pic}
              bio={user.bio}
              key={user.id}
            />
          ))}
        </main>
      </section>
    </section>
  );
};

export default Posts;
