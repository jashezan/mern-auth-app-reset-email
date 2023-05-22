// Purpose: To define the routes for the application
import { Router } from "express";

import {
  createResetSession,
  generateOTP,
  getUser,
  login,
  register,
  updateUser,
  verifyOTP,
  verifyToken,
} from "../controllers/appController.js";

const router = Router();

// POST Method
router.route("/register").post(register);
router.route("/login").post(verifyToken, login);
router.route("/registermail").post((req, res) => {
  return res.json("register mail");
});
router.route("/auth").post((req, res) => {
  return res.json("auth");
});

// GET Method
router.route("/user/:username").get(getUser);
router.route("/generateOTP").get(generateOTP);
router.route("/verifyOTP").get(verifyOTP);
router.route("/createResetSession").get(createResetSession);

// PUT Method
router.route("/updateuser").put(updateUser);
router.route("/resetPassword").put((req, res) => {
  return res.json();
});

export default router; // export router to use in server.js
