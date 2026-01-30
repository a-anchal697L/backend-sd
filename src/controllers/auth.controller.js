const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const AppError = require("../utils/appError.js");


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};


exports.register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new AppError(errors.array()[0].msg, 400));
    }

    const { name, email, password, role = "founder" } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(new AppError("Email already exists", 400));
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        createdAt:user.createdAt,
        token: generateToken(user._id),
      },
    });
  } catch (err) {
    next(err);
  }
};


exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new AppError(errors.array()[0].msg, 400));
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return next(new AppError("Invalid credentials", 401));
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next(new AppError("Invalid credentials", 401));
    }

    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt:user.createdAt,
        isVerified: user.isVerified,
        token: generateToken(user._id),
      },
    });
  } catch (err) {
    next(err);
  }
};


exports.verifyUser = async (req, res, next) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return next(new AppError("User ID is required", 400));
    }
    const user = await User.findById(userId);
    console.log(user)
    if (!user) {
      return next(new AppError("User not found", 404));
    }
    if (user.isVerified) {
      return res.status(200).json({
        success: true,
        message: "User already verified",
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          isVerified: true,
        },
      });
    }

    user.isVerified = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: "User verified successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
      },
    });
  } catch (err) {
    next(err);
  }
};


exports.logout = async (req, res, next) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0), 
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    next(err);
  }
};