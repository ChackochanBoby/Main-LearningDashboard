const jwt = require("jsonwebtoken");

const adminAuth = async (req, res, next) => {
    const { tokenAdmin } = req.cookies;
  if (!tokenAdmin) {
    return res
      .status(401)
      .json({ success: false, message: "not authorized" });
  }
  try {
    const decoded = await jwt.verify(tokenAdmin, process.env.TOKEN_SECRET_ADMIN);
    req.admin = {id:decoded.id,role:decoded.role}
    next();
  } catch (error) {
    next(error);
  }
};

const adminOnly = async (req, res, next) => {
  try {
    const { admin } = req
    if (admin.role === "instructor") {
      return res.status(401).json({success:false,message:"only admins can access this route"})
    }
    next()
  } catch (error) {
    next(error)
  }
}
const instructorOnly = async (req, res, next) => {
  try {
    const { admin } = req
    if (admin.role === "admin") {
      return res.status(401).json({success:false,message:"only instructors can access this route"})
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = { adminAuth,instructorOnly,adminOnly };