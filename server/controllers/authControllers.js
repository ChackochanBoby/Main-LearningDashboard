const bcrypt = require("bcrypt");
const { User } = require("../models/userModel");
const { Admin } = require("../models/adminModel");
const { generateUserToken, generateAdminToken } = require("../utils/jwt");
const { transporter } = require("../config/nodeMailer");
const jwt = require("jsonwebtoken");


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
      profileImg:newUser.profileImg
    });
    res.cookie("tokenUser", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: process.env.ENVIRONMENT==="PRODUCTION"?true:false,
      secure: process.env.ENVIRONMENT==="PRODUCTION"?true:false,
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
      profileImg:userExists.profileImg
    });

    res.cookie("tokenUser", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: process.env.ENVIRONMENT==="PRODUCTION"?true:false,
      secure: process.env.ENVIRONMENT==="PRODUCTION"?true:false,
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
      httpOnly: process.env.ENVIRONMENT==="PRODUCTION"?true:false,
      secure: process.env.ENVIRONMENT==="PRODUCTION"?true:false,
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

//user email update request
const updateUserEmail = async (req, res, next) => {
  const { userId } = req;
  const { password, newEmail } = req.body;
  if (!userId) {
    return res.status(401).json({ success: false, message: "missing userId" });
  }
  if (!emailRegex.test(newEmail)) {
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
    const userExists = await User.findById(userId).exec();

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
    const verificationToken = await generateUserToken({id:userExists.id, newEmail:newEmail},"120s")
    const mailOptions = {
      from: 'learn.mindspring@gmail.com',
      to: newEmail,
      subject: "Email verification",
      text: "Verification",
      html: `<div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
  
    <h1 style="color: #333; font-size: 24px; text-align: center;">Email Change Verification</h1>
  
    <p style="font-size: 16px; line-height: 1.6; color: #555;">Hello ${userExists.name},</p>
  
    <p style="font-size: 16px; line-height: 1.6; color: #555;">We received a request to change the email address associated with your account. If you did not make this request, please ignore this message.</p>
  
    <p style="font-size: 16px; line-height: 1.6; color: #555;">To confirm your new email address, please click the button below:</p>
  
  <a href="${process.env.BACKEND_BASE_URL}/auth/user/email-verify?token=${verificationToken}" style="display: inline-block; padding: 12px 24px; margin-top: 20px; background-color: #28a745; color: #ffffff; text-decoration: none; border-radius: 5px; text-align: center;">Confirm Email Change</a>
  
  <p style="font-size: 16px; line-height: 1.6; color: #555;">If you have any questions, feel free to contact our support team.</p>
  <p style="font-size: 16px; line-height: 1.6; color: #555;">Thank you,</p>
  <p style="font-size: 16px; line-height: 1.6; color: #555;">Your Project Team</p>

  <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #888;">
    <p>Don't recognize this email? You can ignore it. If you have any concerns, please contact support.</p>
  </div>

</div>`,
    };
    await transporter.sendMail(mailOptions)
    res.status(200).json({success:true,message:"verification email sent"})
  } catch (error) {
    next(error)
  }
};

//user email change after verification
const verifyEmailChange = async (req, res, next) => {
  const { token } = req.query
  try {
    const decoded = await jwt.verify(token, process.env.TOKEN_SECRET_USER)
    const user = await User.findByIdAndUpdate( decoded.id,{email:decoded.newEmail}).exec()
    if (!user) {
      return res.status(404).json({success:false,message:"user not found"})
    }
    res.status(200).json({success:true,message:"email changed"})
  } catch (error) {
    next(error)
  }
}

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
      profileImg:newAdmin.profileImg
    });
    res.cookie("tokenAdmin", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: process.env.ENVIRONMENT==="PRODUCTION"?true:false,
      secure: process.env.ENVIRONMENT==="PRODUCTION"?true:false,
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
      profileImg:adminExists.profileImg
    });

    res.cookie("tokenAdmin", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: process.env.ENVIRONMENT==="PRODUCTION"?true:false,
      secure: process.env.ENVIRONMENT==="PRODUCTION"?true:false,
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
      httpOnly: process.env.ENVIRONMENT==="PRODUCTION"?true:false,
      secure: process.env.ENVIRONMENT==="PRODUCTION"?true:false,
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

//Admin email update request
const updateAdminEmail = async (req, res, next) => {
  const { admin } = req;
  const { password, newEmail } = req.body;
  if (!admin.id) {
    return res.status(401).json({ success: false, message: "missing admin Id" });
  }
  if (!emailRegex.test(newEmail)) {
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
    const adminExists = await Admin.findById(admin.id).exec();

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
    const verificationToken = await generateAdminToken({id:adminExists.id, newEmail:newEmail},"120s")
    const mailOptions = {
      from: 'learn.mindspring@gmail.com',
      to: newEmail,
      subject: "Email verification",
      text: "Verification",
      html: `<div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
  
    <h1 style="color: #333; font-size: 24px; text-align: center;">Email Change Verification</h1>
  
    <p style="font-size: 16px; line-height: 1.6; color: #555;">Hello ${adminExists.name},</p>
  
    <p style="font-size: 16px; line-height: 1.6; color: #555;">We received a request to change the email address associated with your account. If you did not make this request, please ignore this message.</p>
  
    <p style="font-size: 16px; line-height: 1.6; color: #555;">To confirm your new email address, please click the button below:</p>
  
  <a href="${process.env.BACKEND_BASE_URL}/auth/admin/email-verify?token=${verificationToken}" style="display: inline-block; padding: 12px 24px; margin-top: 20px; background-color: #28a745; color: #ffffff; text-decoration: none; border-radius: 5px; text-align: center;">Confirm Email Change</a>
  
  <p style="font-size: 16px; line-height: 1.6; color: #555;">If you have any questions, feel free to contact our support team.</p>
  <p style="font-size: 16px; line-height: 1.6; color: #555;">Thank you,</p>
  <p style="font-size: 16px; line-height: 1.6; color: #555;">Your Project Team</p>

  <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #888;">
    <p>Don't recognize this email? You can ignore it. If you have any concerns, please contact support.</p>
  </div>

</div>`,
    };
    await transporter.sendMail(mailOptions)
    res.status(200).json({success:true,message:"verification email sent"})
  } catch (error) {
    next(error)
  }
};

//Admin email change after verification
const verifyAdminEmailChange = async (req, res, next) => {
  const { token } = req.query
  try {
    const decoded = await jwt.verify(token, process.env.TOKEN_SECRET_ADMIN)
    const admin = await Admin.findByIdAndUpdate( decoded.id,{email:decoded.newEmail}).exec()
    if (!admin) {
      return res.status(404).json({success:false,message:"admin not found"})
    }
    res.status(200).json({success:true,message:"email changed"})
  } catch (error) {
    next(error)
  }
}

module.exports = {
  userSignup,
  userLogin,
  userLogout,
  updateUserEmail,
  verifyEmailChange,
  adminSignup,
  adminLogin,
  adminLogout,
  updateAdminEmail,
  verifyAdminEmailChange,
};
