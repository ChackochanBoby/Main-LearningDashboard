const jwt = require("jsonwebtoken");
const {User} = require("../models/userModel")
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
    const user= await User.findById(decoded.id).exec()
    if(!user){
      res.clearCookie("tokenUser")
      return res.status(404).json({success:false,message:"user not found"})
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { userAuth };
