import {getSelectedPost} from '../../lib/db'
export default async (req, res) => {
  const {heading} = req.body;

  let post = await getSelectedPost(req.body.heading)
  res.status(200).json({
    post: post,
  });

}