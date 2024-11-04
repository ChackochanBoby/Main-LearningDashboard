const bcrypt = require("bcrypt");
const { User } = require("../models/userModel");
const { Admin } = require("../models/adminModel");
const { generateUserToken, generateAdminToken } = require("../utils/jwt");


const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const saltRounds = 10;

//User signup
const userSignup = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ success: false, message: "Passwords do not match" });
  }


  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      success: false,
      message:
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    });
  }

  try {
    const userExists = await User.findOne({ email }).exec();
    if (userExists) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }

    const hash = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ name, email, password: hash });
    await newUser.save();
    const token = await generateUserToken({
      id: newUser._id,
      name: newUser.name,
    });
    res.cookie("tokenUser", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: false,
      secure: false,
    });
    res.status(201).json({
      success: true,
      message: "User successfully created",
    });
  } catch (error) {
    console.error(error,error.message);
  }
};

//Admin

//admin signup (role defaults to instructor)
const adminSignup = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ success: false, message: "Passwords do not match" });
  }


  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      success: false,
      message:
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    });
  }

  try {
    const adminExists = await Admin.findOne({ email }).exec();
    if (adminExists) {
      return res.status(409).json({
        success: false,
        message: `${adminExists.role} already exists`,
      });
    }

    const hash = await bcrypt.hash(password, saltRounds);

    const newAdmin = new Admin({ name, email, password: hash });
    await newAdmin.save();
    const token = await generateAdminToken({
      id: newAdmin._id,
      name: newAdmin.name,
      role: newAdmin.role,
    });
    res.cookie("tokenAdmin", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: false,
      secure: false,
    });
    res.status(201).json({
      success: true,
      message: "instructor/admin successfully created",
    });
  } catch (error) {
    console.error(error,error.message);
  }
};

module.exports = { userSignup, adminSignup };
