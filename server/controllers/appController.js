import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.model.js";
import { invalidEmail } from "../validators/invalidEmail.js";
dotenv.config();

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

/** POST: http://localhost:8080/api/register 
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

/** POST: http://localhost:8080/api/login 
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

/** GET: http://localhost:8080/api/user/example123 */
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

/** PUT: http://localhost:8080/api/updateuser 
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
  console.log(req.params)
  // const id = req.params;
  // const body = req.query;
  // console.log(id)
  // try {
  //   if (id) {
  //     if (!mongoose.Types.ObjectId.isValid(id)) {
  //       return res.status(404).json({ error: "Incorrect User ID" });
  //     }
  //     const response = await User.findOneAndUpdate(
  //       { _id: id },
  //       {
  //         ...body,
  //       }
  //     );
  //     if (!response) {
  //       return res.status(404).json({ error: "No such User" });
  //     } else {
  //       res.status(200).json(response);
  //     }
  //   } else {
  //     return res.status(400).json({ message: "Invalid user id" });
  //   }
  // } catch (error) {
  //   return res.status(500).json({ message: error.message });
  // }
}; // update user

/** GET: http://localhost:8080/api/generateOTP */
export const generateOTP = async (req, res) => {}; // generate OTP

/** GET: http://localhost:8080/api/verifyOTP */
export const verifyOTP = async (req, res) => {}; // verify OTP

// successfully redirect user when OTP is valid
/** GET: http://localhost:8080/api/createResetSession */
export const createResetSession = async (req, res) => {}; // create reset session

// update the password when we have valid session
/** PUT: http://localhost:8080/api/resetPassword */
export const resetPassword = async (req, res) => {}; // reset password
