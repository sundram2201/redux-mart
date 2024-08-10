import React from "react";
import useUserData from "../../components/Hooks/useUserData";
import ProductList from "../Products/ProductList";

const index = () => {
  const data = useUserData();
  const favItems = data?.favItems;

  return <ProductList userData={data} filteredProducts={favItems} />;
};

export default index;
