const { Lesson } = require("../models/lessonModel");
const { CourseModule } = require("../models/courseModuleModel");
const { Enrollment } = require("../models/enrollmentModel");
const {cloudinaryInstance} = require("../config/fileUpload")

const createLesson = async (req, res, next) => {
  const instructor = req.admin;
  const { moduleId } = req.params;
  const { title, contentType, textContent } = req.body;
  const { file } = req;

  if (!moduleId) {
    return res
      .status(400)
      .json({ success: false, message: "module id missing from the request" });
  }
  if (!title || !contentType) {
    return res
      .status(400)
      .json({ success: false, message: "title and contentType is required" });
  }

  if (contentType === "text" && !textContent) {
    return res
      .status(400)
      .json({ success: false, message: "Lesson content missing" });
  }
  if (contentType === "video") {
    if (!file || !file.path) {
      return res
        .status(400)
        .json({ success: false, message: "Lesson content missing" });
    }
  }

  try {
    const moduleToAddLessonTo = await CourseModule.findById(moduleId).exec();
    if (!moduleToAddLessonTo) {
      return res
        .status(404)
        .json({ success: false, message: "Module not found" });
    }
    if (instructor.id !== moduleToAddLessonTo.instructor.toString()) {
      return res
        .status(401)
        .json({
          success: false,
          message: "not authorized to add lesson to this module",
        });
    }
    const newLessson = new Lesson({
      title: title,
      instructor: instructor.id,
      module: moduleId,
      contentType: contentType,
      content: contentType === "text" ? textContent : file.path,
      videoPublicId: contentType === "video" ? file.name : null,
      course: moduleToAddLessonTo.course,
    });
    await newLessson.save();
    moduleToAddLessonTo.lessons.push(newLessson._id);
    moduleToAddLessonTo.save();
    res
      .status(200)
      .json({
        success: true,
        message: "lesson created successfully",
        data: newLessson,
      });
  } catch (error) {
    next(error);
  }
};
const updateLesson = async (req, res, next) => {
  const {id,role} = req.admin;
  const { lessonId } = req.params;
  const { title, contentType, textContent } = req.body;
  const { file } = req;

  if (!lessonId) {
    return res
      .status(400)
      .json({ success: false, message: "lesson id missing from the request" });
  }
  if (!title || !contentType) {
    return res
      .status(400)
      .json({ success: false, message: "title and contentType is required" });
  }

  if (contentType === "text" && !textContent) {
    return res
      .status(400)
      .json({ success: false, message: "Lesson content missing" });
  }
  if (contentType === "video") {
    if (!file || !file.path) {
      return res
        .status(400)
        .json({ success: false, message: "Lesson content missing" });
    }
  }

  try {
    const lessonToUpdate = await Lesson.findById(lessonId).exec();
    if (!lessonToUpdate) {
      return res
        .status(404)
        .json({ success: false, message: "Lesson not found" });
    }
    if (role!=="admin"&& id !== lessonToUpdate.instructor.toString()) {
      return res
        .status(401)
        .json({
          success: false,
          message: "not authorized to add lesson to this module",
        });
    }

    if(lessonToUpdate.contentType === "video" &&
      (contentType === "text" || (contentType === "video" && file?.path))){
      await cloudinaryInstance.uploader.destroy({public_id:lessonToUpdate.videoPublicId})
    }

    lessonToUpdate.title=title
    lessonToUpdate.contentType=contentType
    lessonToUpdate.content=contentType==="text"?textContent:file.path
    lessonToUpdate.videoPublicId=contentType==="text"?null:file.name

    await lessonToUpdate.save();
    res
      .status(200)
      .json({
        success: true,
        message: "lesson updated successfully",
        data: lessonToUpdate,
      });
  } catch (error) {
    next(error);
  }
};

const getLessonForLearners = async (req, res, next) => {
  const { userId } = req;
  const { lessonId } = req.params;
  if (!lessonId) {
    return res
      .status(400)
      .json({ success: false, message: "lesson id missing with request" });
  }
  try {
    const lesson = await Lesson.findById(lessonId).exec();
    if (!lesson) {
      return res
        .status(404)
        .json({ success: false, message: "lesson not found" });
    }
    const userIsEnrolled = await Enrollment.exists({
      learner: userId,
      course: lesson.course,
    });
    if (!userIsEnrolled) {
      return res
        .status(401)
        .json({
          success: false,
          message: "only enrolled users can access this lesson",
        });
    }
    res
      .status(200)
      .json({ success: true, message: "fetched lesson", data: lesson });
  } catch (error) {
    next(error);
  }
};

const getLessonForAdminAndInstructor = async (req, res, next) => {
    const { role, id } = req.admin;
    const { lessonId } = req.params;
  
    if (!lessonId) {
      return res
        .status(400)
        .json({ success: false, message: "lesson id missing with request" });
    }
  
    try {
      const lesson = await Lesson.findById(lessonId).exec();
      if (!lesson) {
        return res
          .status(404)
          .json({ success: false, message: "lesson not found" });
      }
  
      // Grant access if the user is an admin
      if (role === "admin") {
        return res
          .status(200)
          .json({ success: true, message: "fetched lesson", data: lesson });
      }
  
      // Grant access if the user is the instructor of this lesson
      if (role === "instructor" && lesson.instructor.toString() === id) {
        return res
          .status(200)
          .json({ success: true, message: "fetched lesson", data: lesson });
      }
  
      // User is neither an admin nor the instructor
      return res
        .status(403)
        .json({ success: false, message: "access denied" });
    } catch (error) {
      next(error);
    }
  };
  

const deleteLesson = async (req, res) => {
  const { lessonId } = req.params;
  const adminId = req.admin.id;
  const adminRole = req.admin.role;

  try {
    // Find the lesson by its ID
    const lesson = await Lesson.findById(lessonId).exec();

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    if(adminRole!=="admin"&&adminId!==lesson.instructor.toString()){
      return res.status(401).json({success:false,message:"you are not authorized to delete this Lesson"})
    }
    if(lesson.contentType==="video"){
      await cloudinaryInstance.uploader.destroy({public_id:lesson.videoPublicId});
    }
      await Lesson.findByIdAndDelete(lessonId);
      return res
        .status(200)
        .json({ message: "Lesson deleted successfully" });
  
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting lesson" });
  }
};

module.exports = { createLesson, getLessonForLearners,getLessonForAdminAndInstructor, updateLesson, deleteLesson };
