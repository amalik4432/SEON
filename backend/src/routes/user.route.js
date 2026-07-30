import express from "express";
const router = express.Router();
import { body } from "express-validator";
import * as userController from "../controllers/user.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";
import { wrapAsync } from "../middleware/wrapAsync.js";

router.post(
  "/register",
  body("email").isEmail().withMessage("Email must be a valid email"),
  body("password")
    .isLength({ min: 3 })
    .withMessage("Password Should be atleast 3 characters Long"),
  wrapAsync(userController.createUserController),
);

router.post(
  "/login",
  body("email").isEmail().withMessage("Email must be a valid email"),
  body("password")
    .isLength({ min: 3 })
    .withMessage("Password Should be atleast 3 characters Long"),
  wrapAsync(userController.loginUserController),
);

router.get("/profile", isLoggedIn, userController.userProfileController);

router.post(
  "/logout",
  isLoggedIn,
  wrapAsync(userController.logoutUserController),
);

router.get("/me", isLoggedIn, userController.getCurrentUserController);

export default router;
