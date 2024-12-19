const jwt = require("jsonwebtoken");
const {Admin}=require("../models/adminModel")

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
    const admin= await Admin.findById(decoded.id).exec()
    if(!admin){
      res.clearCookie("tokenAdmin")
      return res.status(404).json({success:false,message:"Admin not found"})
    }
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