import { ProductSkeleton } from "../../components/Loaders";

const ProductList = ({ userData, ProductListing }) => {
  return (
    <div className='container'>
      <div className='row justify-content-center'>
        {!userData ? (
          <>
            {[...Array(4)].map((_, index) => (
              <div className='col-md-3 col-sm-6 my-3' key={index}>
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
