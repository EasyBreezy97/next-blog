import Head from "next/head";
import Link from 'next/link'
import { getAllPosts } from "../../lib/db";
import Layout from "../../components/layout";
import parse from "html-react-parser";
import { useState, useEffect } from "react";

export async function getServerSideProps(context) {
  let posts = await getAllPosts();

  let parsedPosts = JSON.parse(posts);

  // console.log('ctx query::',context.query)

  let selectedPost = parsedPosts.filter(
    (post) => post.heading.split(" ").join("-") === context.query.id,
  );


  let imgRegex = /<img src\s*=\s*\\*"(.+?)\\*"\s*>/;
  let imgLink;
  if(selectedPost[0].content.match(imgRegex)){
      imgLink = selectedPost[0].content.match(imgRegex)[1].split("alt")[0];
  }else{
    imgLink =  null;
  }
  return {
    props: {
      selectedPost,
      imgLink
    },
  };
}

export default function Post({ selectedPost, imgLink }) {
  // console.log(selectedPost)
  const [url, setUrl] = useState(null);
  useEffect(() => {
    setUrl(window.location.href);
  }, []);


  return (
    <Layout>
      <section>
        <Head>
        {imgLink && <meta property="og:image" content={imgLink} />}
          <title>{selectedPost[0].heading}</title>
          <meta name="description" content={selectedPost[0].description}></meta>
          <meta name="robots" content="index, follow"></meta>
          <meta property="og:url" content={url} />
          <meta property="og:title" content={selectedPost[0].heading} />
          <meta property="og:description" content={selectedPost[0].description} />

        </Head>
        {selectedPost.map((post) => (
          <div className="selected-post-container" key={post.id}>
            <h1>{post.heading}</h1>
            <div>{parse(post.content)}</div>
            <div><Link href = "/"><a>მთავარ გვერდზე დაბრუნება</a></Link></div>
          </div>
        ))}

        <style jsx>
          {`
            h1 {
              font-size: 1.8rem;
              color: #0070f3;
              text-align: center;
            }
            .selected-post-container > h1,
            .selected-post-container div {
              margin: 1.5rem 0;
            }
            img {
              min-width: 25rem;
              max-width: 100%;
            }
          `}
        </style>
      </section>
    </Layout>
  );
}
