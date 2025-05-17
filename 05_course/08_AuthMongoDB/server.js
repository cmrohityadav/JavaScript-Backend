import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import User from "./models/user.js";
import { authenticateUser, authorizeAdmin } from "./middleware/authMiddleware.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

mongoose.connect("mongodb://127.0.0.1:27017/auth_demo");

// Register Route
app.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(409).send("Email already registered");

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ name, email, password: hashedPassword, role });

  res.status(201).json({ message: "User registered" });
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("Invalid Email");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send("Invalid Password");

  const token = jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET || "secretkey",
    { expiresIn: "1h" }
  );

  res.cookie("token", token, { httpOnly: true });
  res.status(200).send("Login successful");
});

// Protected Route (only for logged-in users)
app.get("/profile", authenticateUser, (req, res) => {
  res.send(`Hello ${req.user.email}, you are authenticated`);
});

// Admin-only Route
app.get("/admin", authenticateUser, authorizeAdmin, (req, res) => {
  res.send("Welcome Admin!");
});

// Logout
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.send("Logged out");
});

// Start server
const PORT =3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
