let Router = require("express").Router();

const { CreatePayment } = require("../controllers/payments");
const { verifyToken } = require("../middleware/jwtCheck");

Router.route("/create-payment-intent").post(CreatePayment);

module.exports = Router;
