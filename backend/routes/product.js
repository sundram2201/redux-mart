const Router = require("express").Router();

const { AddProduct } = require("../controllers/product");
const { AllProducts } = require("../controllers/product");
const { uploadFile } = require("../helper/multerUpload");

Router.route("/add-product").post(uploadFile.array("image", 10), AddProduct);
Router.route("/all-products").get(AllProducts);

module.exports = Router;
