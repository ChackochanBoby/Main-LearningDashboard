const { Enrollment } = require("../models/enrollmentModel");
const {Progress}=require("../models/progressModel")
const {Course}=require("../models/courseModel")
const {CourseModule}=require("../models/courseModuleModel")
const {Lesson}=require("../models/lessonModel")

const updateProgress = async (req, res, next) => {
  const { userId } = req;
  const { courseId, moduleId, lessonId } = req.params;

  try {
    // Ensure the user is enrolled in the course
    const isEnrolled = !!await Enrollment.exists({ learner: userId, course: courseId });
    if (!isEnrolled) {
      return res.status(401).json({ success: false, message: "only enrolled users can have progress" });
    }

    // Find the user's progress for this course
    let progress = await Progress.findOne({ user: userId, course: courseId });

    if (!progress) {
      // Fetch course data (modules and lessons) if no progress record exists
      const course = await Course.findById(courseId).populate({
        path: 'modules',
        populate: { path: 'lessons' }
      });

      // Initialize the progress object
      progress = new Progress({
        user: userId,
        course: courseId,
        modules: course.modules.map(module => ({
          module: module._id,
          lessons: module.lessons.map(lesson => ({
            lesson: lesson._id,
            completed: false
          })),
          completed: false
        })),
        completionPercentage: 0
      });
    }

    // Fetch the updated course data
    const course = await Course.findById(courseId).populate({
      path: 'modules',
      populate: { path: 'lessons' }
    });

    // Check and update progress if there are new modules or lessons
    course.modules.forEach(courseModule => {
      const existingModule = progress.modules.find(module => module.module.toString() === courseModule._id.toString());

      if (!existingModule) {
        progress.modules.push({
          module: courseModule._id,
          lessons: courseModule.lessons.map(lesson => ({
            lesson: lesson._id,
            completed: false
          })),
          completed: false
        });
      }

      // Check for new lessons in the module and add them to progress
      courseModule.lessons.forEach(courseLesson => {
        const existingLesson = existingModule.lessons.find(lesson => lesson.lesson.toString() === courseLesson._id.toString());
        if (!existingLesson) {
          existingModule.lessons.push({
            lesson: courseLesson._id,
            completed: false
          });
        }
      });
    });

    // Find the specific module and lesson that the user is updating
    const module = progress.modules.find(module => module.module.toString() === moduleId);
    const lesson = module.lessons.find(lesson => lesson.lesson.toString() === lessonId);

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    // Mark the lesson as completed
    lesson.completed = true;

    // Check if the entire course is complete based on lessons
    const totalLessonsInCourse = progress.modules.reduce((total, module) => total + module.lessons.length, 0);
    const completedLessonsInCourse = progress.modules.reduce((total, module) => 
      total + module.lessons.filter(lesson => lesson.completed).length, 0
    );

    // Calculate the overall course completion percentage
    progress.completionPercentage = (completedLessonsInCourse / totalLessonsInCourse) * 100;

    // Save the updated progress
    await progress.save();
    res.status(200).json(progress);

  } catch (error) {
    next(error);
  }
};

  
const checkLessonCompletion = async (req, res, next) => {
  const { userId } = req;
  const { courseId, lessonId } = req.params;  // Removed moduleId from params

  try {
    // Check if the user is enrolled in the course
    const isEnrolled = !!await Enrollment.exists({ learner: userId, course: courseId });

    if (!isEnrolled) {
      return res.status(401).json({ success: false, message: "Only enrolled users can have progress" });
    }

    // Find the user's progress for the specific course
    const progress = await Progress.findOne({ user: userId, course: courseId });

    if (!progress) {
      return res.status(404).json({ success: false, message: "Progress not found for this course" });
    }

    // Find the lesson across all modules
    let lessonFound = null;
    for (const module of progress.modules) {
      lessonFound = module.lessons.find(lesson => lesson.lesson.toString() === lessonId);
      if (lessonFound) break;  // Exit loop once the lesson is found
    }

    if (!lessonFound) {
      return res.status(404).json({ success: false, message: "Lesson not found" });
    }

    // Check the completion status of the lesson (default to 'not completed' if undefined)
    const lessonStatus = lessonFound.completed ? "completed" : "not completed";

    // Respond with the lesson completion status
    res.status(200).json({
      success: true,
      message: `The lesson is ${lessonStatus}`,
      data: lessonFound.completed
    });
  } catch (error) {
    console.error("Error checking lesson completion:", error);  // Log the error for debugging
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
  
const getCourseCompletionPercentage = async (req, res, next) => {
  const { userId } = req;
  const { courseId } = req.params;

  try {
    // Check if the user is enrolled in the course
    const isEnrolled = !!await Enrollment.exists({ learner: userId, course: courseId });

    if (!isEnrolled) {
      return res.status(401).json({ success: false, message: "Only enrolled users can have progress" });
    }

    // Find the user's progress for the course
    const progress = await Progress.findOne({ user: userId, course: courseId });

    if (!progress) {
      return res.status(404).json({ success: false, message: "Progress not found for this course" });
    }

    // Fetch the completion percentage from the progress model
    const { completionPercentage } = progress;

    // Return the completion percentage
    res.status(200).json({
      success: true,
      message: "Course completion percentage",
      data: completionPercentage 
    });
  } catch (error) {
    next(error)
  }
};


  module.exports={updateProgress,checkLessonCompletion,getCourseCompletionPercentage}