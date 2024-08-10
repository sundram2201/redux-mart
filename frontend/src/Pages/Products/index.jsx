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

  // const ProductListing = () => {
  //   return filteredProducts.length ? (
  //     filteredProducts.map((el, i) => {
  //       const isInCart = cartItems?.some((cartItem) => cartItem?._id === el?._id);
  //       const isInFav = favItems?.some((favItem) => favItem?._id === el?._id);

  //       return <ProductCard key={i} el={el} isInCart={isInCart} isInFav={isInFav} />;
  //     })
  //   ) : (
  //     <div className='text-center my-5 text-secondary fw-bold'>
  //       <i>No Product Found...</i>
  //     </div>
  //   );
  // };

  useEffect(() => {
    getAllProducts(setAllProducts);
  }, []);

  return (
    <div>
      <Tab getProdCate={getProdCate} />
      <ProductList userData={userData} filteredProducts={filteredProducts} />
    </div>
  );
};

export default index;
