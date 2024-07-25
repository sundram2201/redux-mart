const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const productSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  desc: { type: String, required: true },
  category: { type: String, required: true },
  image: [{ type: String }],
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});

const cartSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [productSchema],
  createdAt: { type: Date, default: Date.now },
});

// // Hash password before saving the user
// cartSchema.pre("save", async function (next) {
//   const salt = await bcrypt.genSalt(10); // Adjust salt rounds as needed
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

module.exports = mongoose.model("carts", cartSchema);
