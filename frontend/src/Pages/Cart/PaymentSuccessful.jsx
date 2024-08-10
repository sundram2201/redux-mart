import React from "react";
import animationData from "../../../public/order-complete-anim.json";
import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";

const defaultOptions = {
  speed: 0.9,
  loop: false,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const PaymentSuccessful = () => {
  const navigate = useNavigate();
  return (
    <div className='con-box'>
      <span className='con-span'>
        <Lottie options={defaultOptions} height={400} width={400} />
        <h3>Your order is confirmed!</h3>
        <h6 className='thanks-msg'>
          Thanks for choosing <span className=''>ReduxMart</span>
        </h6>
        <button className='con-shop-btn mt-3' onClick={() => navigate("/")}>
          Continue Shopping
        </button>
      </span>
    </div>
  );
};

export default PaymentSuccessful;
