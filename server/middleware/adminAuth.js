const jwt = require("jsonwebtoken");

const adminAuth = async (req, res, next) => {
    const { tokenAdmin } = req.cookies;
    console.log(tokenAdmin)
  if (!tokenAdmin) {
    return res
      .status(401)
      .json({ success: false, message: "admin not authorized" });
  }
  try {
    const decoded = await jwt.verify(tokenAdmin, process.env.TOKEN_SECRET_ADMIN);
    req.admin = {id:decoded.id,role:decoded.role}
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { adminAuth };