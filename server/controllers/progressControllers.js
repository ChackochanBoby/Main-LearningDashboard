const { Enrollment } = require("../models/enrollmentModel");
const {Progress}=require("../models/progressModel")

const updateProgress = async (req, res , next) => {
    const {userId}=req
    const { courseId, moduleId, lessonId } = req.params;
  
    
    try {
        const isEnrolled=!!await Enrollment.exists({learner:userId,course:courseId})

        if(!isEnrolled){
            return res.status(401).json({success:false,message:"only enrolled users can have progress"})
        }
      // Try to find the user's progress for the specific course
      let progress = await Progress.findOne({ user: req.user.id, course: courseId });
  
      // If no progress found, create a new progress record
      if (!progress) {
        // Fetch course modules and lessons
        const course = await Course.findById(courseId).populate({
          path: 'modules',
          populate: {
            path: 'lessons',
          },
        });
  
        // Initialize progress with all the modules and lessons for the course
        progress = new Progress({
          user: req.user.id,
          course: courseId,
          modules: course.modules.map((module) => ({
            module: module._id,
            lessons: module.lessons.map((lesson) => ({
              lesson: lesson._id,
              completed: false,
            })),
            completed: false,
          })),
          completionPercentage: 0,
        });
      }
  
      // Check for new modules or lessons in the course that are not in the user's progress
      const course = await Course.findById(courseId).populate({
        path: 'modules',
        populate: {
          path: 'lessons',
        },
      });
  
      // Check for new modules
      course.modules.forEach((courseModule) => {
        const existingModule = progress.modules.find((module) => module.module.toString() === courseModule._id.toString());
  
        // If the module is not in progress, add it
        if (!existingModule) {
          progress.modules.push({
            module: courseModule._id,
            lessons: courseModule.lessons.map((lesson) => ({
              lesson: lesson._id,
              completed: false,
            })),
            completed: false,
          });
        }
  
        // Check for new lessons in the module
        courseModule.lessons.forEach((courseLesson) => {
          const existingLesson = existingModule.lessons.find((lesson) => lesson.lesson.toString() === courseLesson._id.toString());
  
          // If the lesson is not in progress, add it
          if (!existingLesson) {
            existingModule.lessons.push({
              lesson: courseLesson._id,
              completed: false,
            });
          }
        });
      });
  
      // Find the module and lesson in the user's progress
      const module = progress.modules.find((module) => module.module.toString() === moduleId);
      const lesson = module.lessons.find((lesson) => lesson.lesson.toString() === lessonId);
  
      if (!lesson) {
        return res.status(404).json({ message: "Lesson not found" });
      }
  
      // Mark the lesson as completed
      lesson.completed = true;
  
      // Check if the entire module is completed
      const allLessonsCompleted = module.lessons.every((lesson) => lesson.completed);
      if (allLessonsCompleted) {
        module.completed = true;
      }
  
      // Calculate the overall course completion percentage
      const completedModules = progress.modules.filter((module) => module.completed).length;
      progress.completionPercentage = (completedModules / progress.modules.length) * 100;
  
      // Save the progress
      await progress.save();
      console.log(progress)
      res.status(200).json(progress);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports={updateProgress}