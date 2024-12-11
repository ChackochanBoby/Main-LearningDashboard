const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    instructor: { type: mongoose.ObjectId, ref: "Admin", required: true },
    description: { type: String },
    modules: [{ type: mongoose.ObjectId, ref: "CourseModule", default: [] }],
    price: { type: Number, default: 50, required: true },
    status: { type: String, enum: ["draft", "pending_review", "approved", "unpublished"], default: "draft" },
    feedback:{type:String},
    thumbnail: { type: String,default:"https://asset.cloudinary.com/dxoawvjqt/ea46b237f744a27169a796388aaa5155"},
    thumbnailPublicId:{type:String},
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = { Course };
