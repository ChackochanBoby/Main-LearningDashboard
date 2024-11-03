const express = require("express");
const router = express.Router();

//User authentication
router.post("/user/register", (req, res) => res.send("create user"));
router.post("/user/login", (req, res) => res.send("user login"));

//Admin authentication
router.post("/admin/register", (req, res) => res.send("create admin"));
router.post("/admin/login", (req, res) => res.send("admin login"));

module.exports = { authRouter: router };
