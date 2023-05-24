// Purpose: To define the routes for the application
import { Router } from "express";

import {
  createResetSession,
  generateOTP,
  getUser,
  login,
  register,
  resetPassword,
  updateUser,
  verifyOTP,
  verifyUser,
} from "../controllers/appController.js";
import { registerMail } from "../controllers/mailer.js"
import Auth, { localVariable } from "../middlewares/auth.js";

const router = Router();

// POST Method
router.route("/register").post(register);
router.route("/login").post(verifyUser, login);
router.route("/registermail").post(registerMail);
router.route("/auth").post(verifyUser, (req, res) => {
  return res.end();
});

// GET Method
router.route("/user/:username").get(getUser);
router.route("/generateOTP").get(localVariable, generateOTP);
router.route("/verifyOTP").get(verifyOTP);
router.route("/createResetSession").get(createResetSession);

// PUT Method
router.route("/updateuser").put(Auth, updateUser);
router.route("/resetPassword").put(verifyUser, resetPassword);

export default router; // export router to use in server.js
