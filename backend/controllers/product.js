const ProductDB = require("../models/product");
const UserDB = require("../models/user");
const { default: mongoose } = require("mongoose");

exports.AddProduct = async (req, res) => {
  try {
    const { name, desc, price, category, image } = req.body;
    let files = req.files;

    files = files?.map((file) => file.filename);

    // let userId = req.user;

    const addProduct = await ProductDB.create({
      name,
      price,
      desc,
      category,
      image: files,
    });

    if (!addProduct) {
      return res.status(400).json({ data: {}, message: "something went wrong" });
    }

    const savedProduct = await ProductDB.findOne({ _id: addProduct._id });
    return res.status(201).json({ data: savedProduct, message: "Product added successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.AllProducts = async (req, res) => {
  try {
    const userId = req.user;

    // const checkUser = await UserDB.findOne({ _id: userId });

    // if (!checkUser) {
    //   res.status(404).json({ status: false, message: "invalid user" });
    // }

    let message = `${req.protocol}:${req.get("host")}/uploads/`;

    const momentList = await ProductDB.aggregate([
      {
        $project: {
          _id: 1,
          name: 1,
          price: 1,
          desc: 1,
          category: 1,
          createdAt: 1,
          updatedAt: 1,
          image: {
            $map: {
              input: "$image",
              as: "image",
              in: {
                $concat: [message, "$$image"],
              },
            },
          },
        },
      },
    ]);

    return res.status(200).json({ data: momentList, message: "data fetched successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve products" });
  }
};

exports.GetProductById = async (req, res) => {
  try {
    const productID = req.query.id;

    const product = await ProductDB.findById({ _id: productID });

    return res.status(200).json({ message: "Product fetched successfully", data: product });
  } catch (err) {
    return res.status(400).json({ message: "error while fetching data" });
  }
};
