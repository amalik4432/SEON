import userModel from "../models/user.model.js";
import { createUserService } from "../services/users.service.js";
import { validationResult } from "express-validator";

export const createUserController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error(404, "Email and Password required");
    }
    let user = await createUserService(email, password);
    await user.save();
    const token = await user.createToken();
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Some error occured" });
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({ success: true, user, token });
  } catch (err) {
    res.status(401).json({ success: false, error: err });
  }
};

export const loginUserController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let { email, password } = req.body;

    let user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid Credentials" });
    }

    let isPassMatched = await user.comparePassword(password);

    if (!isPassMatched) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credintials" });
    }

    const token = await user.createToken(email);

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Some error occured" });
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({ user, token });
  } catch (err) {
    console.log(err);

    res.status(401).json({ success: false, error: err });
  }
};

export const userProfileController = (req, res) => {
  res.json({ message: "Working after Logged in", user: req.user });
};
