import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
/**
 * auth middlware
 */
const Auth = (req, res, next) => {
  try {
    // access author
    const token = req.headers.authorization.split(" ")[1];

    // retrive user data from token payload
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    // res.json(decodedToken)
    next();
  } catch (error) {
    return res.status(401).json({ error: "Authentication Failed" });
  }
};

export const localVariable = (req, res, next) => {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
};

export default Auth;
