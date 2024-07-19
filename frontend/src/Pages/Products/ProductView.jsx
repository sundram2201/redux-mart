const ProductView = () => {
  return (
    <div className='productContainer'>
      <div className='flexBox'>
        <p className='wlcm-head text-start ps-4 mb-3' style={{ paddingTop: "7rem" }}>
          <span>Product title will come here</span>
        </p>
        <div className='form' style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
            <div className='prodImg'>
              <div className='card-img'>
                <div className='img'></div>
              </div>
            </div>
            <div className='prodDesc text-start'>
              <p id='heading' className='text-start'>
                Product description. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Product description.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Product description. Lorem ipsum dolor sit
                amet, consectetur adipisicing elit. Product description. Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Product description. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Product
                description. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Product description. Lorem ipsum
                dolor sit amet, consectetur adipisicing elit. Product description. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Product description. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit. Product description. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Product
                description. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
              <hr className='my-4' />
              <div className='d-flex justify-content-between mx-5 my-3'>
                <p>Qty: 1</p>
                <p>Price: $123.45</p>
              </div>
              <hr className='my-4' />

              <div className='btnn'>
                <button type='submit' className='login-btn w-100'>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
