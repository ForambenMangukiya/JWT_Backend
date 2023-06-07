const jwt = require("jsonwebtoken");
const User = require("../Schemas/User");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(401)
      .json({ error: "shoo! you're not authorized. Go away" });
  }

  // the auth in the headers is structured as follows: 'Bearer ddsades123ew21.dsaadwe23.d23d32'
  //and we only need the second part, the token itself
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ error: "you are not supposed to be there. nice try though." });
  }
};
module.exports = requireAuth;
