const jwt = require("jsonwebtoken");
const { Admin } = require("../models/adminModel");
const {cloudinaryInstance} = require("../config/fileUpload");
const { Course } = require("../models/courseModel");
const {generateAdminToken} = require("../utils/jwt");
const { User } = require("../models/userModel");
const { Enrollment } = require("../models/enrollmentModel");

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
    const admin = await Admin.findByIdAndUpdate(adminData.id, { name, bio });
    const token = await generateAdminToken({
      name:admin.name,profileImg:admin.profileImg,role:admin.role,id:admin._id
    })
    res.cookie("tokenAdmin", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: process.env.ENVIRONMENT==="PRODUCTION"?true:false,
      secure: process.env.ENVIRONMENT==="PRODUCTION"?true:false,
      sameSite: process.env.ENVIRONMENT==="PRODUCTION"?"None":"Lax"
    });
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
    const token = await generateAdminToken({
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

const getAllUsers = async(req,res,next)=>{
  try {
    const users = await User.find().exec()
    if(!users||(Array.isArray(users)&&users.length==0)){
      return res.status(404).json({success:false,message:"could not fetch users"})
    }

    const mappedUsers = users.map((user)=>{
      return {
        name:user.name,
        profileImg:user.profileImg,
        email:user.email,
        _id:user._id,
        role:"learner"
      }
    })

    res.status(200).json({success:true,message:"fetched all users",data:mappedUsers})
  } catch (error) {
    next(error)
  }
}

const getAllInstructors = async(req,res,next)=>{
  try {
    const instructors = await Admin.find({role:"instructor"}).exec()
    if(!instructors||(Array.isArray(instructors)&&instructors.length==0)){
      return res.status(404).json({success:false,message:"could not fetch instructors"})
    }
    const mappedInstructors = instructors.map((instructor)=>{
      return {
        name:instructor.name,
        email:instructor.email,
        profileImg:instructor.profileImg,
        _id:instructor._id,
        role:instructor.role
      }
    })
    res.status(200).json({success:true,message:"fetched all instructors",data:instructors})
  } catch (error) {
    next(error)
  }
}

const getStats=async(req,res,next)=>{
  try{
    const numberOfLeraners = await User.countDocuments()
    const numberOfInstructors= await Admin.countDocuments({role:"instructor"})
    const numberOfPublishedCourses= await Course.countDocuments({status:"approved"})
    const numberOfCoursesPendingReview= await Course.countDocuments({status:"pending_review"})
    res.status(200).json({success:true,message:"fetched platform stats",data:{
      totalLearners:numberOfLeraners,totalInstructors:numberOfInstructors,pendingReview:numberOfCoursesPendingReview,publishedCourses:numberOfPublishedCourses
    }})
  }catch(error){
    next(error)
  }
}

const getLearnerById = async (req, res, next) => {
  const learnerId = req.params.learnerId;
  try {
    // Find the user profile
    const user = await User.findById(learnerId).exec();
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Find the enrollments of the learner
    const enrollments = await Enrollment.find({ learner: learnerId })
      .populate({path:"course",select:"_id title"})
      .exec();
      console.log(enrollments)

    // If no enrollments, return user details with an empty array for courses
    const enrolledCourses = enrollments.length
      ? enrollments.map((enrollment) => ({
          title: enrollment.course.title,
          id: enrollment.course._id,enrollmentId:enrollment._id
        }))
      : [];

    // Send back the profile and enrolled courses
    res.status(200).json({
      success: true,
      message: "Fetched user details",
      data: {
        profile: user,
        enrolledCourses: enrolledCourses,
      },
    });
  } catch (error) {
    next(error);
  }
};
const getInstructorById=async (req,res,next)=>{
  const instructorId=req.params.instructorId
    try {
      const instructor=await Admin.findOne({_id:instructorId,role:"instructor"}).exec()
      if(!instructor){
        return res.status(404).json({success:false, message:"Instructor not found"})
      }
      const managedCourses= await Course.find({instructor:instructorId}).exec()
      if(!managedCourses){
        return res.status(200).json({success:true,message:"fetched Instructor details",data:{
          profile:instructor,managedCourses:[]
        }})
      }
      res.status(200).json({success:true,message:"fetched Instructor details",data:{profile:instructor,managedCourses:managedCourses}})
    }catch(error){
      next(error)
    }
}

const deleteLearner = async (req, res, next) => {
  const { learnerId } = req.params;

  try {
    // Find and delete all enrollments associated with the user
    const enrollments = await Enrollment.find({ learner: learnerId }).exec();
    if (enrollments.length > 0) {
      await Enrollment.deleteMany({ learner: learnerId });
    }

    // Delete the user
    const deletedUser = await User.findByIdAndDelete(learnerId);
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "Learner not found",
      });
    }

    // Respond with success
    res.status(200).json({
      success: true,
      message: "learner and associated enrollments successfully deleted",
    });
  } catch (error) {
    next(error);
  }
};

const deleteEnrollment=async(req,res,next)=>{
  const {enrollmentId}=req.params
  try {
    const deletedEnrollment = await Enrollment.findByIdAndDelete(enrollmentId).exec()
    if(!deletedEnrollment){
      return res.status(404).json({success:false,message:"enrollment does not exist"})
    }
    res.status(200).json({success:true,message:"enrollment successfully deleted"})
  } catch (error) {
    next(error)
  }
}
const deleteInstructorById=async ( req,res,next )=>{
  const {instructorId}=req.params
  try {
    const deletedInstructor=await Admin.findByIdAndDelete(instructorId).exec()
    if(!deletedInstructor){
      return res.status(404).json({success:false,message:"Instructor not found"})
    }
    res.status(200).json({success:true,message:"instructor deleted successfully"})
    
  } catch (error) {
    next(error)
  }
}

module.exports = {
  adminProfile,
  updateAdminProfile,
  updateAdminProfileImg,
  checkAdmin,
  getInstructorManagedCourses,
  getAllInstructors,
  getAllUsers,
  getStats,
  getInstructorById,
  getLearnerById,
  deleteLearner,
  deleteEnrollment,
  deleteInstructorById,
};
