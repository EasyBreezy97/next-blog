import Head from "next/head";
import Link from "next/link";
import { getAllPosts } from "../../lib/db";
import Layout from "../../components/layout";
import parse from "html-react-parser";

export async function getServerSideProps(context) {
  let posts = await getAllPosts();

  let parsedPosts = JSON.parse(posts);
  let protocol = context.req.connection.encrypted ? "https" : "http";
  let { host } = context.req.headers;
  let { url } = context.req;

  let fullUrl = `${protocol}://${host}${url}`;

  let selectedPost = parsedPosts.filter(
    (post) => post.heading.split(" ").join("-") === context.query.id,
  );

  return {
    props: {
      selectedPost,
      fullUrl,
    },
  };
}

export const config = { amp: true };

export default function Post({ selectedPost, fullUrl }) {
  return (
    <Layout>
      <Head>
        <meta property="og:image" content={selectedPost[0].image} />
        <title>{selectedPost[0].heading}</title>
        <meta name="description" content={selectedPost[0].description}></meta>
        <meta name="robots" content="index, follow"></meta>
        <meta property="og:url" content={fullUrl} />
        <meta property="og:title" content={selectedPost[0].heading} />
        <meta property="og:description" content={selectedPost[0].description} />
      </Head>
      <section>
        {selectedPost.map((post) => (
          <div className="selected-post-container" key={post.id}>
            {console.log(post)}
            <h1>{post.heading}</h1>
            <amp-img
              width="5"
              height="5"
              src={post.image}
              alt="image"
              layout="responsive"
            />
            <div>{parse(post.content)}</div>

            <div>
              <Link href="/">
                <a className="back-to-home">მთავარ გვერდზე დაბრუნება</a>
              </Link>
            </div>
          </div>
        ))}

        <style jsx>
          {`
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
              text-align: center;
              display: block;
            }
            a :hover {
              opacity: 0.85;
            }

            section {
              font-family: "Georgian", "Helvetica Neue", Helvetica, sans-serif;
              font-size: 1.1rem;
              font-weight: 400;
              color: #282828;
            }
            main:focus{
              outline:none;
            }
            h1 {
              font-size: 1.8rem;
              color: #0070f3;
              text-align: center;
            }
            .selected-post-container {
              width: 50%;
              margin: 0.5rem auto;
            }
            .selected-post-container > h1,
            .selected-post-container div {
              margin: 1.5rem 0;
            }

            amp-img {
              max-width: 40rem;
              margin: 0 auto;
              height: auto;
            }

            .back-to-home {
              display: inline;
            }

            @media only screen and (max-width: 600px) {
              .selected-post-container {
                width: 90%;
              }
            }
          `}
        </style>
      </section>
    </Layout>
  );
}
