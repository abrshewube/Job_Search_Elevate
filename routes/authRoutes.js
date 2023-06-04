import express from "express";
import rateLimit from "express-rate-limit";
import { login, register, updateUser } from "../controllers/authController.js";
import authenticateUser from "../middleware/auth.js";

const router = express.Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: "Too many requests were send, please try again after 15 minutes",
  //   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  //   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Public routes
router.route("/register").post(limiter, register);
router.route("/login").post(limiter, login);
// Auth routes
router.route("/updateUser").patch(authenticateUser, updateUser);

export default router;
