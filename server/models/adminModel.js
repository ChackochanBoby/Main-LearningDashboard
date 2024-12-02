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
    profileImg: { type: String,default:"https://th.bing.com/th?id=OIP.ggX8e6U3YzyhPvp8qGZtQwHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" },
    profileImgPublicId: { type: String },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = { Admin };
