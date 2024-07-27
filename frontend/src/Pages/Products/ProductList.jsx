import { GetAllProductAPI } from "../../Utils/APIs";
import { useEffect, useState } from "react";
import { ProductSkeleton } from "../../components/Loaders";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

export const getAllProducts = async (setAllProducts) => {
  try {
    setAllProducts({ loading: true, data: [] });
    const res = await GetAllProductAPI();
    if (res.status === 200) {
      setAllProducts({ loading: false, data: res.data.data });
    }
  } catch (err) {
    setAllProducts({ loading: false, data: [] });
  }
};
const ProductList = ({ prodCate }) => {
  const [allProducts, setAllProducts] = useState({ loading: true, data: [] });
  const cartItems = useSelector((state) => state.userData?.data?.cartItems);
  console.log(cartItems, ">?cartItems");

  const filteredProducts = allProducts?.data.filter((el) => {
    if (!prodCate) {
      return allProducts?.data;
    }
    return el.category === prodCate;
  });

  const ProductListing = () => {
    return filteredProducts.length ? (
      filteredProducts.map((el, i) => {
        const isInCart = cartItems?.some((cartItem) => cartItem?._id === el?._id);

        return <ProductCard key={i} el={el} isInCart={isInCart} setAllProducts={setAllProducts} />;
      })
    ) : (
      <div className='text-center my-5 text-secondary fw-bold'>
        <i>No Product Found...</i>
      </div>
    );
  };

  useEffect(() => {
    getAllProducts(setAllProducts);
  }, []);

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        {allProducts?.loading && !allProducts?.data?.length ? (
          <>
            {[...Array(4)].map((_, index) => (
              <div className='col-md-3 my-3' key={index}>
                <ProductSkeleton />
              </div>
            ))}
          </>
        ) : (
          <ProductListing />
        )}
      </div>
    </div>
  );
};

export default ProductList;
