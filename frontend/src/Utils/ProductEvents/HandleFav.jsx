import { AddToCartAPI, AddToFavAPI } from "../APIs";
import toast from "react-hot-toast";

export const HandleAddFav = async (prodData, userId) => {
  try {
    const data = { userId, prodData };

    const res = await AddToFavAPI(data);
    if (res.status === 201) {
      toast.success(res.data.message);
    }
  } catch (err) {
    toast(err.response.data.message, { icon: "⚠️", id: "001" });
  }
};

export const HandleRemoveFav = async (prodData) => {
  try {
    const data = { userId, prodData };

    const res = await AddToCartAPI(data);
    if (res.status === 201) {
      toast.success(res.data.message);
    }
  } catch (err) {
    toast(err.response.data.message, { icon: "⚠️", id: "001" });
  }
};
