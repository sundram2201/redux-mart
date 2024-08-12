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
import { ProductSkeleton, TruckLoader } from "../../components/Loaders";

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

  return (
    <div className='container'>
      <div className='banner-box'>
        <img className='w-100  ' src={banner} alt='banner' />
      </div>
      <div className='mt-5'>
        <AnimatedText parts={textPartsHead} />
      </div>
      <p className='rdxm-desc'>
        ReduxMart is a modern e-commerce application developed using the MERN stack, designed to simulate a real-world
        online store experience. This project highlights my proficiency in full-stack development, from designing a
        responsive frontend with React and Redux to building a scalable backend using Node.js, Express, and MongoDB.
        ReduxMart offers features such as user authentication, product management, and a streamlined checkout process,
        all while ensuring smooth performance and a user-friendly interface. This project represents my dedication to
        creating high-quality web applications that meet the needs of both businesses and end-users.
        <br />
        <br />
        Feel free to explore the code on my
        <a
          href='https://github.com/sundram2201'
          target='_blank'
          style={{ color: "rgb(122, 62, 246)" }}
          className='crt-acnt-link'>
          {" "}
          GitHub profile
        </a>
        , and if you find this project helpful or inspiring, please consider giving it a star! 🌟
      </p>
      <hr className='my-5 text-white' />
      {/* New arrivals  */}
      <div>
        <h1 className='text-start  mb-5'>
          <AnimatedText parts={textPartsNewArrivals} />
        </h1>
        {NewestProducts?.length ? (
          <div className='scroll-container'>
            <div className='left'>
              <button className='scroll-arrow-left' onClick={handleScrollLeft}>
                <ArrowBackIosNewOutlinedIcon />
              </button>
            </div>
            <div className='scroll-row' id='product-scroll-row'>
              {NewestProducts.map((product, index) => (
                <ProductCard key={index} el={product} />
              ))}
            </div>
            <div className='right'>
              <button className='scroll-arrow-right' onClick={handleScrollRight}>
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
