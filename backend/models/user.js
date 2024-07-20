const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  fullname: { type: String },
  username: { type: String },
  contact: { type: String },
  email: { type: String },
  password: { type: String },
});

// Hash password before saving the user
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10); // Adjust salt rounds as needed
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("martUsers", userSchema);
