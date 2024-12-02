const {Lesson}=require("../models/lessonModel")
const {CourseModule}= require("../models/courseModuleModel")
const { Enrollment } = require("../models/enrollmentModel")

const createLesson=async(req,res,next)=>{
    const instructor=req.admin
    const {moduleId}= req.params
    const {title, contentType,textContent}=req.body
    const {file} = req

    if(!moduleId){
        return res.status(400).json({success:false,message:"module id missing from the request"})
    }
    if(!title||!contentType){
        return res.status(400).json({success:false,message:"title and contentType is required"})
    }

    if(contentType==="text"&&!textContent){
        return res.status(400).json({success:false,message:"Lesson content missing"})
    }
    if(contentType==="video"){
        if(!file||!file.path){
            return res.status(400).json({success:false,message:"Lesson content missing"})
        }
    }

    try {
        const moduleToAddLessonTo= await CourseModule.findById(moduleId).exec()
        if(!moduleToAddLessonTo){
            return res.status(404).json({success:false,message:"Module not found"})
        }
        if(instructor.id!==moduleToAddLessonTo.instructor.toString()){
            return res.status(401).json({success:false, message:"not authorized to add lesson to this module"})
        }
        const newLessson= new Lesson({
            title:title,
            instructor:instructor.id,
            module:moduleId,
            contentType:contentType,
            content:contentType==="text"?textContent:file.path,
            videoPublicId: contentType==="video"?file.name:null,
            course:moduleToAddLessonTo.course
        })
        await newLessson.save()
        moduleToAddLessonTo.lessons.push(newLessson._id)
        moduleToAddLessonTo.save()
        res.status(200).json({success:true,message:"lesson created successfully",data:newLessson})
        
    } catch (error) {
        next(error)
    }
}

const getLessonForLearners=async(req,res,next)=>{
    const {userId}=req
    const {lessonId}=req.params
    if(!lessonId){
        return res.status(400).json({success:false,message:"lesson id missing with request"})
    }
    try {
        const lesson= await Lesson.findById(lessonId).exec()
        if(!lesson){
            return res.status(404).json({success:false,message:"lesson not found"})
        }
        const userIsEnrolled=await Enrollment.exists({learner:userId,course:lesson.course})
        if(!userIsEnrolled){
            return res.status(401).json({success:false,message:"only enrolled users can access this lesson"})
        }
        res.status(200).json({success:true,message:"fetched lesson",data:lesson})
        
    } catch (error) {
        next(error)    
    }
}

module.exports = {createLesson,getLessonForLearners}