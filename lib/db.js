const { Client } = require("pg");
//"postgres://YourUserName:YourPassword@localhost:5432/YourDatabase"

const connectionString = "postgres://postgres:123@localhost:5432/postgres";

const client = new Client({
  connectionString: connectionString,
});

client.connect();

export async function insertPost(postData) {
  const INSERT_STATUS_CODE = 1;
  try {
    await client.query(
      `INSERT INTO post(heading,content,status) VALUES($1, $2, $3)`,
      [postData.heading, postData.content, INSERT_STATUS_CODE],
    );
    let result = await client.query("SELECT * FROM post;");
    console.log(result.rows);
  } catch (error) {
    return console.error(error);
  }
}

export async function deletePost(id) {
  const DELETED_STATUS_CODE = 0;
  try {
    await client.query(
      `update post set status=${DELETED_STATUS_CODE},updated_at= now() where id=${id}`,
    );
  } catch (error) {
    return console.error(error);
  }
}

export async function updatePost(id, heading, content) {
  try {
    let singlePost = await client.query(`update post set heading='${heading}', content = '${content}' ,updated_at = now() where id=${id};
    `);
    return JSON.stringify(singlePost.rows);
  } catch (error) {
    return console.error(error);
  }
}


export async function getAllPosts() {
  try {
    let posts = await client.query(
      `select * from post where status <> 0 order by id desc`,
    );
    // console.log(posts.rows())
    return JSON.stringify(posts.rows);
  } catch (error) {
    return console.error("ERROR:", error);
  }
}

export async function getAllPostsId() {
  let posts = getAllPosts();

  // let parsedPosts = JSON.parse(posts)
  // return parsedPosts.map((post) => post.id);
  return posts;
}

export async function getPostsData(id) {
  try {
    let posts = await client.query(
      `select * from post where status <> 0 order by id desc`,
    );

    let selectedPost = posts.rows.filter((post) => post.id === id);
    let post = JSON.stringify(selectedPost);
    return {
      params: {
        post,
      },
    };
  } catch (error) {
    console.error("ERROR:", error);
    return;
  }
}
