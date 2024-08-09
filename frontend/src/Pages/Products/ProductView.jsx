import React, { useEffect, useState } from "react";
import { GetProdByIdAPI } from "../../Utils/APIs";
import { SmCartLoader, TruckLoader } from "../../components/Loaders";
import SellIcon from "@mui/icons-material/Sell";
import { useDispatch } from "react-redux";
import { HandleCartAction } from "../../Utils/ProductEvents/HandleCart";
import { useNavigate } from "react-router-dom";
import useUserData from "../../Hooks/User";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { BaseUrl } from "../../Utils/APIs/BaseUrl";
import { useMediaQuery } from "@mui/material";

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
        style={{ width: "100%" }}
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

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  // const CustomDot = ({ img, onClick, ...rest }) => {
  //   const {
  //     onMove,
  //     index,
  //     active,
  //     carouselState: { currentSlide, deviceType },
  //   } = rest;
  //   const carouselItems = ["*", "*", "*"];

  //   console.log(img, "prodDataddd");
  //   return (
  //     <FiberManualRecordIcon
  //       className={active ? "active" : "inactive"}
  //       style={{
  //         color: active ? "white" : "rgba(255,255,255,0.3)",
  //         fontSize: "small",
  //       }}
  //       onClick={(e) => onClick(e)}>
  //       {React.Children.toArray(carouselItems)[index]}
  //     </FiberManualRecordIcon>
  //   );
  // };

  const CustomDot = ({ onClick, active, index, img }) => {
    const imageUrl = getImageUrl(img[index]);
    return (
      <div
        onClick={onClick}
        className={`custom-dot ${active ? "active" : ""}`}
        style={{
          cursor: "pointer",
          position: "relative",
          border: active ? "2px solid #b700ff" : "2px solid gray",
          padding: "2px",
          margin: "3px",
        }}>
        <div
          className='overlay'
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: "0",
            right: "0",
            background: active ? "transparent" : "rgba(255,255,255,0.3)",
          }}></div>
        <img src={imageUrl} alt={`Thumbnail ${index}`} style={{ width: 50, height: 50 }} />
      </div>
    );
  };

  function getImageUrl(url) {
    const fixUrl = `${BaseUrl}/uploads/`;
    return fixUrl + url.split("/").at(-1);
  }

  useEffect(() => {
    GetProdById(setProdData, productID);
  }, []);
  const isSmallScreen = useMediaQuery("(max-width: 599px)");

  return !prodData?.data ? (
    <div className='text-white d-flex justify-content-center align-items-center vh-100'>
      <TruckLoader />
    </div>
  ) : (
    <div className='productContainer' style={{ width: isSmallScreen && "100%" }}>
      <div className='flexBox'>
        <div className={`form ${!isSmallScreen && "container"}`} style={{ boxShadow: isSmallScreen && "unset" }}>
          <div className='row w-100'>
            <div className='col-md-6 prodDesc'>
              <div className='h-100' style={{ width: "80%", margin: "0 auto", alignContent: "space-evenly" }}>
                <Carousel
                  className='product-view-carousel'
                  arrows={isSmallScreen ? false : true}
                  showDots
                  customDot={<CustomDot img={prodData?.data?.image} />}
                  responsive={responsive}
                  infinite={true}>
                  {prodData?.data?.image.map((el, i) => {
                    const imageUrl = getImageUrl(el);
                    return <img src={imageUrl} className='img-fluid-view' />;
                  })}
                </Carousel>
              </div>
            </div>

            <div className={`col-md-6 prodDesc ${!isSmallScreen && "p-5 ms-3"} p-4 text-start`}>
              <div>
                <p className='wlcm-head w-100 text-start  mb-3'>
                  <span>{prodData?.data?.name}</span>{" "}
                  <p className=' text-secondary d-block' style={{ fontSize: "18px" }}>
                    <SellIcon fontSize='small' /> {prodData?.data?.category}
                  </p>
                </p>
              </div>
              <p id='heading' className='text-start' style={{ height: "40vh", overflow: "auto" }}>
                {prodData?.data?.desc}
              </p>
              <hr className='my-4 text-white' />
              <div className='d-flex justify-content-between mx-5 my-3 text-white'>
                <p>
                  Qty: <b>1</b>
                </p>
                <p>
                  Price: <b>${prodData?.data?.price} </b>
                </p>
              </div>
              <hr className='my-4 text-white' />

              <div className='btnn d-flex justify-content-center align-items-center'>
                <CartBtn />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
