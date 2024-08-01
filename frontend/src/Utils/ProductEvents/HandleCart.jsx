import { AddToCartAPI, DeleteItemFromCartAPI } from "../APIs";
import toast from "react-hot-toast";
import { fetchUserData } from "../../components/Layout";

export const HandleCartAction = async (e, actionType, prodData, userId, setData, page) => {
  e.stopPropagation();

  const { dispatch, navigate, setIsloading } = setData;
  setIsloading(true);
  try {
    const data = { userId, prodData };
    let res = null;

    if (actionType === "delete") {
      console.log(data, "data in cart");
      res = await DeleteItemFromCartAPI(data);
    } else if (actionType === "add") {
      res = await AddToCartAPI(data);
    }

    if (res.status === 201 || res.status === 200) {
      toast.success(res.data.message);
      setIsloading(false);
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
    setIsloading(false);
  }
};
