import express from "express";
const router = express.Router();
import { body } from "express-validator";
import * as userController from "../controllers/user.controller.js";

router.post(
  "/register",
  body("email").isEmail().withMessage("Email must be a valid email"),
  body("password")
    .isLength({ min: 3 })
    .withMessage("Password Should be atleast 3 characters Long"),
  userController.createUserController,
);

export default router;
