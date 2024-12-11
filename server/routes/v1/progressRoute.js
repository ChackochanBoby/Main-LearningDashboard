const express = require('express');
const router = express.Router();
const { updateProgress } = require('../../controllers/progressControllers');
const {userAuth}=require("../../middleware/userAuth")
// Route to update progress for a specific lesson
router.put('/:courseId/:moduleId/:lessonId',userAuth, updateProgress);

module.exports = {progressRouter:router};
