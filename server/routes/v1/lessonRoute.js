const express = require("express");
const router = express.Router();
const {adminAuth,instructorOnly} = require("../../middleware/adminAuth")
const {createLesson, getLessonForLearners} = require("../../controllers/lessonControllers")
const {videoParser}=require("../../config/fileUpload");
const { userAuth } = require("../../middleware/userAuth");

router.post("/create/:moduleId",adminAuth,instructorOnly,videoParser.single("videoContent"),createLesson)
router.get("/:lessonId",userAuth,getLessonForLearners)



module.exports = { lessonRouter: router };
