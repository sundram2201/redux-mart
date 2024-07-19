var Router = require("express").Router();

const { loginUser, getUser, createUser } = require("../controllers/user");

// exports.loginUser = async () => {};
Router.route("/create-user").post(createUser);
Router.route("/login-user").post(loginUser);
// Router.route("/get-user").get(getUser);

module.exports = Router;
