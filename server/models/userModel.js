const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      match: [/^[a-zA-Z\s]+$/, "{VALUE} is not a valid name"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "{VALUE} is not a valid email address",
      ],
    },
    password: { type: String, required: true },
    profileImg: { type: String },
    profileImgPublicId: { type: String },
    bio: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
