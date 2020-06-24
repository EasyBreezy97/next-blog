import { updatePost, hasId } from "../../lib/db";
export default async (req, res) => {
  let { id, heading, content, description } = req.body;
  // console.log(req.body);

  parseInt(id);

  if ((!id || !heading || !content, !description)) {
    res.status(405).json({
      msg: "all fields must be filled",
    });
  }
  if (await hasId(id)) {
    await updatePost(id, heading, description, content);
    res.status(200).json({
      msg: `post with id:${id} updated`,
    });
  } else {
    res.status(405).json({
      id: id,
      msg: `ERROR ! post with id:${id} does not exists`,
    });
  }
};
