require("dotenv").config();
const { Client } = require("pg");

//"postgres://YourUserName:YourPassword@localhost:5432/YourDatabase"
const connectionString = process.env.PG_PRODUCTION_STRING; //from online database

const client = new Client({
  connectionString: connectionString,
});

client.connect();

export async function insertPost(postData) {
  const INSERT_STATUS_CODE = 1;
  try {
    postData.heading = postData.heading.trim();
    postData.content = postData.content.trim();
    postData.description = postData.description.trim();
    await client.query(
      `INSERT INTO post(heading,content,description,status) VALUES($1, $2, $3,$4)`,
      [
        postData.heading,
        postData.content,
        postData.description,
        INSERT_STATUS_CODE,
      ],
    );
  } catch (error) {
    return console.error(error);
  }
}

export async function deletePost(heading) {
  const DELETED_STATUS_CODE = 0;
  try {
    await client.query(
      `update post set status=${DELETED_STATUS_CODE},updated_at= now() where heading='${heading}'`,
    );
  } catch (error) {
    return console.error(error);
  }
}

export async function updatePost(oldHeading, newHeading, description, content) {
  try {
    content = content.trim();
    let singlePost = await client.query(`update post set heading='${newHeading}', content = '${content}', description ='${description}',updated_at = now() where heading='${oldHeading}';
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
    return JSON.stringify(posts.rows);
  } catch (error) {
    return console.error("ERROR:", error);
  }
}

export async function hasId(id) {
  try {
    let ids = await client.query(`select id from post`);
    let idsArray = ids.rows;
    return idsArray.filter((number) => number.id == id).length !== 0;
  } catch (error) {
    return console.error("ERROR:", error);
  }
}

export async function getPostHeadings() {
  try {
    let headings = await client.query(
      `select heading from post where status <> 0 order by heading asc;`,
    );
    return JSON.stringify(headings.rows);
  } catch (error) {
    console.error("ERROR:", error);
    return;
  }
}

export async function getSelectedPost(heading) {
  try {
    let post = await client.query(`select heading,content,description from post where heading = '${heading}';
    `);

    return post.rows[0];
  } catch (error) {
    console.error("ERROR:", error);
  }
}

export async function hasHeading(heading) {
  try {
    let headings = await client.query(`select heading from post`);
    let headingsArray = headings.rows;
    return (
      headingsArray.filter((element) => element.heading === heading).length !==
      0
    );
  } catch (error) {
    return console.error("ERROR:", error);
  }
}
