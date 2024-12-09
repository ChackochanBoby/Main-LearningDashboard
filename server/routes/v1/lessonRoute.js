const express = require("express");
const router = express.Router();
const {adminAuth,instructorOnly} = require("../../middleware/adminAuth")
const {createLesson, getLessonForLearners, deleteLesson, getLessonForAdminAndInstructor, updateLesson} = require("../../controllers/lessonControllers")
const {videoParser}=require("../../config/fileUpload");
const { userAuth } = require("../../middleware/userAuth");
const multer = require("multer");

router.post("/create/:moduleId",adminAuth,instructorOnly,videoParser.single("videoContent"),createLesson)
router.get("/:lessonId",userAuth,getLessonForLearners)
router.get("/:lessonId/manage",adminAuth,getLessonForAdminAndInstructor)
router.put("/:lessonId/update",adminAuth,videoParser.single('videoContent'),updateLesson)
router.delete("/:lessonId",adminAuth,deleteLesson)



module.exports = { lessonRouter: router };
