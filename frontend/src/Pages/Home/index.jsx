import React, { useEffect, useState } from "react";
import Products from "../Products";
import "react-multi-carousel/lib/styles.css";
import { getAllProducts } from "../../Utils/HelperFunctions";
import useSmScreen from "../../components/Hooks/useSmSceen";
import MainScreen from "./MainScreen";
import NewArrivals from "./NewArrivals";
import Collections from "./Collections";
import Footer from "./Footer";

const index = () => {
  const [allProducts, setAllProducts] = useState({ loading: true, data: null });
  const isSMallScreen = useSmScreen();
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
      fontSize: isSMallScreen ? "20px" : "24px",
      textTransform: "uppercase",
      letterSpacing: "3px",
      fontWeight: "600",
    },
    headingBtm: {
      fontSize: isSMallScreen ? "4rem" : "6rem",
      letterSpacing: "3px",
      fontWeight: "900",
      background: "linear-gradient(45deg, #b700ff, #7b3df6)",
      WebkitBackgroundClip: "text", // For WebKit-based browsers (e.g., Chrome, Safari)
      backgroundClip: "text",
      color: "transparent",
      lineHeight: 1,
    },
    newArrivalsHeading: {
      fontSize: isSMallScreen ? "1em" : "unset",
    },
  };

  useEffect(() => {
    getAllProducts(setAllProducts);
  }, []);

  return (
    <div className="container">
      <MainScreen styles={styles} />
      <hr className="my-5 text-white" />
      <NewArrivals
        styles={styles}
        isSMallScreen={isSMallScreen}
        allProducts={allProducts}
      />
      <hr className="my-5 text-white" />
      <Collections styles={styles} />
      <hr className="my-5 text-white" />
      <Products styles={styles} />
      <hr className="mt-5 text-white" />
      <Footer />
    </div>
  );
};

export default index;
