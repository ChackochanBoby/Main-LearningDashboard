const express = require("express");
const { checkAdmin, adminProfile, updateAdminProfile, updateAdminProfileImg, getInstructorManagedCourses, getAllInstructors, getAllUsers } = require("../../controllers/adminControllers");
const router = express.Router();
const { imageParser } = require("../../config/fileUpload");
const { adminAuth, adminOnly, instructorOnly } = require("../../middleware/adminAuth");
const { coursesToBeReviewed, reviewCourse, getCourseDetailsForAdmins, getAllCourses } = require("../../controllers/courseControllers");

router.get("/profile", adminAuth, adminProfile)
router.put("/update-profile", adminAuth, updateAdminProfile)
router.put("/update-profileImg",adminAuth,imageParser.single('profileImg'),updateAdminProfileImg)
//router.delete("/delete", adminAuth, deleteAdmin)
router.get("/check-admin", checkAdmin)

router.get("/courses/pending-review",adminAuth,adminOnly,coursesToBeReviewed)
router.patch("/courses/:courseId/review", adminAuth, adminOnly, reviewCourse)
router.get("/courses",adminAuth,adminOnly,getAllCourses)
router.get("/courses/:courseId",adminAuth,getCourseDetailsForAdmins)
router.get("/managed-courses",adminAuth,instructorOnly,getInstructorManagedCourses)

router.get("/users",adminAuth,adminOnly, getAllUsers)
router.get("/instructors",adminAuth,adminOnly,getAllInstructors)
module.exports = { adminRouter: router };
