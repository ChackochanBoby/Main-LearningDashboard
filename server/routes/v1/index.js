const express = require("express");
const { authRouter } = require("./authRoute");
const { userRouter } = require("./userRoute");
const { adminRouter } = require("./adminRoute");
const { courseRouter } = require("./courseRoute");
const { moduleRouter } = require("./moduleRoute");
const { lessonRouter } = require("./lessonRoute");
const { quizRouter } = require("./quizRoute");
const { assignmentRouter } = require("./assignmentRoute");
const { userAuth } = require("../../middleware/userAuth");
const { adminAuth } = require("../../middleware/adminAuth");
const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/admins", adminRouter);
router.use("/courses", courseRouter);
router.use("/modules", moduleRouter);
router.use("/lessons", lessonRouter);
router.use("/quiz", quizRouter);
router.use("/assignment", assignmentRouter);

module.exports = router;
