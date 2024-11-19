const { Course } = require("../models/courseModel")
const { CourseModule } = require("../models/courseModuleModel")
const {Enrollment}=require("../models/enrollmentModel")
const createModule = async (req, res, next) => {
    const { admin } = req
    const { courseId } = req.params
    const {title,description}=req.body
    if (!admin || admin.role === "admin") {
        return res.status(401).json({success:false,message:"unauthorized access"})
    }
    if (!courseId) {
        return res.status(400).json({success:false,message:"course id is missing"})
    }
    if (!title) {
        return res.status(400).json({success:false,message:"Title is required"})
    }
    try {
        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(404).json({success:false,message:"course not found"})
        }
        if (admin.id !== course.instructor.toString()) {
            return res.status(401).json({success:false,message:"you are not authorized to create a module in this course"})
        }
        const newModule = new CourseModule({ title: title, description: description, course: courseId, instructor: admin.id })
        await newModule.save()
        course.modules.push(newModule._id)
        await course.save()
        res.status(200).json({success:true,message:"module created",data:newModule})
    } catch (error) {
        next(error)
    }
}

const updateModule = async (req, res, next) => {
    const { admin } = req;
    const { moduleId } = req.params;
    const { title, description} = req.body;
    if (!moduleId) {
      return res
        .status(400)
        .json({ success: false, message: "module id missing" });
    }
    if (!title && !description) {
      return res
        .status(400)
        .json({ success: false, message: "no fields to update" });
    }
  
    if (title && typeof title !== "string") {
      return res
        .status(400)
        .json({ success: false, message: "Title must be a string" });
    }
    try {
      const moduleToUpdate = await CourseModule.findById(moduleId).exec();
  
      if (!moduleToUpdate) {
        return res
          .status(404)
          .json({ success: false, message: "Module not found" });
      }
  
      if (
        admin.role === "instructor" &&
        admin.id !== moduleToUpdate.instructor.toString()
      ) {
        return res.status(401).json({
          success: false,
          message: "not authorized to update this course",
        });
      }
      moduleToUpdate.title = title ?? moduleToUpdate.title;
      moduleToUpdate.description = description ?? moduleToUpdate.description;
      await moduleToUpdate.save();
      res
        .status(200)
        .json({ success: true, message: "module updated", data: moduleToUpdate });
    } catch (error) {
      next(error);
    }
};
  
const getModuleForEnrolledUsers = async (req, res, next) => {
    const { moduleId } = req.params
    const { userId } = req
    if (!moduleId) {
        return res.status(400).json({success: false , message:"missing module id "})
    }
    if (!userId) {
        return res.status(400).json({success:false , message:"missing user id "})
    }
    try {
        const module = await CourseModule.findById(moduleId).populate({path:"lessons",select:"title _id"}).exec()
        if (!module) {
            return res.status(404).json({success:false,message:"module not found"})
        }
        const isEnrolled = await Enrollment.find({ course: module.course, learner: userId }).exec()
        if (!isEnrolled) {
            return res.status(401).json({success:false,message:"user not enrolled"})
        }
        res.status(200).json({success:true,message:"fetched module",data:module})
        
    } catch (error) {
        next()
    }
}

module.exports={createModule,updateModule,getModuleForEnrolledUsers}