const express = require("express");
const { authRouter } = require("./authRoute");
const { userRouter } = require("./userRoute");
const { adminRouter } = require("./adminRoute");
const { courseRouter } = require("./courseRoute");
const { moduleRouter } = require("./moduleRoute");
const { lessonRouter } = require("./lessonRoute");
const { quizRouter } = require("./quizRoute");
const { assignmentRouter } = require("./assignmentRoute");
const { paymentRouter } = require("./paymentRoute");
const { progressRouter } = require("./progressRoute");
const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/admins", adminRouter);
router.use("/courses", courseRouter);
router.use("/modules", moduleRouter);
router.use("/lessons", lessonRouter);
router.use("/quiz", quizRouter);
router.use("/assignment", assignmentRouter);
router.use("/payment", paymentRouter )
router.use("/progress",progressRouter)

module.exports = router;
