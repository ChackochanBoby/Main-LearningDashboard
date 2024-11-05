const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  const { tokenUser } = req.cookies;
  if (!tokenUser) {
    return res
      .status(401)
      .json({ success: false, message: "User not authorized" });
  }
  try {
    const decoded = await jwt.verify(tokenUser, process.env.TOKEN_SECRET_USER);
    req.userId = decoded.id;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { userAuth };
