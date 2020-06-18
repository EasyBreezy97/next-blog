export default function Dashboard() {
  return (
    <div>
      <h1>This is dashboard</h1>
      <form method="POST" action="api/insert">
        <label htmlFor="heading">სათაური</label>
        <input type="text" name="heading" className="blog-heading" />
        <label htmlFor="content">ბლოგ-პოსტი</label>
        <textarea name="content"></textarea>
        <input type="submit" value="შექმნა"/>
      </form>

      <form method="POST" action="api/delete">
        <label>მიუთითეთ პოსტის id რომლის წაშლაც გსურთ</label>
        <input type="number" name="id"/>
        <input type="submit" value="წაშლა"/>
      </form>
    </div>
  );
}
