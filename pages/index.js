import Head from "next/head";
import Link from "next/link";
import { getAllPosts } from "../lib/db";

export async function getServerSideProps(context) {
  let posts = await getAllPosts();
  console.log(posts)
  let postsArray = JSON.parse(posts);

  return {
    props: {
      postsArray,
    },
  };
}

export default function Home({ postsArray }) {
  return (
    <div className="container">
      <Head>
        <title>Next blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {postsArray.map((post) => (
          <div key={post.id}>
            <Link href="/posts/[id]" as={`/posts/${post.id}`}>
              <a>{post.heading}</a>
            </Link>
            {/* <p>{post.content}</p> */}
          </div>
        ))}
      </main>
    </div>
  );
}
