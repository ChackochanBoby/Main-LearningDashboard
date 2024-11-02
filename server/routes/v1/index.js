const express = require("express");
const router = express.Router();

router.get("/users", (req, res) => res.send("User route"));
router.use("/admins", (req, res) => res.send("Admin route"));

module.exports = router;
