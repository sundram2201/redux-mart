var Router = require("express").Router();

const { loginUser, getUser, createUser } = require("../controllers/user");
const { verifyToken } = require("../middleware/jwtCheck");

Router.route("/create-user").post(createUser);
Router.route("/login-user").post(loginUser);

Router.route("/get-user").get(verifyToken, getUser);

module.exports = Router;
