import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";
import { getAllPosts } from "../lib/db";
import parse from "html-react-parser";
import styles from './index.module.css';


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
      <main className={styles.main}>
        {/* {console.log(postsArray)} */}
        {postsArray.map((post) => (
          <article key={post.id}>
            <Link
              href={`/posts/[heading]`}
              as={`/posts/${post.heading.split(" ").join("-")}`}
            >
              <a>{post.heading}</a>
            </Link>
            {parse(post.content).slice(0,3)}

          </article>
        ))}


      </main>
    </Layout>
  );
}
