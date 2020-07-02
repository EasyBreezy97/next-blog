import dynamic from "next/dynamic";

const Editor = dynamic(
  () => import("../components/quill").then((mod) => mod.default),
  { ssr: false },
);
const EditPost = ({headingsArray}) => {
  return (
    <div className="edit-post">
      <h2>პოსტის რედაქტირება</h2>
      <form method="POST" className="put-form" action="api/put">
        <label>აირჩიეთ იმ პოსტის სათაური რომლის რედაქტირებაც გსურთ</label>
        {/* <input type="number" name="id" required /> */}
        <select name="heading">
          {headingsArray.map((result) => (
            <option key={result.heading}>{result.heading}</option>
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
        <input className="btn btn-green" type="submit" value="რედაქტირება" />
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
        label,h2{
          font-weight:bold;
          text-align:center;
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
