export default function Login() {
  return (
    <form method="POST" action="api/login">
      <h2>ავტორიზაცია</h2>
      <input type="text" placeholder="username" name="username"></input>
      <input type="password" placeholder="password" name="password"></input>
      <input type="submit" value="შესვლა" />
      <style jsx>
        {`
          h2 {
            text-align: center;
            color: #0070f3;
          }
          form {
            position: absolute;
            top: 40%;
            left: 50%;
            transform: translate(-50%, -50%);
            -webkit-box-shadow: 3px 3px 5px 6px #eee;
            -moz-box-shadow: 3px 3px 5px 6px #eee;
            box-shadow: 3px 3px 5px 6px #eee;
            padding: 4rem;
            margin: 1.2rem 0;
            border-radius: 1rem;
          }
          input {
            display: block;
            margin: 1rem;
            padding: 0.3rem;
          }
          input[type="submit"] {
            padding: 0.4rem 0.7rem;
            background-color: #569fec;
            color: #fff;
            border: none;
          }
          input[type="submit"]:hover {
            cursor: pointer;
            opacity: 0.8;
          }
        `}
      </style>
    </form>
  );
}
