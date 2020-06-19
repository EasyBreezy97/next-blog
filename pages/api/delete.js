import { deletePost } from "../../lib/db";

export default (req, res) => {
  let id = parseInt(req.body.id);
  if (!id) {
    res.status(405).json({
      msg: "id is not specified",
    });
  } else {
    deletePost(id);
    res.status(200).json({
      id: id,
      msg: `post with id:${id} is DELETED`,
    });
  }
};
