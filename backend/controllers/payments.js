const PaymentCollection = require("../models/payments");
const Stripe = require("stripe");

const stripeKey = Stripe(process.env.STRIPE_SECRET_KEY);

exports.CreatePayment = async (req, res) => {
  const { amount, userId, orderId } = req.body;

  if (!amount || !userId || !orderId) {
    return res.status(400).send({ error: "Amount, userId, and orderId are required" });
  }
  try {
    const paymentIntent = await stripeKey.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    const payment = new PaymentCollection({
      userId,
      orderId,
      amount,
      currency: "usd",
      paymentMethod: "card",
      paymentIntentId: paymentIntent.id,
      status: "pending",
    });

    await payment.save();

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
