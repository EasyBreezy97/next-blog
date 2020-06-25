import { useState } from "react";
import ReactQuill from "react-quill";

const insertImage = (e) => {
  let imgLink = `<img src="${window.getSelection().toString()}" alt="img"/>`;
  console.log(imgLink);
  let closestFormAttr = e.target.closest("form").getAttribute("action");
  console.log(document.querySelectorAll(".ql-editor"));
  let nodes = document.querySelectorAll(".ql-editor");
  if (closestFormAttr === "api/insert") {
    console.log(nodes[0]);
    nodes[0].innerHTML += imgLink;
  } else {
    console.log(nodes[1]);

    nodes[1].innerHTML += imgLink;
  }
};

const CustomButton = () => <span onMouseDown={insertImage}>IMG</span>;

function Editor() {
  const [value, setValue] = useState("");
  const [editorHtml, setEditorHtml] = useState("");
  const [theme, setTheme] = useState("snow");

  const handleChange = (html) => {
    setEditorHtml(html);
  };
  return (
    <>
      <CustomButton />
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
    // [{ container: "img" }]
    [({ header: "1" }, { header: "2" }, { font: [] })],
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

  // handlers: {
  //   insertImage: insertImage,
  // },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  "background",
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "strikethrough",
  "direction",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

export default Editor;
