import "./Products.css";
import Tab from "./Tab";
import ProductList from "./ProductList";
import { useSelector } from "react-redux";
import { useState } from "react";

const index = () => {
  const [prodCate, setProdCate] = useState("");

  const getProdCate = (value) => {
    return setProdCate(value);
  };

  return (
    <div style={{ padding: "7rem" }}>
      <Tab getProdCate={getProdCate} />
      <ProductList prodCate={prodCate} />
    </div>
  );
};

export default index;
