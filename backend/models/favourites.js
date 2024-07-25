const mongoose = require("mongoose");

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

const favSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [productSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("favourites", favSchema);
