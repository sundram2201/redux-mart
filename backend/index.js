const express = require("express");
const app = express();
const port = 3002;

const cors = require("cors");

//middleware setup

app.use(cors());

app.use(
  cors({
    origin: "https://redux-mart.onrender.com",
  })
);
app.use(express.json());

//routes

const UserRoute = require("./routes/user");
const ProductRoute = require("./routes/product");

app.use("/api/v1/user", UserRoute);
app.use("/api/v1/product", ProductRoute);

app.get("/", (_, res) => res.send(`Welcom to port : ${port}`));
app.listen(port, () => console.log(`Server @${port}`));

// DB Connectivity
const db = require("./database");
(async () => {
  await db();
})();
