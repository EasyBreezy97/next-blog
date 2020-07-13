import { useState } from "react";
import ReactQuill from "react-quill";

const insertImage = (e) => {
  let imgLink = `<img src="${window.getSelection().toString()}" alt="img"/>`;
  // console.log(imgLink);
  let closestFormAttr = e.target.closest("form").getAttribute("action");
  // console.log(document.querySelectorAll(".ql-editor"));
  let nodes = document.querySelectorAll(".ql-editor");
  let selectedText = "";

  if (closestFormAttr === "api/insert") {
    // console.log(nodes[0]);
    nodes[0].innerHTML += imgLink;
    selectedText = window.getSelection();

    // console.log(selectedText);
  } else {
    // console.log(nodes[1]);
    nodes[1].innerHTML += imgLink;
  }
};

const CustomButton = () => {
  return (
    <span onMouseDown={insertImage}>
      ლინკი სურათად (მონიშნეთ ლინკი და დააჭირეთ)
      <style jsx>{`
        span {
          text-align: center;
          border: 1px solid;
          padding: 0.4rem 0.7rem;
          background: #339933;
          color: #fff;
          cursor: pointer;
          display: block;
          margin: 1rem 0;
        }
        span:hover {
          opacity: 0.9;
        }
      `}</style>
    </span>
  );
};

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
    [{ 'color': [] }, { 'background': [] }],

    ["link"],
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
  "color",
  "background"
];

export default Editor;
