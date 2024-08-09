const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  orderId: { type: String, ref: "Order" },
  amount: Number,
  currency: String,
  paymentMethod: String,
  paymentIntentId: String,
  status: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  metadata: Object,
});

module.exports = mongoose.model("payments", paymentSchema);
