import Head from "next/head";
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

  return {
    props: {
      selectedPost,
    },
  };
}

export default function Post({ selectedPost }) {
  const [url, setUrl] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  useEffect(() => {
    setUrl(window.location.href);
    // fetchImgLink()
    // console.log(selectedPost)

    fetchImgLink(selectedPost);
  }, []);

  // const fetchImgLink = (selectedPost) => {
  //   console.log(props)
  // }

  const fetchImgLink = (selectedPost) => {
    let content = selectedPost[0].content;
    let imgRegex = /<img src\s*=\s*\\*"(.+?)\\*"\s*>/;
    // console.log( content.match(imgRegex).length)
    if(content.match(imgRegex)){
      let imgSrc = content.match(imgRegex)[1].split("alt")[0];
      console.log(imgSrc)
      setImgSrc(imgSrc);
    }
    return;
  };

  return (
    <Layout>
      <section>
        <Head>
          <title>{selectedPost[0].heading}</title>
          <meta name="description" content={selectedPost[0].description}></meta>
          <meta name="robots" content="index, follow"></meta>
          {imgSrc && <meta name="og:image" content={imgSrc} />}
          <meta name="og:url" content={url} />
          <meta name="og:title" content={selectedPost[0].heading} />
          <meta name="og:description" content={selectedPost[0].description} />
        </Head>
        {selectedPost.map((post) => (
          <div className="selected-post-container" key={post.id}>
            <h1>{post.heading}</h1>
            <div>{parse(post.content)}</div>
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
