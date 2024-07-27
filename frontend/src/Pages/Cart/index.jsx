import { GetCartListAPI } from "../../Utils/APIs";
import { useEffect, useState } from "react";
import { TruckLoader } from "../../components/Loaders";
import { HandleCartAction } from "../../Utils/ProductEvents/HandleCart";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// export const getCartList = async (setCartData) => {
//   try {
//     setCartData({ loading: true });

//     const res = await GetCartListAPI();
//     if (res.status === 200) {
//       setCartData({ loading: false, data: res.data.data });
//     } else {
//       setCartData({ loading: false, data: [] });
//     }
//   } catch (err) {
//     setCartData({ loading: false });
//   }
// };

const index = () => {
  const [cartData, setCartData] = useState({ loading: false, data: null });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData.data);
  const userId = userData?.user?._id;

  function truncateText(text, maxLength = 60) {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.slice(0, maxLength - 3) + "...";
    }
  }

  // useEffect(() => {
  //   getCartList(setCartData);
  // }, []);

  return (
    <div>
      <section className='h-100 h-custom' style={{ paddingTop: "7rem" }}>
        <div className='container py-5 h-100'>
          <div className='row d-flex justify-content-center align-items-center h-100'>
            <div className='col'>
              <div className='card'>
                <div className='card-body p-4'>
                  <div className='row'>
                    <div className='col-lg-7'>
                      <h5 className='mb-3 text-start'>
                        <i className='fas fa-long-arrow-alt-left me-2'></i>My Cart
                      </h5>
                      <hr />
                      {userData ? (
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
                              return (
                                <div key={i} className='card mb-3'>
                                  <div className='card-body'>
                                    <div className='d-flex justify-content-between'>
                                      <div className='d-flex flex-row align-items-center'>
                                        <div>
                                          <img
                                            src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp'
                                            className='img-fluid rounded-3'
                                            alt='Shopping item'
                                            style={{ width: "65px" }}
                                          />
                                        </div>
                                        <div className='ms-3 text-start'>
                                          <h5>{el?.name}</h5>
                                          <p className='small mb-0'>{truncateText(el?.desc)}</p>
                                        </div>
                                      </div>
                                      <div className='d-flex flex-row align-items-center'>
                                        <div style={{ width: "80px" }}>
                                          <h5 className='mb-0'>${el?.price}</h5>
                                        </div>
                                        <button
                                          className='del-btn'
                                          onClick={(e) =>
                                            HandleCartAction(
                                              e,
                                              "delete",
                                              el,
                                              userId,
                                              { dispatch, navigate, setCartData },
                                              "cart"
                                            )
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
                      )}
                    </div>
                    <div className='col-lg-5'>
                      <div className='card bg-primary text-white rounded-3 payment-card'>
                        <div className='card-body'>
                          <div className='d-flex justify-content-between align-items-center mb-4'>
                            <h5 className='mb-0'>Card details</h5>
                            <img
                              src='https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp'
                              className='img-fluid rounded-3'
                              style={{ width: "45px" }}
                              alt='Avatar'
                            />
                          </div>

                          <form className='mt-4 text-start'>
                            <div data-mdb-input-init className='form-outline form-white mb-4 '>
                              <label className='form-label ' htmlFor='typeName'>
                                Cardholder Name
                              </label>
                              <input
                                type='text'
                                id='typeName'
                                className='form-control form-control-lg'
                                size='17'
                                placeholder="Cardholder's Name"
                              />
                            </div>

                            <div data-mdb-input-init className='form-outline form-white mb-4'>
                              <label className='form-label' htmlFor='typeText'>
                                Card Number
                              </label>
                              <input
                                type='text'
                                id='typeText'
                                className='form-control form-control-lg'
                                size='17'
                                placeholder='1234 5678 9012 3457'
                                minLength='19'
                                maxLength='19'
                              />
                            </div>

                            <div className='row mb-4'>
                              <div className='col-md-6'>
                                <div data-mdb-input-init className='form-outline form-white'>
                                  <label className='form-label' htmlFor='typeExp'>
                                    Expiration
                                  </label>
                                  <input
                                    type='text'
                                    id='typeExp'
                                    className='form-control form-control-lg'
                                    placeholder='MM/YYYY'
                                    size='7'
                                    minLength='7'
                                    maxLength='7'
                                  />
                                </div>
                              </div>
                              <div className='col-md-6'>
                                <div data-mdb-input-init className='form-outline form-white'>
                                  <label className='form-label' htmlFor='typeText'>
                                    Cvv
                                  </label>
                                  <input
                                    type='password'
                                    id='typeText'
                                    className='form-control form-control-lg'
                                    placeholder='&#9679;&#9679;&#9679;'
                                    size='1'
                                    minLength='3'
                                    maxLength='3'
                                  />
                                </div>
                              </div>
                            </div>
                          </form>

                          <hr className='my-4' />

                          <div className='d-flex justify-content-between'>
                            <p className='mb-2'>Subtotal</p>
                            <p className='mb-2'>$4798.00</p>
                          </div>

                          <div className='d-flex justify-content-between'>
                            <p className='mb-2'>Shipping</p>
                            <p className='mb-2'>$20.00</p>
                          </div>

                          <div className='d-flex justify-content-between mb-4'>
                            <p className='mb-2'>Total (Incl. taxes)</p>
                            <p className='mb-2'>$4818.00</p>
                          </div>

                          <hr className='my-4' />

                          <div className='btnn'>
                            <button className='login-btn'> Checkout</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default index;
