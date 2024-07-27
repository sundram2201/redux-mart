const CartCollection = require("../models/cart");

exports.AddToCart = async (req, res) => {
  try {
    const { userId, prodData } = req.body;

    let cart = await CartCollection.findOne({ userId });
    if (!cart) {
      cart = await CartCollection.create({ userId, items: [] });
    }

    const existingItem = cart?.items?.some((el, i) => el?._id?.toString() === prodData?._id?.toString());
    if (existingItem) {
      return res.status(400).json({ message: "Item already in the cart" });
    }

    const result = await CartCollection.findByIdAndUpdate(cart._id, { $push: { items: prodData } }, { new: true });

    res.status(201).json({ message: "Added to cart", cart: result });
  } catch (err) {
    console.error("Error adding to cart::", err);
    res.status(400).json({ message: "Error" });
  }
};

exports.CartList = async (req, res) => {
  try {
    const userId = req.user;
    const cartList = await CartCollection.findOne({ userId: userId });

    if (!cartList) {
      return res.status(204).json({ message: "Nothing in cart", data: [] });
    }

    return res.status(200).json({ message: "Cart list", data: cartList });
  } catch (err) {}
};

exports.DeleteFromCart = async (req, res) => {
  try {
    const { userId, prodData } = req.body;

    const cart = await CartCollection.findOne({ userId: userId });

    const itemIndex = cart.items.findIndex((item) => item._id.toString() === prodData?._id.toString());
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }
    cart.items.splice(itemIndex, 1);

    await cart.save();

    return res.status(200).json({ message: "Item removed form the cart", cart });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
