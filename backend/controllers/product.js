const ProductDB = require("../models/product");

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

    const allProducts = await ProductDB.find({});
    return res.status(200).json({ data: allProducts, message: "data fetched successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve products" });
  }
};
