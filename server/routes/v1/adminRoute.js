const express = require("express");
const { checkAdmin } = require("../../controllers/adminControllers");
const router = express.Router();



router.get("/check-admin", checkAdmin)

module.exports = { adminRouter: router };
