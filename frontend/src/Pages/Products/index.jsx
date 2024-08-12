import "./Products.css";
import Tab from "./Tab";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import useUserData from "../../components/Hooks/useUserData";
import { getAllProducts } from "../../Utils/HelperFunctions";
import AnimatedText from "../../components/Animations";

const index = ({ styles, isSMallScreen }) => {
  const [prodCate, setProdCate] = useState("");
  const [allProducts, setAllProducts] = useState({ loading: true, data: [] });
  const getProdCate = (value) => setProdCate(value);
  const textPartsCategory = [{ text: "Shop by category", style: styles.newArrivalsHeading }];

  const filteredProducts = allProducts?.data.filter((el) => {
    if (!prodCate) {
      return allProducts?.data;
    }
    return el.category === prodCate;
  });

  useEffect(() => {
    getAllProducts(setAllProducts);
  }, []);

  return (
    <div>
      <h1 className={isSMallScreen ? "text-center mb-3" : "text-start mb-5"}>
        <AnimatedText parts={textPartsCategory} />
      </h1>
      <Tab getProdCate={getProdCate} />
      <ProductList filteredProducts={filteredProducts} />
    </div>
  );
};

export default index;
