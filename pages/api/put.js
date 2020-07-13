import { updatePost, hasHeading } from "../../lib/db";
export default async (req, res) => {
  let { heading, content, description,img } = req.body;
  console.log('bodyyyyy:',req.body);
  // console.log('HEADING::',heading)


  if ( !heading[1] || !content || !description) {
    res.status(405).json({
      msg: "all headingfields must be filled",
    });
  }
  if (await hasHeading(heading[0])) {
    await updatePost( heading[0],heading[1], description, content,img);
    res.status(200).json({
      msg: `post with heading:${heading[0]} updated`,
    });
  } else {
    res.status(405).json({
      heading: heading,
      msg: `ERROR ! post with heading:${heading[0]} does not exists`,
    });
  }
};
