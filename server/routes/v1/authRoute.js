const express = require("express");
const { userSignup, adminSignup, userLogin, adminLogin, adminLogout, userLogout, updateUserEmail, verifyEmailChange } = require("../../controllers/authControllers");
const { userAuth } = require("../../middleware/userAuth");
const router = express.Router();

//User authentication
router.post("/user/register", userSignup);
router.post("/user/login", userLogin);
router.post("/user/logout", userLogout);
router.post("/user/email-verify", userAuth, updateUserEmail)
router.get("/user/email-verify",verifyEmailChange)

//Admin authentication
router.post("/admin/register", adminSignup);
router.post("/admin/login", adminLogin);
router.post("/admin/logout", adminLogout);

module.exports = { authRouter: router };
