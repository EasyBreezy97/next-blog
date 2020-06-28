import jwt from "jsonwebtoken";

export default (req, res) => {
  if (req.method === "POST") {
    const { username, password } = req.body;
    console.log(username, password);
    if (username === "user1" && password === "pass") {
      jwt.sign(
        { username, password },
        "secretkey",
        { expiresIn: "1h" },
        (err, token) => {

          res.setHeader('token',token)
          res.writeHead(301, {'Location': `/dashboard?token=${token}`})
          res.end(token)
        },
      );
    } else {
      res.status(405).json({
        msg: "username or password is not correct",
      });
    }
  } else {
    res.json({ msg: "only POST is allowed" });
  }
};
