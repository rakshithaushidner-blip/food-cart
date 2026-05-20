import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required." });
  }
  try {
    const user = await userModel.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }
    const token = createToken(user._id);
    res.json({ success: true, token, userName: user.name });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};

// Register
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }
  try {
    const exists = await userModel.findOne({ email: email.toLowerCase().trim() });
    if (exists) {
      return res.status(409).json({ success: false, message: "An account with this email already exists." });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email address." });
    }
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters." });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({ name: name.trim(), email: email.toLowerCase().trim(), password: hashedPassword });
    const user = await newUser.save();
    const token = createToken(user._id);
    res.status(201).json({ success: true, token, userName: user.name });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};