import ExpressError from "../Error/ExpressError.js";
import { validationResult } from "express-validator";
import creatProjectService from "../services/project.service.js";

export const creatProjectController = async (req, res) => {
  console.log("im here");

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ExpressError(500, errors.array());
  }
  console.log("im here2");

  const { name } = req.body;
  console.log(name);

  const userId = req.user._id;
  console.log(userId);

  const newProject = await creatProjectService(name, userId);
  console.log(newProject);

  await newProject.save();

  res.status(201).json({ newProject });
};
