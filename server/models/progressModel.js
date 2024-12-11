const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.ObjectId, ref: "User", required: true },
    course: { type: mongoose.ObjectId, ref: "Course", required: true },
    modules: [
      {
        module: { type: mongoose.ObjectId, ref: "CourseModule", required: true },
        lessons: [
          {
            lesson: { type: mongoose.ObjectId, ref: "Lesson", required: true },
            completed: { type: Boolean, default: false }, // whether the user has completed this lesson
          },
        ],
        completed: { type: Boolean, default: false }, // whether the user has completed the module
      },
    ],
    completionPercentage: { type: Number, default: 0 }, // percentage of course completed
  },
  { timestamps: true }
);

const Progress = mongoose.model("Progress", progressSchema);

module.exports = { Progress };
