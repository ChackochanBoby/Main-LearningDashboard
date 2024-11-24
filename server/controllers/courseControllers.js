const { Course } = require("../models/courseModel");
const { cloudinaryInstance } = require("../config/fileUpload");
const { CourseModule } = require("../models/courseModuleModel");

//create course
const createCourse = async (req, res, next) => {
  const { admin } = req;
  const { title, description, price } = req.body;
  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "title field is required" });
  }

  if (price !== undefined && (typeof price !== "number" || price < 0)) {
    return res
      .status(400)
      .json({ success: false, message: "Price must be a non-negative number" });
  }

  const newCourse = new Course({
    title,
    instructor: admin.id,
    description,
    price: price ?? 0,
  });
  try {
    await newCourse.save();
    res
      .status(200)
      .json({ success: true, message: "course created", data: newCourse });
  } catch (error) {
    next(error);
  }
};
//update course info
const updateCourse = async (req, res, next) => {
  const { admin } = req;
  const { courseId } = req.params;
  const { title, description, price } = req.body;
  if (!courseId) {
    return res
      .status(400)
      .json({ success: false, message: "course id missing" });
  }
  if (!title && !description && !price) {
    return res
      .status(400)
      .json({ success: false, message: "no fields to update" });
  }

  if (title && typeof title !== "string") {
    return res
      .status(400)
      .json({ success: false, message: "Title must be a string" });
  }

  if (price !== undefined && (typeof price !== "number" || price < 0)) {
    return res
      .status(400)
      .json({ success: false, message: "Price must be a non-negative number" });
  }
  try {
    const courseToUpdate = await Course.findById(courseId).exec();

    if (!courseToUpdate) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    if (
      admin.role === "instructor" &&
      admin.id !== courseToUpdate.instructor.toString()
    ) {
      return res.status(401).json({
        success: false,
        message: "not authorized to update this course",
      });
    }
    courseToUpdate.title = title ?? courseToUpdate.title;
    courseToUpdate.description = description ?? courseToUpdate.description;
    courseToUpdate.price = price ?? courseToUpdate.price;

    await courseToUpdate.save();
    res
      .status(200)
      .json({ success: true, message: "course updated", data: courseToUpdate });
  } catch (error) {
    next(error);
  }
};

//update course image
const updateCourseImg = async (req, res, next) => {
  try {
    const { admin } = req;
    const { courseId } = req.params;
    const imgPath = req.file?.path;
    const imgPublicId = req.file?.filename;
    if (!imgPath || !imgPublicId) {
      return res
        .status(400)
        .json({ success: false, message: "missing image or public id" });
    }
    if (!courseId) {
      return res
        .status(400)
        .json({ success: false, message: "missing course id" });
    }
    const course = await Course.findById(courseId).exec();
    if (!course) {
      return res
        .status(400)
        .json({ success: false, message: "course not found" });
    }
    if (
      admin.role === "instructor" &&
      admin.id !== course.instructor.toString()
    ) {
      return res.status(401).json({
        success: false,
        message:
          "only admin and instructor of this course can access this route",
      });
    }

    const oldImgPublicId = course.thumbnailPublicId;
    if (oldImgPublicId) {
      await cloudinaryInstance.uploader.destroy(oldImgPublicId);
    }
    course.thumbnail = imgPath;
    course.thumbnailPublicId = imgPublicId;
    await course.save();
    res.status(200).json({ success: true, message: "thumbnail image updated" });
  } catch (error) {
    next(error);
  }
};

const getCourseDetails = async (req, res, next) => {
  const { courseId } = req.params;
  if (!courseId) {
    return res
      .status(400)
      .json({ success: false, message: "course id is missing" });
  }
  try {
    const course = await Course.findById(courseId)
      .populate({
        path: "modules",
        select: "title _id",
      })
      .populate({ path: "instructor", select: "name bio profileImg _id" })
      .exec();
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "course not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "fetched course Data", data: course });
  } catch (error) {
    next(error);
  }
};
const getCourseDetailsForAdmins = async (req, res, next) => {
  const { courseId } = req.params;
  const { admin } = req;
  if (!admin && (!admin.id || !admin.role)) {
    return res
      .status(400)
      .json({ success: false, message: "admin role and id required" });
  }
  if (!courseId) {
    return res
      .status(400)
      .json({ success: false, message: "course id is missing" });
  }
  try {
    const course = await Course.findById(courseId)
      .populate({
        path: "modules",
        select: "title _id",
      })
      .populate({ path: "instructor", select: "name bio profileImg _id" })
      .exec();
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "course not found" });
    }
    if (admin.role === "instructor" && admin.role !== course.instructor._id) {
      return res
        .status(401)
        .json({ success: false, message: "unauthorized access" });
    }
    res
      .status(200)
      .json({ success: true, message: "fetched course Data", data: course });
  } catch (error) {
    next(error);
  }
};

