import userModel from "../models/user.model.js";
import { createUserService } from "../services/users.service.js";
import { validationResult } from "express-validator";
import redisClient from "../services/redis.service.js";
import ExpressError from "../Error/ExpressError.js";

export const createUserController = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new ExpressError(400, errors.array()));
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ExpressError(400, "Email and Password required"));
  }

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return next(new ExpressError(409, "User already exists"));
    }

    const user = await createUserService(email, password);

    await user.save();

    const token = await user.createToken();

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        success: true,
        message: "Account created successfully",
        user: {
          id: user._id,
          email: user.email,
        },
      });
  } catch (error) {
    if (error.code === 11000) {
      return next(new ExpressError(409, "Email already registered"));
    }

    next(error);
  }
};

export const loginUserController = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new ExpressError(400, errors.array()));
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ExpressError(400, "Email and Password required"));
  }

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return next(new ExpressError(401, "Invalid credentials"));
  }

  const isPassMatched = await user.comparePassword(password);

  if (!isPassMatched) {
    return next(new ExpressError(401, "Invalid credentials"));
  }

  const token = await user.createToken();

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
      },
    });
};

export const userProfileController = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Working after Logged in",
    user: req.user,
  });
};

export const logoutUserController = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return next(new ExpressError(401, "User already logged out"));
    }

    await redisClient.set(token, "logout", "EX", 60 * 60 * 24);

    res.clearCookie("token").status(200).json({
      success: true,
      message: "Logout Successfully",
    });
  } catch (error) {
    next(error);
  }
};
