import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AddToCartAPI } from "../../Utils/APIs";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import toast from "react-hot-toast";
import SellIcon from "@mui/icons-material/Sell";
import { HandleAddCart } from "../../Utils/ProductEvents/HandleCart";

const ProductCard = ({ el, i }) => {
  const [isAdded, setIsAdded] = useState(false);
  const navigate = useNavigate();
  const userId = useSelector((state) => state.userData.data?.user?._id);

  const ShortDesc = (val) => {
    if (val.length > 80) {
      return val.slice(0, 80) + "...";
    } else {
      return val;
    }
  };

  // cartInfo?.foreach((ele) => {
  //   if (ele?._id === el?._id) {
  //     setIsAdded(true);
  //   } else {
  //     setIsAdded(false);
  //   }
  // });

  return (
    <div key={i} style={{ cursor: "pointer" }} onClick={() => navigate(`/product/${el._id}`)} className='col-md-3 my-3'>
      <div className='prod-card'>
        <span className='text-secondary text-end' style={{ fontSize: "14px" }}>
          <SellIcon fontSize='1px' /> {el.category}
        </span>

        <div className='card-img'>
          <div className='img'></div>
        </div>
        <div className='card-title'>{el.name}</div>
        <div className='card-subtitle'>{ShortDesc(el.desc)}</div>
        <hr className='card-divider' />
        <div className='card-footer'>
          <div className='card-price'>
            <span>$</span> {el.price}
          </div>
          <div className='con-like' onClick={(e) => HandleAddFav(e, el)}>
            <input className='like' type='checkbox' title='like' />
            <div className='checkmark'>
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
            </div>
          </div>
          <button className='card-btn' onClick={(e) => HandleAddCart(e, el, userId)}>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
              <path d='m397.78 316h-205.13a15 15 0 0 1 -14.65-11.67l-34.54-150.48a15 15 0 0 1 14.62-18.36h274.27a15 15 0 0 1 14.65 18.36l-34.6 150.48a15 15 0 0 1 -14.62 11.67zm-193.19-30h181.25l27.67-120.48h-236.6z'></path>
              <path d='m222 450a57.48 57.48 0 1 1 57.48-57.48 57.54 57.54 0 0 1 -57.48 57.48zm0-84.95a27.48 27.48 0 1 0 27.48 27.47 27.5 27.5 0 0 0 -27.48-27.47z'></path>
              <path d='m368.42 450a57.48 57.48 0 1 1 57.48-57.48 57.54 57.54 0 0 1 -57.48 57.48zm0-84.95a27.48 27.48 0 1 0 27.48 27.47 27.5 27.5 0 0 0 -27.48-27.47z'></path>
              <path d='m158.08 165.49a15 15 0 0 1 -14.23-10.26l-25.71-77.23h-47.44a15 15 0 1 1 0-30h58.3a15 15 0 0 1 14.23 10.26l29.13 87.49a15 15 0 0 1 -14.23 19.74z'></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
