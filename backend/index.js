const express = require("express");
const app = express();
const port = 3002;

const cors = require("cors");

//middleware setup

app.use(cors());

app.use(
  cors({
    origin: "https://redux-mart.onrender.com", // Default to localhost for development
    credentials: true, // Allow cookies (if applicable)
  })
);

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});
//routes

const UserRoute = require("./routes/user");
const CartRoute = require("./routes/cart");
const ProductRoute = require("./routes/product");

app.use("/api/v1/user", UserRoute);
app.use("/api/v1/cart", CartRoute);
app.use("/api/v1/product", ProductRoute);

app.get("/", (_, res) => res.send(`Welcome to port : ${port}`));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
app.listen(port, () => console.log(`Server @${port}`));

// DB Connectivity
const db = require("./database");
(async () => {
  await db();
})();
