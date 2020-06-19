import { getAllPosts } from "../../lib/db";

export async function getServerSideProps(context) {
  let posts = await getAllPosts();
  // let postsIdArray = JSON.parse(postsId);
  console.log(posts);
  console.log(context);
  let parsedPosts = JSON.parse(posts);

  let selectedPost = parsedPosts.filter((post) => post.id === context.query.id);

  return {
    props: {
      selectedPost,
    },
  };
}

export default function Post({ selectedPost }) {
  {
    console.log(typeof selectedPost);
    console.log( selectedPost);
  }
  return (
    <section>
      {selectedPost.map((post) => (
        <div key={post.id}>
          <h1>{post.heading}</h1>
          <p>{post.content}</p>
        </div>
      ))}
    </section>
  );
}
