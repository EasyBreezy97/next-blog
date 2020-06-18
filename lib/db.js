// lib/db.js
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
    console.error(error);
  }
}

export async function deletePost(id) {
  const DELETED_STATUS_CODE = 0;
  try {
    await client.query(
      `update post set status=${DELETED_STATUS_CODE},updated_at= now() where id=${id}`,
    );
  } catch (error) {
    console.error(error);
  }
}

export async function getAllPosts() {
  try {
    let posts = await client.query(
      `select * from post where id <> 0`,
    );
    // console.log(posts.rows())
    return JSON.stringify(posts.rows);

  } catch (error) {
    console.error("ERROR:",error);
  }
}
