const express = require("express");
const router = express.Router();
const {adminAuth,instructorOnly} = require("../../middleware/adminAuth")
const {createLesson, getLessonForLearners, deleteLesson, getLessonForAdminAndInstructor} = require("../../controllers/lessonControllers")
const {videoParser}=require("../../config/fileUpload");
const { userAuth } = require("../../middleware/userAuth");

router.post("/create/:moduleId",adminAuth,instructorOnly,videoParser.single("videoContent"),createLesson)
router.get("/:lessonId",userAuth,getLessonForLearners)
router.get("/:lessonId/manage",adminAuth,getLessonForAdminAndInstructor)
router.delete("/:lessonId",adminAuth,deleteLesson)



module.exports = { lessonRouter: router };
