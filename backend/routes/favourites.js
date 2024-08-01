let Router = require("express").Router();

const { AddToFav, FavList, DeleteFromFav } = require("../controllers/favourites");
const { verifyToken } = require("../middleware/jwtCheck");

Router.route("/add").post(AddToFav);
Router.route("/list").post(verifyToken, FavList);
Router.route("/delete").post(DeleteFromFav);

module.exports = Router;
