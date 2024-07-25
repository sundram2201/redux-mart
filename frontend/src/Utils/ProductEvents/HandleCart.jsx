import React from "react";
import { AddToCartAPI } from "../APIs";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export const HandleAddCart = async (e, prodData, userId) => {
  //   const userId = useSelector((state) => state.userData.data?.user?._id);

  e.stopPropagation();
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

export const HandleRemoveCart = async (e, prodData) => {
  console.log("ibside fnccc");
  e.stopPropagation();
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
