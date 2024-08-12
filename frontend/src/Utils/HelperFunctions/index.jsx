import toast from "react-hot-toast";
import useUserData from "../../components/Hooks/useUserData";
import ProductCard from "../../Pages/Products/ProductCard";
import {
  AddToFavAPI,
  DeleteItemFromFavAPI,
  AddToCartAPI,
  DeleteItemFromCartAPI,
  GetAllProductAPI,
  GetProdByIdAPI,
} from "../APIs";
import { BaseUrl } from "../APIs/BaseUrl";
import { fetchUserData } from "../../components/Layouts";

export const hasToken = () => Boolean(localStorage.getItem("token"));

export const LoginToast = (navigate) => {
  return toast(
    (t) => (
      <span>
        ⚠️ Please{" "}
        <b>
          {" "}
          <button
            className='crt-acnt-link login-toast-btn'
            onClick={() => {
              toast.dismiss(t.id);
              navigate("/login");
            }}>
            Login
          </button>
        </b>{" "}
        first
      </span>
    ),
    {
      duration: 6000,
      id: "001",
    }
  );
};

export const PrivateNavigation = (navUrl, actionType, navigate) => {
  if (hasToken()) {
    if (actionType === "navigation") {
      navigate(navUrl);
    } else {
      LoginToast(navigate);
    }
  } else {
    LoginToast(navigate);
  }
};
export const HandleCartAction = async (e, actionType, prodData, userId, setData) => {
  e.stopPropagation();

  const { dispatch, navigate, setIsloading } = setData;
  setIsloading(true);
  try {
    if (hasToken()) {
      const data = { userId, prodData };
      let res = null;

      if (actionType === "delete") {
        res = await DeleteItemFromCartAPI(data);
      } else if (actionType === "add") {
        res = await AddToCartAPI(data);
      }
      if (res.status === 201 || res.status === 200) {
        toast.success(res.data.message);
        setIsloading(false);
      }

      fetchUserData(dispatch);
    } else {
      LoginToast(navigate);
      setIsloading(false);
    }
  } catch (err) {
    setIsloading(false);
  }
};
export const HandleFavAction = async (actionType, prodData, userId, setData) => {
  const { dispatch, navigate } = setData;

  try {
    if (hasToken()) {
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

      fetchUserData(dispatch);
    } else {
      LoginToast(navigate);
    }
  } catch (err) {
    // setIsloading(false);
  }
};

export const getAllProducts = async (setAllProducts) => {
  try {
    setAllProducts({ loading: true, data: [] });
    const res = await GetAllProductAPI();
    if (res.status === 200) {
      setAllProducts({ loading: false, data: res.data.data });
    }
  } catch (err) {
    setAllProducts({ loading: false, data: [] });
  }
};

export const GetProdById = async (setProdData, productID) => {
  setProdData({ loading: true });

  try {
    const res = await GetProdByIdAPI(productID);
    if (res.status == 200) {
      setProdData({ data: res.data.data, loading: false });
    }
  } catch (err) {
    setProdData({ loading: false });
  }
};

export const ProductListing = (ProdArr) => {
  const userData = useUserData();
  const cartItems = userData?.cartItems;
  const favItems = userData?.favItems;

  return ProdArr?.length ? (
    ProdArr.map((el, i) => {
      const isInCart = cartItems?.some((cartItem) => cartItem?._id === el?._id);
      const isInFav = favItems?.some((favItem) => favItem?._id === el?._id);

      return <ProductCard key={i} el={el} isInCart={isInCart} isInFav={isInFav} />;
    })
  ) : (
    <div className='text-center my-5 text-secondary fw-bold'>
      <i>No Product Found...</i>
    </div>
  );
};

export const getImageUrl = (url) => {
  const fixUrl = `${BaseUrl}/uploads/`;
  return fixUrl + url.split("/").at(-1);
};
