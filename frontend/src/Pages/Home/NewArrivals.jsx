import React from "react";
import AnimatedText from "../../components/Animations";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ProductCard from "../Products/ProductCard";
import useUserData from "../../components/Hooks/useUserData";
import { TruckLoader } from "../../components/Loaders";

const NewArrivals = ({ styles, isSMallScreen, allProducts }) => {
  const userData = useUserData();
  const { cartItems, favItems } = userData || {};
  const textPartsNewArrivals = [{ text: "New Arrivals", style: styles.newArrivalsHeading }];
  const NewestProducts = allProducts?.data?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const handleScroll = (direction) => {
    const scrollRow = document.getElementById("product-scroll-row");
    scrollRow.scrollLeft += direction === "right" ? 350 : -350;
  };

  const renderProducts = () => {
    return NewestProducts.map((product, index) => {
      const isInCart = cartItems?.some((cartItem) => cartItem?._id === product?._id);
      const isInFav = favItems?.some((favItem) => favItem?._id === product?._id);

      return <ProductCard key={index} el={product} isInCart={isInCart} isInFav={isInFav} />;
    });
  };

  return (
    <div>
      <h1 className={isSMallScreen ? "text-center mb-3" : "text-start mb-5"}>
        <AnimatedText parts={textPartsNewArrivals} />
      </h1>
      {NewestProducts?.length ? (
        <div className='scroll-container'>
          <div className='left'>
            <button className='scroll-arrow-left' onClick={() => handleScroll("left")}>
              <ArrowBackIosNewOutlinedIcon />
            </button>
          </div>
          <div className='scroll-row' id='product-scroll-row'>
            {renderProducts()}
          </div>
          <div className='right'>
            <button className='scroll-arrow-right' onClick={() => handleScroll("right")}>
              <ArrowForwardIosOutlinedIcon />
            </button>
          </div>
        </div>
      ) : (
        <div className='d-flex justify-content-center w-100'>
          <TruckLoader />
        </div>
      )}
    </div>
  );
};

export default NewArrivals;
