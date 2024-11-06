const jwt = require('jsonwebtoken')


//check admin
const checkAdmin = async (req, res, next) => {
    const { tokenAdmin } = req.cookies;
  if (!tokenAdmin) {
    return res
      .status(401)
      .json({ success: false, message: "not authorized" });
  }
  try {
    const decoded = await jwt.verify(tokenAdmin, process.env.TOKEN_SECRET_ADMIN);
    res.status(200).json({success:true,message:`${decoded.role} is authorized`,data:{name:decoded.name,id:decoded.id,role:decoded.role}})
  } catch (error) {
    next(error);
  }
}

module.exports={checkAdmin}