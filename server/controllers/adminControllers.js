const jwt = require("jsonwebtoken");
const { Admin } = require("../models/adminModel");
const {cloudinaryInstance} = require("../config/fileUpload");
const { Course } = require("../models/courseModel");

// User Profile
const adminProfile = async (req, res, next) => {
  const adminData = req.admin;
  if (!adminData.id) {
    return res
      .status(401)
      .json({ success: false, message: "missing admin Id" });
  }
  try {
    const admin = await Admin.findById(adminData.id).exec();
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "admin not found" });
    }
    res.status(200).json({
      success: true,
      message: "fetched admin profile",
      data: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        profileImg: admin.profileImg,
        bio: admin.bio,
      },
    });
  } catch (error) {
    next(error);
  }
};

//update user profile
const updateAdminProfile = async (req, res, next) => {
  const adminData = req.admin;
  const { name, bio } = req.body;
  if (!name && !bio) {
    return res
      .status(400)
      .json({ success: false, message: "nothing to update" });
  }
  try {
    await Admin.findByIdAndUpdate(adminData.id, { name, bio });
    res.status(200).json({ success: true, message: "admin updated" });
  } catch (error) {
    next(error);
  }
};

//change admin profile image
const updateAdminProfileImg = async (req, res, next) => {
  const adminData = req.admin;
  const imgPath = req.file?.path;
  const imgPublicId = req.file?.filename;
  if (!imgPath || !imgPublicId) {
    return res
      .status(400)
      .json({ success: false, message: "missing image or public id" });
  }
  try {
    const admin = await Admin.findById(adminData.id).exec();
    if (!admin) {
      return res.status(404).json({success:false,message:"user not found"})
    }
    const oldImgPublicId = admin.profileImgPublicId;
    if (oldImgPublicId) {
      await cloudinaryInstance.uploader.destroy(oldImgPublicId);
    }
    admin.profileImg = imgPath;
    admin.profileImgPublicId = imgPublicId;
    await admin.save();
    const token = await generateUserToken({
      name:admin.name,profileImg:admin.profileImg,role:admin.role,id:admin._id
    })
    res.cookie("tokenAdmin", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: process.env.ENVIRONMENT==="PRODUCTION"?true:false,
      secure: process.env.ENVIRONMENT==="PRODUCTION"?true:false,
      sameSite: process.env.ENVIRONMENT==="PRODUCTION"?"None":"Lax"
    });
    res.status(200).json({ success: true, message: "Profile image updated" });
  } catch (error) {
    next(error);
  }
};

//check admin
const checkAdmin = async (req, res, next) => {
  const { tokenAdmin } = req.cookies;
  if (!tokenAdmin) {
    return res.status(401).json({ success: false, message: "not authorized" });
  }
  try {
    const decoded = await jwt.verify(
      tokenAdmin,
      process.env.TOKEN_SECRET_ADMIN
    );
    res
      .status(200)
      .json({
        success: true,
        message: `${decoded.role} is authorized`,
        data: { name: decoded.name, id: decoded.id, role: decoded.role,profileImg:decoded.profileImg },
      });
  } catch (error) {
    next(error);
  }
};

const getInstructorManagedCourses=async (req,res,next)=>{
  const instructorId=req.admin.id
  try {
    const managedCourses= await Course.find({instructor:instructorId}).populate({path:"instructor",select:"_id name"}).exec()
    if(!managedCourses||!Array.isArray(managedCourses)){
      return res.status(404).json({success:false,message:"no courses to be found"})
    }
    const managedCoursesMapped=managedCourses.map((course)=>{return {
      id:course._id,title:course.title,thumbnail:course.thumbnail,instructor:course.instructor
    }})
    res.status(200).json({success:true,message:"fetched managed courses",data:managedCoursesMapped})
    
  } catch (error) {
    next(error)
  }
}


module.exports = {
  adminProfile,
  updateAdminProfile,
  updateAdminProfileImg,
  checkAdmin,
  getInstructorManagedCourses
};
