const { Course } = require("../models/courseModel");
const { cloudinaryInstance } = require("../config/fileUpload");
const { CourseModule } = require("../models/courseModuleModel");
const {Enrollment}= require("../models/enrollmentModel");

//create course
const createCourse = async (req, res, next) => {
  const { admin } = req;
  const { title, description, price } = req.body;

  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "title field is required" });
  }

  if (typeof price !== "number" || price <= 0) {
    return res
      .status(400)
      .json({ success: false, message: "Price must be a positive number" });
  }

  // Create the new course
  const newCourse = new Course({
    title,
    instructor: admin.id,
    description,
    price, 
  });

  try {
    await newCourse.save();
    res
      .status(200)
      .json({ success: true, message: "Course created", data: newCourse });
  } catch (error) {
    next(error);
  }
};

//update course info
const updateCourse = async (req, res, next) => {
  console.log("Update course endpoint hit");
  const { admin } = req;
  const { courseId } = req.params;
  const { title, description, price } = req.body;

  // Ensure courseId is provided
  if (!courseId) {
    return res.status(400).json({
      success: false,
      message: "Course ID is required",
    });
  }

  // Ensure at least one field (title, description, or price) is provided
  if (!title && !description && price === undefined) {
    return res.status(400).json({
      success: false,
      message: "At least one field (title, description, or price) must be provided for update",
    });
  }

  // Validate title (if provided)
  if (title && typeof title !== "string") {
    return res.status(400).json({
      success: false,
      message: "Title must be a non-empty string",
    });
  }

  // Validate price (if provided)
  if (price !== undefined) {
    const parsedPrice = parseFloat(price); // Ensure price is parsed as a number
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be a positive number",
      });
    }
  }

  try {
    // Find course by ID
    const courseToUpdate = await Course.findById(courseId).exec();

    // If course is not found, return 404
    if (!courseToUpdate) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Authorization check: Instructors can only update their own courses
    if (
      admin.role === "instructor" &&
      admin.id !== courseToUpdate.instructor.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this course",
      });
    }

    // Update course fields
    if (title) courseToUpdate.title = title.trim();
    if (description) courseToUpdate.description = description.trim();
    if (price !== undefined) courseToUpdate.price = parseFloat(price);

    // Save updated course
    const updatedCourse = await courseToUpdate.save();

    // Send response back with updated course data
    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: {
        id: updatedCourse._id,
        title: updatedCourse.title,
        description: updatedCourse.description,
        price: updatedCourse.price,
      },
    });
  } catch (error) {
    console.error("Error updating course:", error);
    next(error); // Pass error to global error handler
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

const getCourseContentForLearners=async (req,res,next)=>{
  const { userId } = req
  const {courseId} = req.params
  try {
    const course = await Course.findById(courseId).populate({path:"modules",select:"_id title description lessons",populate:{path:"lessons",select:"_id title"}}).exec()
    if(!Course){
      return res.status(404).json({success:false,message:"course not found"})
    }

    const isEnrolled= await Enrollment.find({learner:userId,course:courseId}).exec()
    if(!isEnrolled){
      return res.status(401).json({success:false,message:"only enrolled users can access the contents"})
    }
    res.status(200).json({success: true, message: "fetched course contents",data:course})
  } catch (error) {
    next(error)
  }
}

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
      .populate({ path: "instructor", select: "name bio profileImg _id" })
      .exec();
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "course not found" });
    }
    if (admin.role === "instructor" && admin.id !== course.instructor._id.toString()) {
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

//course content for admin and instructor access
const getCourseContentForAdminsAndInstructor = async (req, res, next) => {
  const { id: adminId, role } = req.admin; // Get adminId and role from the request object
  const { courseId } = req.params; // Get courseId from the URL parameters

  try {
    // Find the course by ID and populate modules and lessons
    const course = await Course.findById(courseId)
      .populate({
        path: "modules",
        select: "_id title description lessons",
        populate: {
          path: "lessons",
          select: "_id title",
        },
      })
      .exec();

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    if (role!=="admin"&&adminId!==course.instructor.toString) {
      return res.status(403).json({
        success: false,
        message: "Only the unauthorized access",
      });
    }
    res.status(200).json({
      success: true,
      message: "Fetched course contents",
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

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
    const { status="approved", page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Validate the status query parameter
    if (
      status &&
      status !== "unpublished" &&
      status !== "approved"
    ) {
      return res
        .status(400)
        .json({ success: false, message: "unexpected query param value" });
    }

    // Fetch courses and count total matching documents
    const [courses, totalResults] = await Promise.all([
      Course.find({status:status})
        .skip(skip)
        .limit(parseInt(limit))
        .populate({ path: "instructor", select: "name" })
        .exec(),
      Course.countDocuments({status:status}),
    ]);

    // Check if any courses were found
    if (courses.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "no courses to be found" });
    }

    // Calculate total pages
    const totalPages = Math.ceil(totalResults / limit);

    // Check if the requested page exceeds total pages
    if (page > totalPages) {
      return res
        .status(400)
        .json({ success: false, message: "page number is not valid" });
    }

    // Map the courses to the desired response format
    const mappedCourses = courses.map((course) => {
      return {
        title: course.title,
        instructor: course.instructor,
        id: course._id,
        thumbnail: course.thumbnail,
      };
    });

    // Send the response with pagination metadata
    res.status(200).json({
      success: true,
      message: "fetched courses",
      data: mappedCourses,
      totalPages: totalPages,
      totalResults: totalResults,
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
    const toBeReviewed = await Course.find({ status: "pending_review" }).populate({path:"instructor",select:"_id name"}).exec();
    if (toBeReviewed.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }
    const mappedCourses = toBeReviewed.map((course)=>{
      return {id:course._id,title:course.title,thumbnail:course.thumbnail,instructor:course.instructor}
    })
    res.status(200).json({
      success: true,
      message: "fetched courses to be reviewed",
      data: mappedCourses,
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

const deleteCourse = async (req, res) => {
  const { courseId } = req.params;
  const adminId = req.admin.id;
  const adminRole = req.admin.role;

  try {
    // Find the course by its ID
    const course = await Course.findById(courseId).populate("modules");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if the admin is authorized to delete the course
    if (adminRole === "admin" || (adminRole === "instructor" && course.instructor.toString() === adminId)) {
      // Delete related modules and lessons
      for (const moduleId of course.modules) {
        const module = await CourseModule.findById(moduleId).populate("lessons");

        // Delete lessons and video content from Cloudinary
        for (const lesson of module.lessons) {
          if (lesson.contentType === "video" && lesson.videoPublicId) {
            await cloudinaryInstance.uploader.destroy(lesson.videoPublicId); // Delete video from Cloudinary
          }
        }

        // Delete the module itself
        await CourseModule.findByIdAndDelete(moduleId);
      }

      // Delete thumbnail from Cloudinary
      if (course.thumbnailPublicId) {
        await cloudinaryInstance.uploader.destroy(course.thumbnailPublicId); // Delete thumbnail from Cloudinary
      }

      // Finally, delete the course
      await Course.findByIdAndDelete(courseId);

      return res.status(200).json({ message: "Course and related resources deleted successfully" });
    } else {
      return res.status(403).json({ message: "Unauthorized to delete this course" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting course" });
  }
};

module.exports = {
  createCourse,
  updateCourse,
  updateCourseImg,
  getCourseDetails,
  getAllCourses,
  getCourseDetailsForAdmins,
  getCourseContentForLearners,
  getPublishedCourses,
  reviewCourse,
  coursesToBeReviewed,
  addForReview,
  deleteCourse,
  getCourseContentForAdminsAndInstructor
};
