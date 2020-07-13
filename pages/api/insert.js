// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { insertPost } from "../../lib/db";

export default (req, res) => {
  let { heading, content,description,img } = req.body;


  if (!heading || !content || !description || !img) {
    res.status(405).json({
      msg: "ERROR, either heading  content or description is not specified",
    });
  }
  else {
    insertPost(req.body);
    res.status(200).json({
      msg: "post created",
      data: req.body,
    });
  }

};
