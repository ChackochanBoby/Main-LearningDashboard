const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: {
      type: String,
      default:
        "Passionate educator dedicated to fostering learning and growth.",
    },
    role: { type: String, default: "instructor" },
    profileImg: { type: String },
    profileImgPublicId: { type: String },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = { Admin };
