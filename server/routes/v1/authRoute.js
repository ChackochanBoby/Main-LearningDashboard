const express = require("express");
const { userSignup, adminSignup, userLogin, adminLogin, adminLogout, userLogout } = require("../../controllers/authControllers");
const router = express.Router();

//User authentication
router.post("/user/register", userSignup);
router.post("/user/login", userLogin);
router.post("/user/logout", userLogout);

//Admin authentication
router.post("/admin/register", adminSignup);
router.post("/admin/login", adminLogin);
router.post("/admin/logout", adminLogout);

module.exports = { authRouter: router };
