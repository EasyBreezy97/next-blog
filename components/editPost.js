import dynamic from "next/dynamic";
import axios from "axios";
import { useState } from "react";

const Editor = dynamic(
  () => import("../components/quill").then((mod) => mod.default),
  { ssr: false },
);
const EditPost = ({ headingsArray }) => {
  const [headingCount, setHeadingCount] = useState(0);
  const [descriptionCount, setDescriptionCount] = useState(0);

  const getPost = async (e) => {
    try {
      let { data } = await axios.post("api/getPost", {
        heading: e.target.value,
      });
      console.log(data);
      let heading = document.querySelector(".blog-heading");
      let description = document.querySelector(".blog-description");
      let quill = document.querySelector(".ql-editor");
      let blogImg = document.querySelector(".blog-img");

      heading.value = data.post.heading;
      setHeadingCount(heading.value.length);
      description.value = data.post.description;
      setDescriptionCount(description.value.length);
      quill.innerHTML = data.post.content;
      blogImg.value = data.post.image;
      console.log(data.post.heading);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="edit-post">
      <h2>პოსტის რედაქტირება</h2>
      <form method="POST" className="put-form" action="api/put">
        <label>აირჩიეთ იმ პოსტის სათაური რომლის რედაქტირებაც გსურთ</label>
        <select onChange={getPost} name="heading">
          <option>აირჩიეთ იმ პოსტის სათაური რომლის რედაქტირებაც გსურთ</option>
          {headingsArray.map((result) => (
            <option value={result.heading} key={result.heading}>
              {result.heading}
            </option>
          ))}
        </select>

        <label htmlFor="heading">განახლებული სათაური (მაქს. 255 სიმბოლო)</label>
        <div className="symbolCount">გამოყენებულია {headingCount} სიმბოლო</div>
        <input
          onChange={(e) => setHeadingCount(e.target.value.length)}
          type="text"
          name="heading"
          className="blog-heading"
          required
        />

        <label htmlFor="blog-img">პოსტის განახლებული სურათის ბმული</label>
        <input type="text" name="img" className="blog-img" required />

        <label htmlFor="content">განახლებული ბლოგ-პოსტი</label>
        <Editor />
        <label htmlFor="description">
          განახლებული პოსტის აღწერა (მაქს. 255 სიმბოლო)
        </label>
        <div
          className="symbolCount"
          onChange={(e) => setDescriptionCount(e.target.value.length)}
        >
          გამოყენებულია {descriptionCount} სიმბოლო
        </div>

        <input
          onChange={(e) => setDescriptionCount(e.target.value.length)}
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
        .symbolCount {
          text-align: center;
          font-weight: bold;
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
