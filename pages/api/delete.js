import { deletePost, hasHeading } from "../../lib/db";

export default async (req, res) => {

  let {heading} = req.body;
  console.log('hediing from delete::',heading, typeof heading)
  if (!heading)
    res.status(405).json({
      msg: "heading is not specified",
    });

  if (await hasHeading(heading)) {
    deletePost(heading);

    res.status(200).json({
      heading: heading,
      msg: `post with heading:${heading} is DELETED`,
    });

  } else {
    res.status(405).json({
      heading: heading,
      msg: `ERROR post with heading:${heading} does not exists`,
    });
  }
};
