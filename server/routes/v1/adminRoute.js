const express = require("express");
const { checkAdmin, adminProfile, updateAdminProfile, updateAdminProfileImg } = require("../../controllers/adminControllers");
const router = express.Router();
const { imageParser } = require("../../config/fileUpload");
const { adminAuth } = require("../../middleware/adminAuth");

router.get("/profile", adminAuth, adminProfile)
router.put("/update-profile", adminAuth, updateAdminProfile)
router.put("/update-profileImg",adminAuth,imageParser.single('profileImg'),updateAdminProfileImg)
//router.delete("/delete", adminAuth, deleteUser)
router.get("/check-admin", checkAdmin)

module.exports = { adminRouter: router };
