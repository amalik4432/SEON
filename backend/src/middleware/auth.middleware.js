import jwt from "jsonwebtoken";
import redisClient from "../services/redis.service.js";

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
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ success: false, error: "web err" });
  }
};
