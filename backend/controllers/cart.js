const CartCollection = require("../models/cart");

exports.AddToCart = async (req, res) => {
  try {
    const { userId, prodData } = req.body;

    let cart = await CartCollection.findOne({ userId });
    const existingItem = cart?.items?.some((el, i) => el?._id?.toString() === prodData?._id?.toString());
    if (!cart) {
      cart = new CartCollection({ userId, items: [] });
    }

    if (existingItem) {
      return res.status(400).json({ message: "Item already in the cart" });
    } else {
      cart.items.push(prodData);
    }

    await cart.save();
    return res.status(201).json({ message: "Added to cart", cart });
  } catch (err) {
    console.error("Error adding to cart::", err);
    return res.status(400).json({ message: "Error" });
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

    return;
  } catch (err) {}
};
