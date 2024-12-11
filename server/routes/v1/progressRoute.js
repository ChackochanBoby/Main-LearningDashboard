const express = require('express');
const router = express.Router();
const { updateProgress, checkLessonCompletion, getCourseCompletionPercentage } = require('../../controllers/progressControllers');
const {userAuth}=require("../../middleware/userAuth")
// Route to update progress for a specific lesson
router.put('/:courseId/:moduleId/:lessonId',userAuth, updateProgress);
router.get("/:courseId/:lessonId/lesson-progress",userAuth,checkLessonCompletion)
router.get("/:courseId",userAuth,getCourseCompletionPercentage)

module.exports = {progressRouter:router};
