import userModel from "../models/user.model.js";
import { createUserService } from "../services/users.service.js";
import { validationResult } from "express-validator";

export const createUserController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error(404, "Email and Password required");
  }
  let user = await createUserService(email, password);
  await user.save();
  const token = await user.createToken();
  res.status(201).json({ success: true, user, token });
};
