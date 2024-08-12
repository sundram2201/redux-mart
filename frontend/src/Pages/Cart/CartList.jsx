import React from "react";
import { getImageUrl, HandleCartAction } from "../../Utils/HelperFunctions";
import { SmCartLoader, TruckLoader } from "../../components/Loaders";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CartList = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData, isSmallScreen, isLoading, setIsloading } = data;

  const userId = userData?.user?._id;

  console.log(userId, "?userId", userData);

  const truncateText = (text, maxLength = 60) =>
    text.length <= maxLength ? text : `${text.slice(0, maxLength - 3)}...`;

  return userData ? (
    <>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <div>
          <p className='mb-0'>You have {userData?.cartItems?.length || 0} items in your cart</p>
        </div>
      </div>
      {!userData?.cartItems ? (
        <div className='text-center my-5 text-secondary fw-bold'>
          <i>Nothing in your cart...</i>
        </div>
      ) : (
        userData?.cartItems?.map((el, i) => {
          const imageUrl = getImageUrl(el.image[0]);

          return (
            <div key={i} className='card mb-3'>
              <div className='card-body'>
                <div className={`${!isSmallScreen && "d-flex justify-content-between"}`}>
                  <div className={`${!isSmallScreen && "d-flex flex-row align-items-center"}`}>
                    <div>
                      <img
                        key={i}
                        src={imageUrl}
                        className='img-fluid rounded-3'
                        alt='Shopping item'
                        style={{ width: !isSmallScreen && "80px", height: !isSmallScreen && "80px" }}
                      />
                    </div>
                    <div className='ms-3 text-start'>
                      <h5>{el?.name}</h5>
                      <p className='small mb-0'>{truncateText(el?.desc)}</p>
                    </div>
                  </div>
                  <div
                    className={`d-flex flex-row align-items-center ${isSmallScreen && "mt-2 justify-content-between"}`}>
                    <div style={{ width: "80px" }}>
                      <h5 className='mb-0'>${el?.price}</h5>
                    </div>
                    {isLoading ? (
                      <SmCartLoader page='cart' />
                    ) : (
                      <button
                        className='del-btn'
                        onClick={(e) =>
                          HandleCartAction(e, "delete", el, userId, { dispatch, navigate, setIsloading }, "cart")
                        }>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          fill='currentColor'
                          className='bi bi-trash-fill'
                          viewBox='0 0 16 16'>
                          <path d='M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0' />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </>
  ) : (
    <div className='d-flex justify-content-center align-items-center h-100'>
      <TruckLoader />
    </div>
  );
};

export default CartList;
