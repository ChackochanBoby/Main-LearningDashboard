const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    instructor: { type: mongoose.ObjectId, ref: "Admin", required: true },
    description: { type: String },
    modules: [{ type: mongoose.ObjectId, ref: "CourseModule", default: [] }],
    price: { type: Number, default: 0, required: true },
    status: { type: String, enum: ["draft", "pending_review", "approved", "unpublished"], default: "draft" },
    feedback:{type:String},
    thumbnail: { type: String },
    thumbnailPublicId:{type:String},
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = { Course };
