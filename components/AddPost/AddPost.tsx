import React, { useState, useRef } from "react";
import { TextField } from "@mui/material";
import TextEditor from "../TextEditor/TextEditor";
import Button from "../UI/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { categories, Post } from "../../models";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import dynamic from "next/dynamic";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const Editor = dynamic<any>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import createImagePlugin from "@draft-js-plugins/image";
import createLinkPlugin from "@draft-js-plugins/anchor";
import { stateToHTML } from "draft-js-export-html";
import createInlineToolbarPlugin from "@draft-js-plugins/inline-toolbar";
import parse from "html-react-parser";
import { v4 as uuid } from "uuid";
import { doc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../../pages/firebase";
import { useRouter } from "next/router";

const AddPost: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [choosenCategory, setChoosenCategory] = useState("");
  const titleRef = useRef<HTMLInputElement>();
  const mainImageRef = useRef<HTMLInputElement>();
  const descriptionRef = useRef<HTMLInputElement>();
  const curUser = useAppSelector((state) => state.auth.curUser);
  const curUserProfile = useAppSelector((state) => state.data.users).find(
    (each) => each.id == curUser?.uid
  );
  const router = useRouter();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const chooseCategory = (e: React.MouseEvent<HTMLElement>) => {
    setChoosenCategory(e.currentTarget!.textContent!);
    setAnchorEl(null);
  };

  //For Body
  const [editorState, setEditorState] = useState(() =>
    EditorState?.createEmpty()
  );

  const imagePlugin = createImagePlugin();
  const linkPlugin = createLinkPlugin();
  const handleEditorChange = (state: any) => {
    setEditorState(state);
  };
  const inlineToolbarPlugin = createInlineToolbarPlugin();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const unique_id = uuid();
    const curUserDoc = doc(db, "users", curUser.uid);
    const data: Post = {
      id: unique_id,
      title: titleRef.current!.value,
      description: descriptionRef.current!.value,
      main_image: mainImageRef.current!.value,
      author_name: curUser.displayName,
      author_profile_pic: curUser.photoURL,

      body: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
      category: choosenCategory,
      liked_by: [],
      time: Timestamp.now(),
    };

    const newFields = {
      posts: [...curUserProfile!.posts, data],
    };

    await updateDoc(curUserDoc, newFields);
    router.push("/");
  };

  return (
    <>
      {!curUser ? (
        <section className="h-screen flex justify-center items-center">
          <h1 className="font-serif text-3xl">Please Login</h1>
        </section>
      ) : (
        <section className="p-8 font-serif w-full  h-full">
          <header>
            <h1 className="font-serif text-3xl">Add Post</h1>
          </header>
          <form
            className="w-full flex flex-col gap-8 py-4 justify-between h-full"
            onSubmit={submitHandler}
          >
            <TextField
              variant="standard"
              label="Title"
              required
              fullWidth
              inputRef={titleRef}
            />
            <TextField
              variant="standard"
              label="Description"
              required
              fullWidth
              multiline
              rows={4}
              inputRef={descriptionRef}
            />
            <TextField
              variant="standard"
              label="Main Image"
              required
              fullWidth
              inputRef={mainImageRef}
            />
            <div className="h-full">
              <label className="font-serif text-xl">Body</label>
              <Editor
                placeholder="Start Creating Your Blog..."
                toolbarClassName="flex mx-auto w-full"
                editorState={editorState}
                onEditorStateChange={handleEditorChange}
                plugins={[imagePlugin, linkPlugin, inlineToolbarPlugin]}
                editorClassName="p-4 w-full h-full"
                spellCheck={true}
              />
            </div>
            <div className="flex gap-8">
              {choosenCategory ? (
                <div>
                  <p>{choosenCategory}</p>
                </div>
              ) : (
                <div>
                  <Button type="button" onClick={handleClick}>
                    Category
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
                    {categories.map((item) => (
                      <MenuItem key={item} onClick={chooseCategory}>
                        {item}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              )}
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </section>
      )}
    </>
  );
};

export default AddPost;
