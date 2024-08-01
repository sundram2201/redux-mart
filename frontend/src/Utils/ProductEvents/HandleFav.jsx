import React from "react";
import { AddToCartAPI, AddToFavAPI, DeleteItemFromCartAPI, DeleteItemFromFavAPI } from "../APIs";
import toast from "react-hot-toast";
import { fetchUserData } from "../../components/Layout";

// HandleFavAction(e, actionType, el, userId, { dispatch, navigate }, "fav");

export const HandleFavAction = async (actionType, prodData, userId, setData, page) => {
  const { dispatch, navigate } = setData;

  try {
    const data = { userId, prodData };
    let res = null;

    if (actionType === "delete") {
      res = await DeleteItemFromFavAPI(data);
    } else if (actionType === "add") {
      res = await AddToFavAPI(data);
    }

    if (res.status === 201 || res.status === 200) {
      toast.success(res.data.message);
      // setIsloading(false);
    }

    fetchUserData(dispatch, navigate);

    // if (page === "product") {
    //   const { dispatch, navigate } = setData;
    //   fetchUserData(dispatch, navigate);
    // } else if (page === "cart") {
    //   getCartList(setData);
    // } else

    if (page === "view") {
      // const { setProdData, productID } = setData;
      // GetProdById(setProdData, productID);
      // fetchUserData(dispatch, navigate);
    }
  } catch (err) {
    // setIsloading(false);
  }
};
