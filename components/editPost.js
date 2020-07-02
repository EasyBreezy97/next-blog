import {useState,useEffect} from 'react';
import dynamic from "next/dynamic";
import axios from "axios";

const Editor = dynamic(
  () => import("../components/quill").then((mod) => mod.default),
  { ssr: false },
);
const EditPost = ({ headingsArray }) => {
  const [chosenPost,setChosenPost] = useState(null)


  const getPost = async (e) => {
    try {
      let {data} = await axios.post("api/getPost", { heading: e.target.value });
      let heading = document.querySelector(".blog-heading");
      let description = document.querySelector(".blog-description")
      let quill = document.querySelector(".ql-editor")

      heading.value = data.post.heading
      description.value = data.post.description
      quill.innerHTML  = data.post.content
      console.log(data.post.heading)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="edit-post">
      <h2>პოსტის რედაქტირება</h2>
      <form method="POST" className="put-form" action="api/put">
        <label>აირჩიეთ იმ პოსტის სათაური რომლის რედაქტირებაც გსურთ</label>
        {/* <input type="number" name="id" required /> */}
        <select onChange={getPost} name="heading">
          <option>აირჩიეთ იმ პოსტის სათაური რომლის რედაქტირებაც გსურთ</option>
          {headingsArray.map((result) => (
            <option value={result.heading} key={result.heading}>
              {result.heading}
            </option>
          ))}
        </select>

        <label htmlFor="heading">განახლებული სათაური</label>
        <input type="text" name="heading" className="blog-heading" required />
        <label htmlFor="content">განახლებული ბლოგ-პოსტი</label>
        <Editor />
        <label htmlFor="description">განახლებული პოსტის აღწერა</label>
        <input
          type="text"
          name="description"
          className="blog-description"
          required
        />
        <input className="btn btn-yellow" type="submit" value="რედაქტირება" />
      </form>
      <style jsx>{`
        .edit-post {
          -webkit-box-shadow: 3px 3px 5px 6px #eee;
          -moz-box-shadow: 3px 3px 5px 6px #eee;
          box-shadow: 3px 3px 5px 6px #eee;
          padding: 1rem;
          margin: 1.2rem 0;
          border-radius: 1rem;
        }
        input[type="text"],
        input[type="number"],
        select {
          width: 99%;
          padding: 0.3rem;
        }
        label,
        h2 {
          font-weight: bold;
          text-align: center;
        }
        input,
        label {
          display: block;
          margin: 1rem auto;
        }
      `}</style>
    </div>
  );
};

export default EditPost;
