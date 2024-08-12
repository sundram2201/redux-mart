import "./Products.css";
import Tab from "./Tab";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import useUserData from "../../components/Hooks/useUserData";
import { getAllProducts } from "../../Utils/HelperFunctions";

const index = () => {
  const [prodCate, setProdCate] = useState("");
  const [allProducts, setAllProducts] = useState({ loading: true, data: [] });
  const getProdCate = (value) => setProdCate(value);
  const userData = useUserData();

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
      <h1 className='text-start mb-5'>Shop By Category</h1>

      <Tab getProdCate={getProdCate} />
      <ProductList filteredProducts={filteredProducts} />
    </div>
  );
};

export default index;
