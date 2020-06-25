// import ReactQuill from 'react-quill'; // ES6
// import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import dynamic from "next/dynamic";

const Editor = dynamic(
  () => import("../components/quill").then((mod) => mod.default),
  { ssr: false },
);

export default function Dashboard() {
  const [value, setValue] = useState("");

  return (
    <div className="dashboard-container">
      <h1>ადმინი</h1>
      <div className="create-post">
        <h2>პოსტის შექმნა</h2>
        <form method="POST" className="insert-form" action="api/insert">
          <label htmlFor="heading">სათაური</label>
          <input type="text" name="heading" className="blog-heading" />
          <label htmlFor="content">ბლოგ-პოსტი</label>
          <Editor />
          <label htmlFor="description">პოსტის აღწერა</label>
          <input type="text" name="description" className="blog-description" />
          <input className="btn btn-green" type="submit" value="შექმნა" />
        </form>
      </div>

      <div className="delete-post">
        <h2>პოსტის წაშლა</h2>
        <form method="POST" action="api/delete">
          <label>მიუთითეთ პოსტის id რომლის წაშლაც გსურთ</label>
          <input type="number" name="id" />
          <input className="btn btn-red" type="submit" value="წაშლა" />
        </form>
      </div>

      <div className="edit-post">
        <h2>პოსტის რედაქტირება</h2>
        <form method="POST" className="put-form" action="api/put">
          <label>მიუთითეთ პოსტის id რომლის რედაქტირებაც გსურთ</label>
          <input type="number" name="id" />
          <label htmlFor="heading">სათაური</label>
          <input type="text" name="heading" className="blog-heading" />
          <label htmlFor="content">ბლოგ-პოსტი</label>
          <Editor />
          <label htmlFor="description">პოსტის აღწერა</label>
          <input type="text" name="description" className="blog-description" />
          <input className="btn btn-green" type="submit" value="რედაქტირება" />
        </form>
      </div>

      <style jsx>{`
        span {
          cursor: pointer;
        }
        .btn {
          padding: 0.4rem 0.8rem;
          border: none;
          cursor: pointer;
        }
        .btn:active {
          opacity: 0.8;
          outline: none;
        }
        .btn:hover {
          opacity: 0.9;
        }
        .btn-red {
          background: #cc3333;
          color: #fff;
        }
        .btn-green {
          background: #339933;
          color: #fff;
        }
        .dashboard-container {
          width: 80%;
          margin: 0 auto;
        }
        .create-post,
        .delete-post,
        .edit-post {
          -webkit-box-shadow: 3px 3px 5px 6px #eee;
          -moz-box-shadow:    3px 3px 5px 6px #eee;
          box-shadow:         3px 3px 5px 6px #eee;
          padding: 1rem;
          margin: 1.2rem 0;
          border-radius:1rem;
        }
        .insert-form .put-form {
          border: 1px solid;
        }
        div {
          display: block;
        }
        .quill {
          width: 70%;
        }
        span,
        h1,
        h2 {
          display: block;
          text-align: center;
          font-size: 1.7rem;
        }
        input[type="text"],
        input[type="number"] {
          width: 99%;
          padding: 0.3rem;
        }
        input,
        label {
          display: block;
          margin: 1rem auto;
        }
        label {
          text-align: center;
          font-weight: bold;
        }
        form {
          margin-bottom: 4rem;
        }
        textarea {
          width: 25rem;
          height: 12rem;
        }
      `}</style>
    </div>
  );
}
