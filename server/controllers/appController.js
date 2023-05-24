import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import otpGenerator from "otp-generator";

import User from "../models/User.model.js";
import { invalidEmail } from "../validators/invalidEmail.js";
dotenv.config();

// verify User
export async function verifyUser(req, res, next) {
  try {
    const { username } = req.method == "GET" ? req.query : req.body;

    // check the user existance
    let exist = await User.findOne({ username });
    if (!exist) return res.status(404).send({ error: "Can't find User!" });
    next();
  } catch (error) {
    return res.status(404).send({ error: "Authentication Error" });
  }
}

// verify user token
export const verifyToken = async (req, res, next) => {
  try {
    const { username } = req.query === "GET" ? req.query : req.body;

    // check existing user
    const USER = await User.findOne({ username });
    if (!USER) {
      return res.status(400).json({ message: "Invalid username" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/** POST: http://localhost:8000/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/
export const register = async (req, res) => {
  const {
    username,
    password,
    email,
    firstName,
    lastName,
    mobile,
    address,
    profile,
  } = req.body;
  try {
    if (!username || !password || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!invalidEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const nameExists = await User.findOne({ username });
    if (nameExists) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      firstName: firstName || "",
      lastName: lastName || "",
      mobile: mobile || 0,
      address: address || "",
      profile: profile || "",
    });
    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}; // register user

/** POST: http://localhost:8000/api/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/
export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const USER = await User.findOne({ username });
    if (!USER) {
      return res.status(400).json({ message: "Invalid username" });
    } else {
      bcrypt.compare(password, USER.password, (err, result) => {
        if (err) {
          return res.status(400).json({ message: "Invalid password" });
        }
        if (result) {
          // create jwtoken
          const token = jwt.sign(
            { _id: USER._id, username: USER.username },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
          );
          return res.status(200).json({
            message: "Login successful",
            username: USER.username,
            token: token,
          });
        } else {
          return res.status(400).json({ message: "Invalid password" });
        }
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}; // login user

/** GET: http://localhost:8000/api/user/example123 */
export const getUser = async (req, res) => {
  const { username } = req.params;
  console.log(username);
  try {
    if (!username) {
      return res.status(400).json({ message: "Invalid username" });
    }
    const USER = await User.findOne({ username });
    if (!USER) {
      return res.status(400).json({ message: "Invalid username" });
    } else {
      const { password, ...others } = USER._doc;
      return res.status(200).json(others);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}; // get user by username

/** PUT: http://localhost:8000/api/updateuser 
 * @param: {
  "header" : "<token>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
export const updateUser = async (req, res) => {
  // const {id} = req.query;
  const { _id: id } = req.user;
  const body = req.body;
  console.log(id, body);
  try {
    if (id) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Incorrect User ID" });
      }
      const response = await User.findOneAndUpdate(
        { _id: id },
        {
          ...body,
        }
      );
      if (!response) {
        return res.status(404).json({ error: "No such User" });
      } else {
        res.status(200).json(response);
      }
    } else {
      return res.status(400).json({ message: "Invalid user id" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}; // update user

/** GET: http://localhost:8000/api/generateOTP */
export const generateOTP = async (req, res) => {
  req.app.locals.OTP = await otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  return res.status(201).json({ code: req.app.locals.OTP });
}; // generate OTP

/** GET: http://localhost:8000/api/verifyOTP */
export const verifyOTP = async (req, res) => {
  const { code } = req.query;
  if (parseInt(code) === parseInt(req.app.locals.OTP)) {
    req.app.locals.OTP = null; // reset OTP to null after verification
    req.app.locals.resetSession = true; // set reset session to true for reset password
    return res.status(200).json({ message: "Verified Successfully" });
  } else {
    return res.status(400).json({ message: "Invalid OTP" });
  }
}; // verify OTP

// successfully redirect user when OTP is valid
/** GET: http://localhost:8000/api/createResetSession */
export const createResetSession = async (req, res) => {
  if (req.app.locals.resetSession) {
    req.app.locals.resetSession = false; // reset session to false after redirect and only once
    return res.status(200).json({ message: "Reset session created" });
  }
  return res.status(440).json({ message: "Session Expired" });
}; // create reset session

// update the password when we have valid session
/** PUT: http://localhost:8000/api/resetPassword */
export const resetPassword = async (req, res) => {
  try {
    if (!req.app.locals.resetSession)
      return res.status(440).json({ message: "Session Expired" });
    const { username, password } = req.body;
    try {
      User.findOne({ username })
        .then(async (user) => {
          try {
            const genSalt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, genSalt);
            try {
              const result = await User.updateOne(
                { username: user.username },
                { password: hashedPassword }
              );
              if (!result.matchedCount) {
                throw new Error(`User with username ${username} not found`);
              }
              return res.status(200).json({ message: "Password Changed" });
            } catch (err) {
              throw err;
            }
          } catch (error) {
            return res
              .status(400)
              .json({ message: "Unable to change password" });
          }
        })
        .catch((err) => {
          return res.status(400).json({ message: "Username Does Not Exists" });
        });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}; // reset password
