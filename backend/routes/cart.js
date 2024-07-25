var Router = require("express").Router();

const { AddToCart, CartList } = require("../controllers/cart");
const { verifyToken } = require("../middleware/jwtCheck");

Router.route("/add").post(AddToCart);
Router.route("/cart-list").get(verifyToken, CartList);

module.exports = Router;
