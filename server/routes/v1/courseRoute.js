const express = require("express");
const router = express.Router();
const {adminAuth, instructorOnly}=require("../../middleware/adminAuth");
const {userAuth}=require("../../middleware/userAuth");
const { createCourse, updateCourse, updateCourseImg, getCourseDetails, getPublishedCourses, addForReview } = require("../../controllers/courseControllers");
const {imageParser} = require("../../config/fileUpload")

router.post("/create",adminAuth,instructorOnly,createCourse)
router.post("/:courseId/update",adminAuth,updateCourse)
router.post("/:courseId/update-thumbnail", adminAuth, imageParser.single("thumbnail"), updateCourseImg)
router.get("/:courseId",userAuth,getCourseDetails)
router.get("/", userAuth, getPublishedCourses)
router.patch("/:courseId/send-for-review",adminAuth,instructorOnly,addForReview)

module.exports = { courseRouter: router };
