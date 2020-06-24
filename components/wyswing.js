import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";

function Wyswing() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [contentState, setContentState] = useState({});

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    // console.log(editorState);
  };

  const onContentStateChange = (contentState) => {
    setContentState(contentState);
  };

  return (
    <>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
        // onChange={onEditorStateChange}
        // onContentStateChange={onEditorStateChange}
        onContentStateChange={onContentStateChange}
      />
      <input type="hidden" name="content" value={editorState} />
    </>
  );
}

export default Wyswing;