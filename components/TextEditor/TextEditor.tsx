import { useState } from "react";
import { convertToHTML } from "draft-convert";
import dynamic from "next/dynamic";
// import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import DOMPurify from "dompurify";
const Editor = dynamic<any>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import createImagePlugin from "@draft-js-plugins/image";
import createLinkPlugin from "@draft-js-plugins/anchor";
import { stateToHTML } from "draft-js-export-html";
import createInlineToolbarPlugin from "@draft-js-plugins/inline-toolbar";
import parse from "html-react-parser";

const TextEditor: React.FC = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState?.createEmpty()
  );

  const imagePlugin = createImagePlugin();
  const linkPlugin = createLinkPlugin();
  const handleEditorChange = (state: any) => {
    setEditorState(state);
  };
  const inlineToolbarPlugin = createInlineToolbarPlugin();

  // console.log(stateToHTML(editorState.getCurrentContent()));

  //TO DISPLAY CONTENT AFTER PULLING IT FROM FIREBASE
  // const decorator = new CompositeDecorator([{
  //   strategy: findLinkEntities,
  //   component: Link
  // }]);
  // const convertToEditorState = (editorContent) => {
  //   const content = convertFromRaw(JSON.parse(editorContent));
  //   const editorState = EditorState.createWithContent(content, decorator);
  //   return editorState;
  // };

  return (
    <div className="w-full justify-center h-full">
      {
        <Editor
          toolbarClassName="flex mx-auto  w-full"
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          plugins={[imagePlugin, linkPlugin, inlineToolbarPlugin]}
          editorClassName="p-4 w-full h-full"
        />
      }
    </div>
  );
};

export default TextEditor;
