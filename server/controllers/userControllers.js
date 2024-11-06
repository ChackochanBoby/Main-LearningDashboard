const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");
const {cloudinaryInstance} = require("../config/fileUpload")

// User Profile
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
        profileImag: user.profileImg,
        bio: user.bio,
      },
    });
  } catch (error) {
    next(error);
  }
};
//update user profile
const updateUserProfile = async (req, res, next) => {
  const { userId } = req;
  const { name, bio } = req.body;
  if (!name && !bio) {
    return res
      .status(400)
      .json({ success: false, message: "nothing to update" });
  }
  try {
    await User.findByIdAndUpdate(userId, { name, bio });
    res.status(200).json({ success: true, message: "user updated" });
  } catch (error) {
    next(error);
  }
};

const updateUserProfileImg = async (req, res, next) => {
    const { userId } = req;
    const imgPath = req.file?.path
    const imgPublicId=req.file?.filename
    if (!imgPath||!imgPublicId) {
        return res.status(400).json({success:false,message:"missing image or public id"})
    }
    try {
        const user = await User.findById(userId).exec()
        const oldImgPublicId = user.profileImgPublicId
        if (oldImgPublicId) {
            await cloudinaryInstance.uploader.destroy(oldImgPublicId)
        }
        user.profileImg = imgPath
        user.profileImgPublicId = imgPublicId
        await user.save()
        res.status(200).json({success:true,message:"Profile image updated"})
    } catch (error) {
        next(error)
    }
};

//delete account
const deleteUser = async (req, res, next) => {};
//enroll in course
const courseEnrollment = async (req, res, next) => {};
//check user
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
      data: { name: decoded.name, id: decoded.id },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userProfile,
  updateUserProfile,
  updateUserProfileImg,
  deleteUser,
  courseEnrollment,
  checkUser,
};
