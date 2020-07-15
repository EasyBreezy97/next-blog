import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { getPostHeadings } from "../lib/db";
import DeletePost from "../components/deletePost";
import CreatePost from "../components/createPost";
import EditPost from "../components/editPost";
import LogOut from "../components/logOut";

export async function getServerSideProps() {
  let headings = await getPostHeadings();
  // console.log(headings);
  let headingsArray = JSON.parse(headings);

  return {
    props: {
      headingsArray,
    },
  };
}

export default function Dashboard({ headingsArray }) {
  const router = useRouter();
  const [component, setComponent] = useState("create");

  useEffect(() => {
    verifyToken();
  }, []);

  const verifyToken = async () => {
    const token = new URL(document.location).searchParams.get("token");
    let decodedToken = jwt.decode(token, { complete: true });
    // console.log(decodedToken)
    localStorage.setItem("auth_token", token);

    let currentTime = new Date().getTime();

    if(!decodedToken){
      router.push("/login")
      localStorage.removeItem("auth_token");
      return;
    }

    if ( decodedToken.payload.exp * 1000 < currentTime) {
      router.push("/login")
      localStorage.removeItem("auth_token");
    }
  };

  const switchComponents = (component) => {
    switch (component) {
      case "create":
        return <CreatePost />;
      case "edit":
        return <EditPost headingsArray={headingsArray} />;
      case "delete":
        return <DeletePost headingsArray={headingsArray} />;
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    router.push("/login");
  };

  return (
    <div className="dashboard-container">
      <h1>ადმინი</h1>
      <button className="btn btn-green" onClick={() => setComponent("create")}>
        პოსტის შექმნა
      </button>
      <button className="btn btn-red" onClick={() => setComponent("delete")}>
        პოსტის წაშლა
      </button>
      <button className="btn btn-yellow" onClick={() => setComponent("edit")}>
        პოსტის რედაქტირება
      </button>

      {switchComponents(component)}

      <LogOut click={logout} />

      <style jsx>{`
        .dashboard-container {
          width: 80%;
          margin: 0 auto;
        }
        span,
        h1,
        h2 {
          display: block;
          text-align: center;
          font-size: 1.7rem;
        }
        button {
          margin: 0.5rem;
        }
      `}</style>
    </div>
  );
}
