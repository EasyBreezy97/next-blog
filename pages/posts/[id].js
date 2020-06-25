import Head from "next/head";
import { getAllPosts } from "../../lib/db";
import Layout from "../../components/layout";
import parse from "html-react-parser";

export async function getServerSideProps(context) {
  let posts = await getAllPosts();

  let parsedPosts = JSON.parse(posts);

  // console.log('ctx query::',context.query)

  let selectedPost = parsedPosts.filter(
    (post) => post.heading.split(" ").join("-") === context.query.id,
  );

  // console.log('selected post:',selectedPost)

  return {
    props: {
      selectedPost,
    },
  };
}

export default function Post({ selectedPost }) {
  return (
    <Layout>
      <section>
        <Head>
          <title>{selectedPost[0].heading}</title>
          <meta name="description" content={selectedPost[0].description}></meta>
          <meta name="robots" content="index, follow"></meta>
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
              text-align:center;
            }
            .selected-post-container > h1,
            .selected-post-container div {
              margin: 1.5rem 0;
            }
          `}
        </style>
      </section>
    </Layout>
  );
}
