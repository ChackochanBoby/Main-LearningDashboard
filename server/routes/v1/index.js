const express = require("express");
const { authRouter } = require("./authRoute");
const { userRouter } = require("./userRoute");
const { adminRouter } = require("./adminRoute");
const { courseRouter } = require("./courseRoute");
const { moduleRouter } = require("./moduleRoute");
const { lessonRouter } = require("./lessonRoute");
const { quizRouter } = require("./quizRoute");
const { assignmentRouter } = require("./assignmentRoute");
const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/admins", adminRouter);
router.use("/courses", courseRouter);
router.use("/:courseid/modules", moduleRouter);
router.use("/:moduleId/lessons", lessonRouter);
router.use("/:lessonId/quiz", quizRouter);
router.use("/:moduleId/assignment", assignmentRouter);

module.exports = router;
