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
