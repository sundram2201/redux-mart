import "./Products.css";
import Tab from "./Tab";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import { GetAllProductAPI } from "../../Utils/APIs";
import useUserData from "../../Hooks/User";
import ProductCard from "./ProductCard";

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
const index = () => {
  const [prodCate, setProdCate] = useState("");
  const [allProducts, setAllProducts] = useState({ loading: true, data: [] });
  const userData = useUserData();
  const cartItems = userData?.cartItems;
  const favItems = userData?.favItems;

  const filteredProducts = allProducts?.data.filter((el) => {
    if (!prodCate) {
      return allProducts?.data;
    }
    return el.category === prodCate;
  });

  const ProductListing = () => {
    return filteredProducts.length ? (
      filteredProducts.map((el, i) => {
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

  useEffect(() => {
    getAllProducts(setAllProducts);
  }, []);

  const getProdCate = (value) => {
    return setProdCate(value);
  };

  return (
    <div style={{ padding: "7rem" }}>
      <Tab getProdCate={getProdCate} />
      <ProductList prodCate={prodCate} userData={userData} ProductListing={ProductListing} />
    </div>
  );
};

export default index;
