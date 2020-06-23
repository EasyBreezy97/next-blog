import { useState } from "react";
import ReactQuill from "react-quill";

function Editor() {
  const [value, setValue] = useState("");
  const [editorHtml, setEditorHtml] = useState("");
  const [theme, setTheme] = useState("snow");

  const handleChange = (html) => {
    setEditorHtml(html);

    console.log(html);
  };


  return (
    <>
      <ReactQuill
        theme={theme}
        value={editorHtml}
        onChange={handleChange}
        modules={Editor.modules}
        formats={Editor.formats}
      />
      <input type="hidden" name="content" value={editorHtml} />
    </>
  );
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

export default Editor;
