import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    res
      .status(200)
      .json({ success: true, message: "User Created Successfully" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "User Not Found"));
    }
    const comparePassword = bcryptjs.compareSync(password, user.password);
    if (!comparePassword) {
      return next(errorHandler(401, "Wrong Credential"));
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const expiryDate = new Date(Date.now() + 3600000);
    res.cookie("access_token", token, { httpOnly: true, expires: expiryDate });
    return res.status(200).json({
      success: true,
      message: "User Signin Successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
