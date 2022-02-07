import { Avatar } from "@mui/material";
import { CompositeDecorator, convertFromRaw, EditorState } from "draft-js";
import { Timestamp } from "firebase/firestore";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useAppSelector } from "../../store/hooks";
import PostItem from "../Home/Post";
const Editor = dynamic<any>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import Button from "../UI/Button";

interface PostDetailProps {
  id: string;
  title: string;
  description: string;
  body: any;
  author: string;
  author_pic: string;
  time: Timestamp;
  main_image: string;
  category: string;
}

const PostDetail: React.FC<PostDetailProps> = ({
  title,
  id,
  description,
  body,
  author,
  author_pic,
  time,
  main_image,
  category,
}) => {
  const router = useRouter();
  const posts = useAppSelector((state) => state.data.users).flatMap(
    (each) => each.posts
  );
  const relatedPosts = posts.filter(
    (each) => each.category === category && each.id !== id
  );
  const Link = (props: any) => {
    const { url } = props.contentState.getEntity(props.entityKey).getData();
    return (
      <a rel="nofollow noreferrer" href={url} target="_blank">
        {props.children}
      </a>
    );
  };
  function findLinkEntities(
    contentBlock: any,
    callback: any,
    contentState: any
  ) {
    contentBlock.findEntityRanges((character: any) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === "LINK"
      );
    }, callback);
  }
  const decorator = new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link,
    },
  ]);

  const convertToEditorState = (editorContent: any) => {
    const content = convertFromRaw(JSON.parse(editorContent));
    const editorState = EditorState.createWithContent(content, decorator);
    return editorState;
  };

  return (
    <section className="p-8 w-1/2 mx-auto">
      <header className="flex flex-col gap-8">
        <div className="flex gap-4 items-center">
          <div>
            <Avatar src={author_pic} alt="profile" />
          </div>
          <div>
            <p className="font-semibold text-lg">{author}</p>
            <span className="text-sm font-semibold text-zinc-700">
              {time.toDate().toDateString()}
            </span>
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-zinc-700">{title}</h1>
        </div>
        <div>
          <img src={main_image} alt="main" />
        </div>
      </header>
      <main>
        <Editor
          editorState={convertToEditorState(body)}
          readOnly
          editorClassName="py-8"
          toolbar={{ options: [] }}
        />
      </main>
      <footer className=" w-full">
        <div className="border-t-2 py-8">
          <h2 className="font-bold text-2xl text-zinc-700">Related Posts</h2>
          {relatedPosts?.map((each) => (
            <PostItem
              id={each.id}
              key={each.id}
              title={each.title}
              description={each.description}
              category={each.category}
              createdAt={each.time}
              author={each.author_name}
              pic={each.author_profile_pic}
              mainImage={each.main_image}
            />
          ))}
        </div>
        <Button type="button" onClick={() => router.back()}>
          Back
        </Button>
      </footer>
    </section>
  );
};

export default PostDetail;
