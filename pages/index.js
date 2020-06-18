import Head from "next/head";
import Link from "next/link";
import { getAllPosts } from "../lib/db";



export async function getServerSideProps(context) {
  let posts = await getAllPosts();
  // JSON.parse(data);
  // console.log(data.posts[1]);
  return {
    props: {
      posts
    },
  };
}

export default function Home({ posts }) {

  return (
    <div className="container">
      <Head>
        <title>Next blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
      {console.log(posts)}
      {/* {posts.map((post, index) => (
          <div key={`${index}_${post.heading}`}>

            <h1>{post.heading}</h1>
            <p>{post.content}</p>

          </div>
        ))} */}
        <h1>Home page</h1>
      </main>
    </div>
  );
}
