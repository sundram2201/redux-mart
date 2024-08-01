let FavCollection = require("../models/favourites");

exports.AddToFav = async (req, res) => {
  try {
    const { userId, prodData } = req.body;

    let favourites = await FavCollection.findOne({ userId });
    let existingItem = favourites?.items?.some((item) => item?._id?.toString() === prodData?._id?.toString());

    if (!favourites) {
      favourites = new FavCollection({ userId, items: [] });
    }

    if (existingItem) {
      return res.status(400).json({ message: "Item already in favourites" });
    } else {
      favourites?.items.push(prodData);
    }

    await favourites.save();
    return res.status(201).json({ message: "Added to favourites", favourites });
  } catch (err) {
    return res.status(400).json({ message: "Error" });
  }
};

exports.FavList = async (req, res) => {
  try {
    const userId = req.user;

    const FavList = FavCollection.findOne({ userId: userId });

    if (!FavList) {
      res.status(204).json({ message: "Nothing in Favourites", data: [] });
    }
    res.status(200).json({ message: "Favourites fetched successfully", data: FavList });
  } catch (err) {}
};

exports.DeleteFromFav = async (req, res) => {
  try {
    const { userId, prodData } = req.body;

    const favourites = await FavCollection.findOne({ userId: userId });

    const itemIndex = favourites.items.findIndex((item) => item._id.toString() === prodData?._id.toString());
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }
    favourites.items.splice(itemIndex, 1);

    await favourites.save();

    return res.status(200).json({ message: "Item removed form the cart", favourites });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
