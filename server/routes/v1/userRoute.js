const express = require("express");
const { userAuth } = require("../../middleware/userAuth");
const { userProfile, updateUserProfile, deleteUser, checkUser, updateUserProfileImg, getEnrolledCourses, checkEnrollment } = require("../../controllers/userControllers");
const { imageParser } = require("../../config/fileUpload");
const router = express.Router();

router.get("/profile", userAuth, userProfile)
router.put("/update-profile", userAuth, updateUserProfile)
router.put("/update-profileImg",userAuth,imageParser.single('profileImg'),updateUserProfileImg)
router.delete("/delete", userAuth, deleteUser)
router.get("/check-enrollment/:courseId",userAuth,checkEnrollment)
router.get("/enrolled-courses",userAuth, getEnrolledCourses)
router.get("/check-user",checkUser)


module.exports = { userRouter: router };
