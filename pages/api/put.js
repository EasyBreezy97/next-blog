import { updatePost } from "../../lib/db";
export default  async (req, res) => {
  let { id,heading,content } = req.body;
  console.log(req.body)

  parseInt(id)

  if (!id || !heading || !content) {
    res.status(405).json({
      msg: "all fields must be filled",
    });
  }
  else {
    console.log(id)
    await updatePost(id,heading,content)
    res.status(200).json({
      msg:`post with id:${id} updated`
    })
  }

};
