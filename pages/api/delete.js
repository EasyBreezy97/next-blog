import { deletePost, hasId } from "../../lib/db";

export default async (req, res) => {
  let id = parseInt(req.body.id);

  if (!id)
    res.status(405).json({
      msg: "id is not specified",
    });

  if (await hasId(id)) {
    deletePost(id);

    res.status(200).json({
      id: id,
      msg: `post with id:${id} is DELETED`,
    });

  } else {
    res.status(405).json({
      id: id,
      msg: `ERROR post with id:${id} does not exists`,
    });
  }
};
