const express = require("express");
const router = express.Router();
const {adminAuth, instructorOnly}=require("../../middleware/adminAuth");
const {userAuth}=require("../../middleware/userAuth");
const { createCourse, updateCourse, updateCourseImg, getCourseDetails, getPublishedCourses, addForReview, getCourseContentForLearners, deleteCourse, getCourseContentForAdminsAndInstructor } = require("../../controllers/courseControllers");
const {imageParser} = require("../../config/fileUpload")

router.post("/create",adminAuth,instructorOnly,createCourse)
router.put("/:courseId/update",adminAuth,updateCourse)
router.put("/:courseId/update-thumbnail", adminAuth, imageParser.single("thumbnail"), updateCourseImg)
router.get("/:courseId",userAuth,getCourseDetails)
router.get("/", userAuth, getPublishedCourses)
router.get("/:courseId/learn",userAuth,getCourseContentForLearners)
router.get("/:courseId/manage",adminAuth,getCourseContentForAdminsAndInstructor)
router.patch("/:courseId/send-for-review",adminAuth,instructorOnly,addForReview)
router.delete("/:courseId/delete",adminAuth,deleteCourse)

module.exports = { courseRouter: router };
