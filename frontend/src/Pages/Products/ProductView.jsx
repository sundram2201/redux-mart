import { useEffect, useState } from "react";
import { GetProdByIdAPI } from "../../Utils/APIs";
import { SmCartLoader, TruckLoader } from "../../components/Loaders";
import SellIcon from "@mui/icons-material/Sell";
import { useDispatch } from "react-redux";
import { HandleCartAction } from "../../Utils/ProductEvents/HandleCart";
import { useNavigate } from "react-router-dom";
import useUserData from "../../Hooks/User";

export const GetProdById = async (setProdData, productID) => {
  setProdData({ loading: true });

  try {
    const res = await GetProdByIdAPI(productID);
    if (res.status == 200) {
      setProdData({ data: res.data.data, loading: false });
    }
  } catch (err) {
    setProdData({ loading: false });
  }
};

const ProductView = () => {
  const [isLoading, setIsloading] = useState(false);
  const [prodData, setProdData] = useState({ loading: false, data: null });
  const userData = useUserData();
  const userId = userData?.user?._id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productID = window.location.href.split("/").at(-1);

  const CartBtn = () => {
    const isInCart = userData?.cartItems.some((item) => {
      return item?._id === productID;
    });
    return (
      <button
        type='submit'
        style={{ width: "90%" }}
        onClick={(e) =>
          isInCart
            ? HandleCartAction(e, "delete", prodData?.data, userId, { dispatch, navigate, setIsloading }, "view")
            : HandleCartAction(e, "add", prodData?.data, userId, { dispatch, navigate, setIsloading }, "view")
        }
        className={`login-btn ${isInCart && "rmv-btn"}`}>
        {isLoading ? <SmCartLoader /> : (isInCart ? "Remove from" : "Add to") + ` cart`}
      </button>
    );
  };

  useEffect(() => {
    GetProdById(setProdData, productID);
  }, []);

  return !prodData?.data ? (
    <div className='text-white d-flex justify-content-center align-items-center vh-100'>
      <TruckLoader />
    </div>
  ) : (
    <div className='productContainer'>
      <div className='flexBox'>
        <p
          className='wlcm-head w-100 text-start px-4 mb-3 d-flex justify-content-between align-items-center'
          style={{ paddingTop: "7rem" }}>
          <span>{prodData?.data?.name}</span>
          <p className=' text-secondary' style={{ float: "right", fontSize: "18px" }}>
            <SellIcon fontSize='small' /> {prodData?.data?.category}
          </p>
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
                {prodData?.data?.desc}
              </p>
              <hr className='my-4' />
              <div className='d-flex justify-content-between mx-5 my-3 text-white'>
                <p>
                  Qty: <b>1</b>
                </p>
                <p>
                  Price: <b>${prodData?.data?.price} </b>
                </p>
              </div>
              <hr className='my-4' />

              <div className='btnn d-flex justify-content-center align-items-center'>
                <CartBtn />
                <div className='con-like ms-4 ' onClick={(e) => HandleAddFav(e, el)}>
                  <input className='like' type='checkbox' title='like' />
                  {/* <div className='checkmark'>
                    <svg xmlns='http://www.w3.org/2000/svg' className='outline' viewBox='0 0 24 24'>
                      <path d='M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z'></path>
                    </svg>
                    <svg xmlns='http://www.w3.org/2000/svg' className='filled' viewBox='0 0 24 24'>
                      <path d='M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z'></path>
                    </svg>
                    <svg xmlns='http://www.w3.org/2000/svg' height='100' width='100' className='celebrate'>
                      <polygon className='poly' points='10,10 20,20'></polygon>
                      <polygon className='poly' points='10,50 20,50'></polygon>
                      <polygon className='poly' points='20,80 30,70'></polygon>
                      <polygon className='poly' points='90,10 80,20'></polygon>
                      <polygon className='poly' points='90,50 80,50'></polygon>
                      <polygon className='poly' points='80,80 70,70'></polygon>
                    </svg>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
