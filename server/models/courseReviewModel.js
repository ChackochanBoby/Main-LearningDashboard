const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    bio: { type: String,
      default: "Eager to learn and grow, focused on building skills and knowledge.",
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports={ User }
