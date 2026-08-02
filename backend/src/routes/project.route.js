import express from "express";
const router = express.Router();
import { body } from "express-validator";
import { creatProjectController } from "../controllers/project.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";
import { wrapAsync } from "../middleware/wrapAsync.js";

router.post(
  "/create",
  isLoggedIn,
  body("name").isString().withMessage("Name Must be String"),
  wrapAsync(creatProjectController),
);

export default router;
