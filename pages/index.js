import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";
import { getAllPosts } from "../lib/db";
import parse from "html-react-parser";
import styles from "./index.module.css";

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
  useEffect(() => {
    imageHandler();
  }, []);
  const imageHandler = () => {
    const blogs = document.querySelectorAll(".single-blog");

    for (let i = 0; i < blogs.length; ++i) {
      if (blogs[i].getElementsByTagName("img").length !== 0) {
        blogs[i].classList.add("with-image");
      }
    }
  };
  return (
    <Layout>
      <Head>
        <title>Next blog</title>
      </Head>
      <main className={styles.main}>
        {postsArray.map((post) => (
          <Link
            href={`/posts/[heading]`}
            as={`/posts/${post.heading.split(" ").join("-")}`}
            key={post.id}
          >
            <article className="single-blog">
              <div>
                <a className="post-heading">{post.heading}</a>
                {console.log(parse(post.content))}
                {parse(post.content).length >= 1
                  ? parse(post.content).slice(0, 3)
                  : parse(post.content)}
                <div className="post-id">პოსტი: {post.id}</div>
              </div>
            </article>
          </Link>
        ))}
        <style jsx>{`
          .post-heading {
            font-size: 1.3rem;
          }
        `}</style>
      </main>
    </Layout>
  );
}
