var Router = require("express").Router();

const { AddToCart, CartList, DeleteFromCart } = require("../controllers/cart");
const { verifyToken } = require("../middleware/jwtCheck");

Router.route("/add").post(AddToCart);
Router.route("/cart-list").get(verifyToken, CartList);
Router.route("/delete").post(DeleteFromCart);

module.exports = Router;
