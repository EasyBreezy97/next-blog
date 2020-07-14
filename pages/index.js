import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";
import { getAllPosts } from "../lib/db";
import parse from "html-react-parser";
import styles from "./index.module.css";

export async function getServerSideProps(context) {
  let posts = await getAllPosts();
  let postsArray = JSON.parse(posts);

  let protocol = context.req.connection.encrypted ? "https" : "http";
  let { host } = context.req.headers;

  let fullUrl = `${protocol}://${host}/`;

  return {
    props: {
      postsArray,
      fullUrl,
    },
  };
}

export const config = { amp: true };

export default function Home({ postsArray, fullUrl }) {
  return (
    <Layout>
      <Head>
        <title>blog.translate.ge :: ბლოგი</title>
        <meta name="description" content="თრანსლეით ჯის ბლოგი" />
        <meta name="copyright" content="translate.ge" />
        <meta property="og:title" content="blog.translate.ge :: ბლოგი" />
        <meta property="og:description" content="თრანსლეით ჯის ბლოგი" />
        <meta property="og:image" content={postsArray[0].image} />
        <meta property="og:url" content={fullUrl} />
      </Head>
      <main className={styles.main}>
        <h1>ბლოგი</h1>
        {console.log(postsArray)}
        {postsArray.map((post) => (
          <article key={post.id} className="single-blog">
            <div>
              <Link
                href={`/posts/[heading]`}
                as={`/posts/${post.heading
                  .split(" ")
                  .join("-")
                  .replace("?", "%3F")}`}
                key={post.id}
                passHref
              >
                <a className="post-heading">
                  {post.heading}
                  <div className="created_at">
                    {post.created_at.split("T")[0]}
                  </div>
                  <div className="blog-container">
                    <div className="blog-img-container">
                      <amp-img
                        width="5"
                        height="5"
                        src={post.image}
                        alt="image"
                        layout="responsive"
                      />
                    </div>
                    <div className="blog-content-container">
                      {parse(post.content).length >= 1
                        ? parse(post.content).slice(0, 2)
                        : parse(post.content)}
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          </article>
        ))}
        <style jsx>{`
          @font-face {
            font-family: "Georgian";
            src: url(/fonts/55-Roman.2df6a3f8.woff2) format("woff2");
            font-weight: 400;
            font-style: normal;
            font-display: swap;
          }

          @font-face {
            font-family: "Georgian";
            src: url(/fonts/75-Bold.99429b2d.woff2) format("woff2");
            font-weight: 700;
            font-style: normal;
            font-display: swap;
          }
          a {
            color: #0070f3;
            text-decoration: none;
          }
          main {
            font-family: "Georgian", "Helvetica Neue", Helvetica, sans-serif;
            font-size: 1.1rem;
            font-weight: 400;
          }
          p {
            margin-top: 0;
          }

          .single-blog {
            margin: 0.7rem auto;
            position: relative;
            width: 100%;
            padding: 1rem;
            min-height: 220px;
            border-top: 1px solid #e8eae9;
            border-bottom: 1px solid #e8eae9;
            font-size: 1rem;
            margin: 0.7rem auto;
          }
          .single-blog:hover {
            cursor: pointer;
            background-color: #fafafa;
            transition: 0.15s all;
            border-color: #ccc;
          }
          .single-blog:last-child{
            margin-bottom:1rem;
          }


          amp-img {
            max-width: 18rem;
            max-height: 18rem;
          }
          p,
          .created_at {
            margin: 0.5rem 0;
            font-size: 1rem;
          }

          .blog-container {
            color: #282828;
            display: grid;
            grid-template-columns: 3fr 1fr;
            grid-column-gap: 1rem;
            color: #282828;
          }
          .blog-container > * {
            font-size: 1rem;
          }

          .blog-content-container {
            order: 1;
            color: #282828;
          }
          .blog-img-container {
            order: 2;
          }

          .created_at{
            margin-bottom:0;
          }

          h1 {
            color: #0070f3;
            text-align: center;
          }
          .post-heading {
            font-size: 1.3rem;
          }
          .created_at {
            color: #282828;
            margin-top: 1rem;
          }
          .single-blog {
            color: #777;
            width: 60%;
            display: block;
            margin: 0.3rem auto;
          }
          @media only screen and (max-width: 880px) {
            .blog-container {
              display: block;
            }
            amp-img {
              margin: 0 auto;
            }

            .created_at{
              margin: 0.5rem 0;
            }

            .post-heading {
              display: block;
              text-align: center;
            }
            .blog-content {
              text-align: left;
            }
          }
          @media only screen and (max-width: 600px) {
            .single-blog {
              width: 90%;
            }
          }
        `}</style>
      </main>
    </Layout>
  );
}
