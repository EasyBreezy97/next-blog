import dynamic from "next/dynamic";

const Editor = dynamic(
  () => import("../components/quill").then((mod) => mod.default),
  { ssr: false },
);

const CreatePost = () => {
  return (
    <div className="create-post">
      <h2>პოსტის შექმნა</h2>
      <form method="POST" className="insert-form" action="api/insert">
        <label htmlFor="heading">სათაური</label>
        <input type="text" name="heading" className="blog-heading" required />
        <label htmlFor="content">ბლოგ-პოსტი</label>
        <Editor />
        <label htmlFor="description">პოსტის აღწერა</label>
        <input
          type="text"
          name="description"
          className="blog-description"
          required
        />
        <input className="btn btn-green" type="submit" value="შექმნა" />
      </form>
      <style jsx>
        {`
        .create-post
        {-webkit-box-shadow: 3px 3px 5px 6px #eee;
          -moz-box-shadow: 3px 3px 5px 6px #eee;
          box-shadow: 3px 3px 5px 6px #eee;
          padding: 1rem;
          margin: 1.2rem 0;
          border-radius: 1rem;
        }
        label{
          text-align:center;
          font-weight:bold;
        }
        input,
        label {
          display: block;
          margin: 1rem auto;
        }
        h2 {
          display: block;
          text-align: center;
          font-size: 1.7rem;
        }
        .insert-form .put-form {
          border: 1px solid;
        }
        input[type="text"],
        input[type="number"] {
          width: 99%;
          padding: 0.3rem;
        }
        `}
      </style>
    </div>
  );
};

export default CreatePost;
