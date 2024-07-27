import React from "react";
import { AddToCartAPI, DeleteItemFromCartAPI } from "../APIs";
import toast from "react-hot-toast";
import { fetchUserData } from "../../components/Layout";

export const HandleCartAction = async (e, actionType, prodData, userId, setData, page) => {
  e.stopPropagation();
  try {
    const data = { userId, prodData };
    let res = null;

    if (actionType === "delete") {
      res = await DeleteItemFromCartAPI(data);
    } else if (actionType === "add") {
      res = await AddToCartAPI(data);
    }

    if (res.status === 200) {
      toast.success(res.data.message);
    }
    const { dispatch, navigate } = setData;

    fetchUserData(dispatch, navigate);

    // if (page === "product") {
    //   const { dispatch, navigate } = setData;
    //   fetchUserData(dispatch, navigate);
    // } else if (page === "cart") {
    //   getCartList(setData);
    // } else

    if (page === "view") {
      const { setProdData, productID } = setData;

      // GetProdById(setProdData, productID);
      // fetchUserData(dispatch, navigate);
    }
  } catch (err) {
    console.error("Error:::", err);
  }
};
