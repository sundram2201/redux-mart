import { ProductSkeleton } from "../../components/Loaders";
import { ProductListing } from "../../Utils/HelperFunctions";

const ProductList = ({ filteredProducts }) => {
  return (
    <div className='container'>
      <div className='row justify-content-center'>
        {!filteredProducts?.length ? (
          <>
            {[...Array(4)].map((_, index) => (
              <div className='col-md-3 col-sm-6 my-3' key={index}>
                <ProductSkeleton />
              </div>
            ))}
          </>
        ) : (
          ProductListing(filteredProducts)
        )}
      </div>
    </div>
  );
};

export default ProductList;
