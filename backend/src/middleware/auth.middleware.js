import jwt from "jsonwebtoken";
import redisClient from "../services/redis.service.js";
import ExpressError from "../Error/ExpressError.js";
import userModel from "../models/user.model.js";

export const isLoggedIn = async (req, res, next) => {
  try {
    let token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, error: "Unauthourize Access" });
    }

    const isBlackListed = await redisClient.get(token);

    if (isBlackListed) {
      res.cookie("token", "");
      return res
        .status(401)
        .json({ success: false, error: "Unauthourize Access" });
    }

    let decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return next(new ExpressError(404, "User not found"));
    }

    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({
      success: false,
      error: err.message,
    });
  }
};
