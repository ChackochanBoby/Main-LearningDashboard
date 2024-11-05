const bcrypt = require("bcrypt");
const { User } = require("../models/userModel");
const { Admin } = require("../models/adminModel");
const { generateUserToken, generateAdminToken } = require("../utils/jwt");

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const saltRounds = 10;

/* USER related auth controllers */

// User signup
const userSignup = async (req, res, next) => {
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
    next(error);
  }
};

// User Login
const userLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: `missing ${!email ? "email" : "password"} field.`,
    });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Enter a valid email",
    });
  }

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      success: false,
      message:
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    });
  }

  try {
    const userExists = await User.findOne({ email: email }).exec();

    if (!userExists) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist" });
    }

    const passwordMatch = await bcrypt.compare(password, userExists.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Password is incorrect" });
    }

    const token = await generateUserToken({
      id: userExists._id,
      name: userExists.name,
    });

    res.cookie("tokenUser", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: false,
      secure: false,
    });

    res.status(200).json({
      success: true,
      message: "User login successfull",
    });
  } catch (error) {
    next(error);
  }
};

// User logout
const userLogout = async (req, res, next) => {
  try {
    res.clearCookie("tokenUser", {
      httpOnly: false,
      secure: false,
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

/* ADMIN related auth controllers */

// Admin signup (role defaults to instructor)
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
    next(error);
  }
};

// Admin login
const adminLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: `missing ${!email ? "email" : "password"} field.`,
    });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Enter a valid email",
    });
  }

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      success: false,
      message:
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    });
  }

  try {
    const adminExists = await Admin.findOne({ email: email }).exec();

    if (!adminExists) {
      return res
        .status(404)
        .json({ success: false, message: "Admin does not exist" });
    }

    const passwordMatch = await bcrypt.compare(password, adminExists.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Password is incorrect" });
    }

    const token = await generateAdminToken({
      id: adminExists._id,
      name: adminExists.name,
      role: adminExists.role,
    });

    res.cookie("tokenAdmin", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: false,
      secure: false,
    });

    res.status(200).json({
      success: true,
      message: "login successfull",
    });
  } catch (error) {
    next(error);
  }
};

// Admin logout
const adminLogout = async (req, res, next) => {
  try {
    res.clearCookie("tokenAdmin", {
      httpOnly: false,
      secure: false,
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userSignup,
  userLogin,
  userLogout,
  adminSignup,
  adminLogin,
  adminLogout,
};