//delete course

//get all published course courses
const getPublishedCourses = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);
  try {
    const [result, totalResults] = await Promise.all([
      Course.find({status:"approved"})
        .skip(skip)
        .limit(parseInt(limit))
        .populate({ path: "instructor", select: "name" })
        .exec(),
      Course.countDocuments({status:"approved"}),
    ]);
    if (!result || result.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "no courses to be found" });
    }
    const totalPages = Math.ceil(totalResults / limit);
    if(page>totalPages){
      return res.status(400).json({success:false,message:"page number is not valid"})
    }
    const mappedCourses = result.map((course) => {
      return {
        title: course.title,
        instructor: course.instructor,
        id: course._id,
        thumbnail: course.thumbnail,
      };
    });
    res.status(200).json({
      success: true,
      message: "fetched published courses",
      data: mappedCourses,
      totalPages: totalPages,
      totalResults: totalResults,
    });
  } catch (error) {
    next(error);
  }
};
//get all courses with query params
const getAllCourses = async (req, res, next) => {
  try {
    const { status } = req.query;
    if (
      status &&
      status !== "draft" &&
      status !== "unpublished" &&
      status !== "approved"
    ) {
      return res
        .status(400)
        .json({ success: false, message: "unexpected query param value" });
    }
    const optional = {};
    if (status) {
      optional.status = status;
    }
    const courses = await Course.find(optional)
      .populate({ path: "instructor", select: "name" })
      .exec();
    if (courses.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "no courses to be found" });
    }
    const mappedCourses = courses.map((course) => {
      return {
        title: course.title,
        instructor: course.instructor,
        id: course._id,
        thumbnail: course.thumbnail,
      };
    });
    res.status(200).json({
      success: true,
      message: "fetched courses",
      data: mappedCourses,
    });
  } catch (error) {
    next(error);
  }
};

// publish a course
const addForReview = async (req, res, next) => {
  const admin = req.admin;
  if (admin.role !== "instructor") {
    return res
      .status(401)
      .json({ success: "false", message: "Unauthorized access" });
  }
  const { courseId } = req.params;
  try {
    const course = await Course.findByIdAndUpdate(courseId, {
      status: "pending_review",
    }).exec();
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }
    res.status(200).json({ success: true, message: "submitted for review" });
  } catch (error) {
    next(error);
  }
};

//get courses to be reviewed
const coursesToBeReviewed = async (req, res, next) => {
  const admin = req.admin;
  if (admin.role !== "admin") {
    return res
      .status(401)
      .json({ success: "false", message: "Unauthorized access" });
  }
  try {
    const toBeReviewed = await Course.find({ status: "pending_review" }).exec();
    if (toBeReviewed.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }
    res.status(200).json({
      success: true,
      message: "fetched courses to be reviewed",
      data: toBeReviewed,
    });
  } catch (error) {
    next(error);
  }
};

//review course
const reviewCourse = async (req, res, next) => {
  const admin = req.admin;
  const review = req.body;
  const { courseId } = req.params;

  if (admin.role !== "admin") {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized access" });
  }
  if (!review || !review.action) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid review action" });
  }

  let feedback = "";
  switch (review.action) {
    case "approved":
      break;
    case "unpublished":
      feedback = review.feedback;
      if (!feedback) {
        return res.status(400).json({
          success: false,
          message: "Feedback is required for unpublished courses",
        });
      }
      break;
    default:
      return res
        .status(400)
        .json({ success: false, message: "Invalid review action" });
  }

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }
    if (course.status !== "pending_review") {
      return res
        .status(400)
        .json({ success: false, message: "Course is not pending review" });
    }

    course.status = review.action;
    course.feedback = feedback;
    await course.save();

    res
      .status(200)
      .json({ success: true, message: `Course is ${review.action}` });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCourse,
  updateCourse,
  updateCourseImg,
  getCourseDetails,
  getAllCourses,
  getCourseDetailsForAdmins,
  getPublishedCourses,
  reviewCourse,
  coursesToBeReviewed,
  addForReview,
};
