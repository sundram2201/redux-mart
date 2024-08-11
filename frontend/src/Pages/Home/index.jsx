import React, { useEffect, useState } from "react";
import Products from "../Products";
import banner from "../../../public/rdxm-banner.png";
import "react-multi-carousel/lib/styles.css";
import { getAllProducts } from "../../Utils/HelperFunctions";
import ProductCard from "../Products/ProductCard";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import col1 from "../../../public/col-1.jpg";
import col2 from "../../../public/col-2.jpg";
import col3 from "../../../public/col-3.jpg";

import { motion } from "framer-motion";
import AnimatedText from "../../components/Animations";

const index = () => {
  const [allProducts, setAllProducts] = useState({ loading: true, data: null });

  useEffect(() => {
    getAllProducts(setAllProducts);
  }, []);

  const NewestProducts = allProducts?.data?.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const handleScrollRight = () => {
    const scrollRow = document.getElementById("product-scroll-row");
    scrollRow.scrollLeft += 250;
  };

  const handleScrollLeft = () => {
    const scrollRow = document.getElementById("product-scroll-row");
    scrollRow.scrollLeft -= 250;
  };

  const padding = "1rem";

  const styles = {
    images: {
      padding,
    },
    layer: {
      position: "absolute",
      height: "50%",
      width: `calc(100% - ${padding} * 2)`,
      background: "linear-gradient(0deg, rgba(0,0,0,0.7), rgba(0,0,0,0) )",
      bottom: padding,
      borderBottomLeftRadius: "20px",
      borderBottomRightRadius: "20px",
    },
    headingTop: {
      color: "white",
      fontSize: "24px",
      textTransform: "uppercase",
      letterSpacing: "3px",
      fontWeight: "600",
    },
    headingBtm: {
      fontSize: "6rem",
      letterSpacing: "3px",
      fontWeight: "900",
      background: "linear-gradient(45deg, #b700ff, #7b3df6)",
      WebkitBackgroundClip: "text", // For WebKit-based browsers (e.g., Chrome, Safari)
      backgroundClip: "text",
      color: "transparent",
      lineHeight: 1,
    },
  };
  const textPartsHead = [
    { text: "Welcome to ", style: styles.headingTop },
    { text: "ReduxMart", style: styles.headingBtm },
  ];

  const textPartsNewArrivals = [{ text: "New Arrivals", style: null }];
  const textPartsCollections = [{ text: "Collections", style: null }];
  // const textPartsNewArrivals = [{ text: "New Arrivals", style: null }];

  return (
    <div className='container'>
      <div className='banner-box'>
        <img className='w-100  ' src={banner} alt='banner' />
      </div>
      <div className='my-5'>
        <AnimatedText parts={textPartsHead} />
      </div>
      <p className='rdxm-desc'>
        This is dummy text lorem ipsum this is dummy text lorem ipsum this is dummy text lorem ipsum this is dummy text
        lorem ipsum this is dummy text lorem ipsum this is dummy text lorem ipsum this is dummy text lorem ipsum this is
        dummy text lorem ipsum this is dummy text lorem ipsum this is dummy text lorem ipsum this is dummy text lorem
        ipsum this is dummy text lorem ipsum this is dummy text lorem ipsum this is dummy text lorem ipsum this is dummy
        text lorem ipsum this is dummy text lorem ipsum this is dummy text lorem ipsum this is dummy text lorem ipsum{" "}
        this is dummy text lorem ipsum this is dummy text lorem ipsum this is dummy text lorem ipsum this is dummy text
        lorem ipsum this is dummy text lorem ipsum this is
      </p>
      <hr className='my-5 text-white' />
      {/* New arrivals  */}
      <div>
        <h1 className='text-start  mb-5'>
          {" "}
          <AnimatedText parts={textPartsNewArrivals} />
        </h1>

        <div className='scroll-container'>
          <div className='left'>
            <button className='scroll-arrow-left' onClick={handleScrollLeft}>
              <ArrowBackIosNewOutlinedIcon />
            </button>
          </div>

          <div className='scroll-row' id='product-scroll-row'>
            {NewestProducts ? (
              NewestProducts.map((product, index) => <ProductCard key={index} el={product} />)
            ) : (
              <div className='text-center my-5 text-secondary fw-bold'>
                <i>No Product Found...</i>
              </div>
            )}
          </div>

          <div className='right'>
            <button className='scroll-arrow-right' onClick={handleScrollRight}>
              <ArrowForwardIosOutlinedIcon />
            </button>
          </div>
        </div>
      </div>
      {/* Collecitons  */}
      <hr className='my-5 text-white' />
      <div>
        <h1 className='text-start mb-5'>
          {" "}
          <AnimatedText parts={textPartsCollections} />
        </h1>
        <div className='row justify-content-center'>
          <div className='col-md-4 d-flex  p-0 flex-column justify-content-between'>
            <div className='flex-fill  banner-box position-relative' style={styles.images}>
              <img src={col1} className='coll-img' alt='right collection' />
              <h1 className='position-absolute women-col-head'>T-Shirts</h1>
              {/* <p className='position-absolute women-col-head'>T-Shirts</p> */}
              <div className='empty' style={styles.layer}></div>
            </div>
            <div className='flex-fill  banner-box position-relative' style={styles.images}>
              <img src={col2} className='coll-img' alt='right collection' />
              <h1 className='position-absolute kid-col-head'>Kids</h1>
              <div className='empty' style={styles.layer}></div>
            </div>
          </div>
          <div className='col-md-5  banner-box position-relative right-coll' style={styles.images}>
            <img src={col3} className='coll-img' alt='right collection' />
            <h1 className='position-absolute men-col-head'>Men Hoodies</h1>
            <div className='empty' style={styles.layer}></div>
          </div>
        </div>
      </div>
      <hr className='my-5 text-white' />
      {/* Product cateogry */}
      <Products />
    </div>
  );
};

export default index;
