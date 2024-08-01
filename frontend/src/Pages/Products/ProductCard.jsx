import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import SellIcon from "@mui/icons-material/Sell";
import { HandleCartAction } from "../../Utils/ProductEvents/HandleCart";
import { HandleFavAction } from "../../Utils/ProductEvents/HandleFav";
import { SmCartLoader } from "../../components/Loaders";
import useUserData from "../../Hooks/User";

const ProductCard = ({ el, i, isInCart, isInFav }) => {
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useUserData();
  const userId = userData?.user?._id;

  const ShortDesc = (val) => {
    if (val.length > 80) {
      return val.slice(0, 80) + "...";
    } else {
      return val;
    }
    e;
  };

  const HandleFavourites = (e, el) => {
    let actionType = Boolean();
    if (e.target.checked) {
      actionType = "add";
    } else {
      actionType = "delete";
    }
    HandleFavAction(actionType, el, userId, { dispatch, navigate }, "fav");
  };

  const CartActionButton = () => {
    return isInCart ? (
      <button
        className='card-btn sub-icon'
        onClick={(e) => {
          HandleCartAction(e, "delete", el, userId, { dispatch, navigate, setIsloading }, "product");
        }}>
        {isLoading ? (
          <SmCartLoader />
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className='bi bi-cart-dash'
            viewBox='0 0 16 16'>
            <path d='M6.5 7a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1z' />
            <path d='M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0' />
          </svg>
        )}
      </button>
    ) : (
      <button
        className='card-btn plus-icon'
        onClick={(e) => HandleCartAction(e, "add", el, userId, { dispatch, navigate, setIsloading }, "product")}>
        {isLoading ? (
          <SmCartLoader />
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className='bi bi-cart-plus'
            viewBox='0 0 16 16'>
            <path d='M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z' />
            <path d='M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0' />
          </svg>
        )}
      </button>
    );
  };

  return (
    <div
      key={i}
      style={{ cursor: "pointer" }}
      onClick={(e) => {
        if (e.target.type !== "checkbox") {
          navigate(`/product/${el?._id}`);
        }
      }}
      className='col-md-3 my-3'>
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
          <div
            className='con-like'
            onClick={(e) => {
              // !isInFav;
              HandleFavourites(e, el);
            }}>
            <input className='like' type='checkbox' defaultChecked={isInFav} title='like' />
            <div className='checkmark'>
              <svg xmlns='http://www.w3.org/2000/svg' className='outline' viewBox='0 0 24 24'>
                <path d='M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z'></path>
              </svg>
              <svg xmlns='http://www.w3.org/2000/svg' className='filled' viewBox='0 0 24 24'>
                <path d='M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z'></path>
              </svg>
            </div>
          </div>
          <CartActionButton />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
