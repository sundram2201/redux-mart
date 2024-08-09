import React, { useEffect, useState } from "react";

const CheckoutCard = ({ formik, userData, amount, setAmount }) => {
  let shippingCharges = 20.55;

  const { handleSubmit, values, handleChange } = formik;

  useEffect(() => {
    if (userData?.cartItems) {
      const total = userData.cartItems.reduce((acc, val) => acc + val.price, 0);
      setAmount({ subTotal: total, total: total + shippingCharges });
    }
  }, [userData?.cartItems]);

  return (
    <div className='card-body'>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <h5 className='mb-0'>Card details</h5>
      </div>

      <form className='mt-4 text-start' onSubmit={handleSubmit}>
        <div data-mdb-input-init className='form-outline form-white mb-4 '>
          <label className='form-label ' htmlFor='typeName'>
            Cardholder Name
          </label>
          <input
            name='name'
            value={values.name}
            onChange={(e) => handleChange(e)}
            type='text'
            id='typeName'
            className='form-control form-control-lg'
            size='17'
            placeholder="Cardholder's Name"
          />
        </div>

        <div data-mdb-input-init className='form-outline form-white mb-4'>
          <label className='form-label' htmlFor='typeNum'>
            Card Number
          </label>
          <input
            name='number'
            value={values.number}
            onChange={(e) => handleChange(e)}
            type='text'
            id='typeNum'
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
                name='expiration'
                value={values.expiration}
                onChange={(e) => handleChange(e)}
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
              <label className='form-label' htmlFor='typeCvv'>
                Cvv
              </label>
              <input
                name='cvv'
                value={values.cvv}
                onChange={(e) => handleChange(e)}
                type='password'
                id='typeCvv'
                className='form-control form-control-lg'
                placeholder='&#9679;&#9679;&#9679;'
                size='1'
                minLength='3'
                maxLength='3'
              />
            </div>
          </div>
        </div>

        <hr className='my-4' />

        <div className='d-flex justify-content-between'>
          <p className='mb-2'>Subtotal</p>
          <p className='mb-2'>${amount?.subTotal && amount?.subTotal}</p>
        </div>

        <div className='d-flex justify-content-between'>
          <p className='mb-2'>Shipping</p>
          <p className='mb-2'>{shippingCharges}</p>
        </div>

        <div className='d-flex justify-content-between mb-4'>
          <p className='mb-2'>Total (Incl. taxes)</p>
          <p className='mb-2'>${amount?.total && amount?.total.toFixed(2)}</p>
        </div>

        <hr className='my-4' />

        <div className='btnn d-flex justify-content-center'>
          <button className='login-btn'> Checkout</button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutCard;
