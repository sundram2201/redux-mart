import React from "react";
import ProductCard from "../Products/ProductCard";
import useUserData from "../../Hooks/User";

const index = () => {
  const data = useUserData();

  const favItems = data?.favItems;
  const cartItems = data?.cartItems;

  const ProductListing = () => {
    return favItems?.map((el, i) => {
      const isInCart = cartItems?.some((cartItem) => cartItem?._id === el?._id);
      const isInFav = favItems?.some((favItem) => favItem?._id === el?._id);

      return <ProductCard el={el} i={i} isInCart={isInCart} isInFav={isInFav} />;
    });
  };

  return (
    <div className='container'>
      <div className='row'>
        <p className='wlcm-head w-100 text-white' style={{ paddingBottom: "2rem" }}>
          <span>Favourites</span>
        </p>

        <ProductListing />
      </div>
    </div>
  );
};

export default index;
