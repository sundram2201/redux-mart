let Router = require("express").Router();

const { AddToFav } = require("../controllers/favourites");

Router.route("/add").post(AddToFav);

module.exports = Router;
