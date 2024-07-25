const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "abc";
const UserDB = require("../models/user");

exports.verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  const auth = token?.split(" ")[1];
  if (!auth) return res.status(401).json({ status: false, message: "No token provided" });
  try {
    jwt.verify(auth, JWT_SECRET, async (err, data) => {
      if (err) {
        console.error("JWT verification error::", err);
        res.statusCode = 401;
        return res.status(401).json({ status: false, message: "Invalid Token" });
      } else {
        let resp = await UserDB.findOne({ _id: data._id });
        if (!resp) {
          console.log("after next");
          res.statusCode = 401;
          return res.status(401).json({ status: false, message: "Session Expired" });
        } else {
          req.user = data._id;
          next();
        }
      }
    });
  } catch (e) {
    res.statusCode = 401;
    console.log("in catch");
    return res.status(401).json({ status: false, message: "Unauthorized Access" });
  }
};
