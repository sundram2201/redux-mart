const UserDB = require("../models/user");
const jwt = require("jsonwebtoken"); // Import the library
require("dotenv").config();

const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
  const { fullname, username, email, contact, password } = req.body;

  try {
    if (!fullname || !username || !email || !contact || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const existingUser = await UserDB.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "Username or Email already exists" });
    }

    const newUser = new UserDB({ fullname, username, email, contact, password });
    await newUser.save();

    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const user = await UserDB.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Username not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const token = await generateAuthToken(user._id); // Replace with your JWT generation function

    return res.status(200).json({ message: "Login successful", data: user, token });
  } catch (err) {
    console.error("Error logging in user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getUser = async () => {};

async function generateAuthToken(userId) {
  const payload = { _id: userId }; // Include relevant user data in the payload
  const jwtSecret = process.env.JWT_SECRET || "abc"; // Use a strong environment variable for the secret

  try {
    const token = await jwt.sign(payload, jwtSecret, { expiresIn: "3600s" }); // Set token expiration (e.g., 1 hour)
    return token;
  } catch (err) {
    console.error("Error generating JWT token:", err);
    throw err; // Re-throw the error to be handled by the catch block in loginUser
  }
}
