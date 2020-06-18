import { deletePost } from "../../lib/db";

export default (req, res) => {
  let id = parseInt(req.body.id);
  deletePost(id);
  res.status(200).json({
    id: req.body.id ,
    msg:`post with id: ${id} is DELETED`
  });
};
