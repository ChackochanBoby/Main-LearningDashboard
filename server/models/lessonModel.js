const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    instructor:{type:mongoose.ObjectId,ref:"Admin",required:true},
    course:{type: mongoose.ObjectId, ref:"Course",required:true},
    module: { type: mongoose.ObjectId, ref: "CourseModule", required: true },
    description: { type: String },
    contentType: { type: String, enum: ["video", "text"], default: "text" },
    content: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

const Lesson = mongoose.model("Lesson", lessonSchema);

module.exports = { Lesson };
