import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";
import { getAllPosts } from "../lib/db";
import parse from "html-react-parser";
import styles from "./index.module.css";

export async function getServerSideProps(context) {
  let posts = await getAllPosts();
  // console.log(posts);
  let postsArray = JSON.parse(posts);

  let protocol = context.req.connection.encrypted ? 'https' : 'http';
  let {host} =  context.req.headers;


  let fullUrl =`${protocol}://${host}/`;

  let imgRegex = /<img src\s*=\s*\\*"(.+?)\\*"\s*>/;
  let imgLink;
  if (postsArray[0].content.match(imgRegex)) {
    imgLink = postsArray[0].content.match(imgRegex)[1].split("alt")[0].slice(0,-1);
    console.log(imgLink)

  } else {
    imgLink = null;
  }

  return {
    props: {
      postsArray,
      imgLink,
      fullUrl
    },
  };
}

export default function Home({ postsArray, imgLink,fullUrl }) {
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
    <Layout imgLink={imgLink}>
      <Head>
        <title>Next js simple blog for search engine optimisation</title>
        <meta
          name="description"
          content="Blog builded on nextjs. react server side renderer"
        />
        <meta name="copyright" content="company name" />
        <meta property="og:title" content="Next blog" />
        <meta
          property="og:description"
          content="Blog builded on nextjs. react server side renderer"
        />
        {imgLink && <meta property="og:image" content = {imgLink} />}
        <meta property="og:url" content={fullUrl} />

      </Head>
      <main className={styles.main}>
        <h1>ბლოგი</h1>

        {postsArray.map((post) => (
          <Link
            href={`/posts/[heading]`}
            as={`/posts/${post.heading.split(" ").join("-")}`}
            key={post.id}
            passHref
          >
            <article className="single-blog">
              <div>
                <a className="post-heading">{post.heading}</a>
                <div className="created_at">
                  {post.created_at.split("T")[0]}
                </div>

                {console.log(parse(post.content))}
                {parse(post.content).length >= 1
                  ? parse(post.content).slice(0, 3)
                  : parse(post.content)}
              </div>
            </article>
          </Link>
        ))}
        <style jsx>{`
        h1{
          color:#0070f3;
          text-align:center;
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
            width:70%;
            margin:0 auto;
          }
        `}</style>
      </main>
    </Layout>
  );
}
