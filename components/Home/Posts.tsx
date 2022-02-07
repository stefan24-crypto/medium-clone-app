import { Post } from "../../models";
import { useAppSelector } from "../../store/hooks";
import PostItem from "./Post";

const Posts = () => {
  const users = useAppSelector((state) => state.data.users);
  const posts = users.flatMap((each) => each.posts);
  console.log(posts);
  return (
    <section className="w-full flex flex-col items-center p-14">
      {posts.map((post: Post) => (
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
  );
};

export default Posts;
