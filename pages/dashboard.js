// import ReactQuill from 'react-quill'; // ES6
// import 'react-quill/dist/quill.snow.css';
import {useState} from 'react'
import dynamic from 'next/dynamic';

const Editor = dynamic(
  () => import('../components/quill').then(mod => mod.default),
  { ssr: false }
)

export default function Dashboard() {
  const [value, setValue] = useState('');



  return (
    <div>
      <h1>ადმინი</h1>
      <h2>პოსტის შექმნა</h2>

      <form method="POST" action="api/insert">
        <label htmlFor="heading">სათაური</label>
        <input type="text" name="heading" className="blog-heading" />
        <label htmlFor="content">ბლოგ-პოსტი</label>
        <Editor/>

        <input type="submit" value="შექმნა" />
      </form>

      <h2>პოსტის წაშლა</h2>

      <form method="POST" action="api/delete">
        <label>მიუთითეთ პოსტის id რომლის წაშლაც გსურთ</label>
        <input type="number" name="id" />
        <input type="submit" value="წაშლა" />
      </form>

      <h2>პოსტის რედაქტირება</h2>
      <form method="POST" action="api/put">
        <label>მიუთითეთ პოსტის id რომლის რედაქტირებაც გსურთ</label>
        <input type="number" name="id" />
        <label htmlFor="heading">სათაური</label>
        <input type="text" name="heading" className="blog-heading" />
        <label htmlFor="content">ბლოგ-პოსტი</label>
        <Editor/>
        <input type="submit" value="რედაქტირება" />
      </form>

      <style jsx>{`
        div {
          display: block;
          margin: 0 auto;
        }
        input[type="text"],
        input[type="number"] {
          width: 25rem;
        }
        input,
        label {
          display: block;
          margin-bottom: 0.5rem;
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
