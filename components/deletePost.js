const DeletePost = ({headingsArray}) => {
  return (
    <div className="delete-post">
      <h2>პოსტის წაშლა</h2>
      <form method="POST" action="api/delete">
        <label htmlFor="heading">
          აირჩიეთ პოსტის სათაური რომლის წაშლაც გსურთ
        </label>
        <select name="heading">
          {headingsArray.map((result) => (
            <option key={result.heading}>{result.heading}</option>
          ))}
        </select>
        <input className="btn btn-red" type="submit" value="წაშლა" />
      </form>
      <style jsx>
        {`

          select {
            width: 99%;
            padding: 0.3rem;
          }
          label{
            text-align:center;
            font-weight:bold;
          }
          .delete-post{
            -webkit-box-shadow: 3px 3px 5px 6px #eee;
            -moz-box-shadow: 3px 3px 5px 6px #eee;
            box-shadow: 3px 3px 5px 6px #eee;
            padding: 1rem;
            margin: 1.2rem 0;
            border-radius: 1rem;
          }
          h2 {
            display: block;
            text-align: center;
            font-size: 1.7rem;
          }
          input,
          label {
            display: block;
            margin: 1rem auto;
          }
        `}
      </style>
    </div>
  );
};

export default DeletePost;
