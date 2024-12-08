const express = require("express");
const { adminAuth, instructorOnly } = require("../../middleware/adminAuth");
const { userAuth } = require("../../middleware/userAuth");
const { createModule, updateModule,getModuleForEnrolledUsers, deleteModule, getModuleForAdminAndInstructor } = require("../../controllers/moduleControllers");
const router = express.Router();

router.post("/:courseId/create",adminAuth,instructorOnly,createModule)
router.put("/:moduleId/update",adminAuth,updateModule)
router.get("/:moduleId",userAuth,getModuleForEnrolledUsers)
router.get("/:moduleId/manage",adminAuth,getModuleForAdminAndInstructor)
router.delete("/:moduleId",adminAuth,deleteModule)


module.exports = { moduleRouter: router };
