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
    profileImg: { type: String,default:"https://th.bing.com/th?id=OIP.ggX8e6U3YzyhPvp8qGZtQwHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" },
    profileImgPublicId: { type: String },
    bio: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
