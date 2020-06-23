import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";
import { getAllPosts } from "../lib/db";

export async function getServerSideProps(context) {
  let posts = await getAllPosts();
  console.log(posts);
  let postsArray = JSON.parse(posts);

  return {
    props: {
      postsArray,
    },
  };
}

export default function Home({ postsArray }) {
  return (
    <Layout>
      <Head>
        <title>Next blog</title>

        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main>
        {console.log(postsArray)}
        {postsArray.map((post) => (
          <div key={post.id}>
            <Link
              href={`/posts/[heading]`}
              as={`/posts/${post.heading.split(" ").join("-")}`}
            >
              <a>{post.heading}</a>
            </Link>
            {/* <p>{post.content}</p> */}
          </div>
        ))}
      </main>
    </Layout>
  );
}
