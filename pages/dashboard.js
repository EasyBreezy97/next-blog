export default function Dashboard() {
  return (
    <div>
      <h1>ადმინი</h1>
      <h2>პოსტის შექმნა</h2>
      <form method="POST" action="api/insert">
        <label htmlFor="heading">სათაური</label>
        <input type="text" name="heading" className="blog-heading" />
        <label htmlFor="content">ბლოგ-პოსტი</label>
        <textarea name="content"></textarea>
        <input type="submit" value="შექმნა" />
      </form>

      <h2>პოსტის წაშლა</h2>

      <form method="POST" action="api/delete">
        <label>მიუთითეთ პოსტის id რომლის წაშლაც გსურთ</label>
        <input type="number" name="id" />
        <input type="submit" value="წაშლა" />
      </form>
      <style jsx>{`
        div{
          display:block;
          margin: 0 auto;
        }
        input[type="text"],
        input[type="number"] {
          width: 25rem;
        }
        input,
        label {
          display: block;
          margin-bottom:0.5rem;
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
