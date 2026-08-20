import ExpressError from "../Error/ExpressError.js";
import { validationResult } from "express-validator";
import creatProjectService from "../services/project.service.js";

export const creatProjectController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ExpressError(500, errors.array());
  }

  const { name } = req.body;

  const userId = req.user._id;

  const newProject = await creatProjectService(name, userId);
  await newProject.save();
  res.status(201).json({ newProject });
};

export const getAllProjectController = async (req, res) => {
  console.log("All Projects");
  res.send("working");
  res.status(201).json({ success: true, message: "Working" });
};
