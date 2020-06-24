import Head from "next/head";
import { getAllPosts } from "../../lib/db";
import Layout from "../../components/layout";
import parse from 'html-react-parser';



export async function getServerSideProps(context) {
  let posts = await getAllPosts();

  let parsedPosts = JSON.parse(posts);

  // console.log('ctx query::',context.query)

  let selectedPost = parsedPosts.filter((post) => post.heading.split(" ").join("-") === context.query.id);

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
          <div key={post.id}>
            <h1>{post.heading}</h1>
            <div>{parse(post.content)}</div>
          </div>
        ))}
      </section>
    </Layout>
  );
}
