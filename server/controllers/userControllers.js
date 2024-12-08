const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");
const { cloudinaryInstance } = require("../config/fileUpload");
const { Enrollment } = require("../models/enrollmentModel");
const { Course } = require("../models/courseModel");
const { generateUserToken } = require("../utils/jwt");

/**
 * 
 * controller to get user profile
 * 
 */
const userProfile = async (req, res, next) => {
  const { userId } = req;
  if (!userId) {
    return res.status(401).json({ success: false, message: "missing userId" });
  }
  try {
    const user = await User.findById(userId).exec();
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
    res.status(200).json({
      success: true,
      message: "fetched user profile",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        profileImg: user.profileImg,
        bio: user.bio,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 
 * controller to update user profile
 * 
*/
const updateUserProfile = async (req, res, next) => {
  const { userId } = req;
  const { name, bio } = req.body;
  if (!name && !bio) {
    return res
      .status(400)
      .json({ success: false, message: "nothing to update" });
  }
  try {
    const user =await User.findByIdAndUpdate(userId, { name, bio });
    const token = await generateUserToken({
      name:user.name,profileImg:user.profileImg,role:"user",id:user._id
    })
    res.cookie("tokenUser", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: process.env.ENVIRONMENT==="PRODUCTION"?true:false,
      secure: process.env.ENVIRONMENT==="PRODUCTION"?true:false,
      sameSite: process.env.ENVIRONMENT==="PRODUCTION"?"None":"Lax"
    });
    res.status(200).json({ success: true, message: "user updated" });
  } catch (error) {
    next(error);
  }
};

/**
 * 
 * controller to update profile image of user
 * 
*/
const updateUserProfileImg = async (req, res, next) => {
  const { userId } = req;
  const imgPath = req.file?.path;
  const imgPublicId = req.file?.filename;
  if (!imgPath || !imgPublicId) {
    return res
      .status(400)
      .json({ success: false, message: "missing image or public id" });
  }
  try {
    const user = await User.findById(userId).exec();
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
    const oldImgPublicId = user.profileImgPublicId;
    if (oldImgPublicId) {
      await cloudinaryInstance.uploader.destroy(oldImgPublicId);
    }
    user.profileImg = imgPath;
    user.profileImgPublicId = imgPublicId;
    await user.save();
    const token = await generateUserToken({
      name:user.name,profileImg:user.profileImg,role:"user",id:user._id
    })
    res.cookie("tokenUser", token, {
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

/**
 * 
 * controller to delete account
 * 
*/
const deleteUser = async (req, res, next) => {};

/**
 * 
 * controller to enroll user to a course
 * 
 */
const courseEnrollment = async (req, res, next) => {
  const {userId}=req
  const {courseId}=req.params
  if(!courseId){
    return res.status(400).json({success:false, message:"course id missing from request"})
  }
  try {
    const courseExists = Course.exists({_id:courseId})
    if(!courseExists) {
      return res.status(404).json({success:false, message: "course doesn't exist"})
    }
    const isEnrolled = await Enrollment.exists({learner:userId,course:courseId}).exec()
    if(isEnrolled){
      return res.status(400).json({success:false,message:"user is already enrolled"})
    }
    const newEnrollment = new Enrollment({learner:userId,course:courseId})
    await newEnrollment.save()
    res.status(200).json({success:true, message:"user enrolled in course Successfully"})
  } catch (error) {
    next(error)
  }
};

/**
 * 
 * controller to check if user is enrolled in a course returns true or false
 * 
 */
const checkEnrollment=async(req,res,next)=>{
  const { userId } = req
  const {courseId} = req.params
  try {
    const isEnrolled = await Enrollment.exists({learner:userId,course:courseId}).exec()
    const data=isEnrolled?true:false
    res.status(200).json({success:true,data})
  } catch (error) {
    next(error)
  }
}

/**
 * 
 * controller that varifies user token and return payload
 * 
 */
const checkUser = async (req, res, next) => {
  const { tokenUser } = req.cookies;
  if (!tokenUser) {
    return res
      .status(401)
      .json({ success: false, message: "User not authorized" });
  }
  try {
    const decoded = await jwt.verify(tokenUser, process.env.TOKEN_SECRET_USER);
    res.status(200).json({
      success: true,
      message: "user is authorized",
      data: { name: decoded.name, id: decoded.id, role: "user",profileImg:decoded.profileImg },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 
 * function that gets the enrolled courses of the user
 * 
*/
const getEnrolledCourses = async (req, res, next) => {
  const { userId } = req;
  try {
    const enrolled = await Enrollment.find({ learner: userId })
      .populate({
        path: "course",
        select: "_id instructor title thumbnail",
        populate: { path: "instructor", select: "name _id" },
      })
      .exec();
      if(!enrolled){
        return res.status(404).json({success:false,message:"user not enrolled in any course"})
      }
    const courses = enrolled.map((enrolled) => {
      return {
        title: enrolled.course.title,
        id: enrolled.course._id,
        instructor:{ name:enrolled.course.instructor.name,id:enrolled.course.instructor.id},
        thumbnail: enrolled.course.thumbnail,
      };
    });
    res.status(200).json({success:true,message:"fetched enrolled courses",data:courses})
  } catch (error) {
    next(error)
  }
};

module.exports = {
  userProfile,
  updateUserProfile,
  updateUserProfileImg,
  deleteUser,
  courseEnrollment,
  getEnrolledCourses,
  checkUser,
  checkEnrollment
};
