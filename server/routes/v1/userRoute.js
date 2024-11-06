const express = require("express");
const { userAuth } = require("../../middleware/userAuth");
const { userProfile, updateUserProfile, deleteUser, courseEnrollment, checkUser, updateUserProfileImg } = require("../../controllers/userControllers");
const { imageParser } = require("../../config/fileUpload");
const router = express.Router();

router.get("/profile", userAuth, userProfile)
router.put("/update-profile", userAuth, updateUserProfile)
router.put("/update-profileImg",userAuth,imageParser.single('profileImg'),updateUserProfileImg)
router.delete("/delete", userAuth, deleteUser)
router.post("/enroll/:courseId", userAuth, courseEnrollment)
router.get("/check-user",checkUser)


module.exports = { userRouter: router };
