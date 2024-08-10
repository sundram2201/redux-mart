import { useState } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import CheckoutCard from "./CheckoutCard";
import { PaymentAPI } from "../../Utils/APIs";
import { v4 as uuidv4 } from "uuid";
import PaymentSuccessful from "./PaymentSuccessful";
import useSmScreen from "../../components/Hooks/useSmSceen";
import CartList from "./CartList";

const index = () => {
  const [isLoading, setIsloading] = useState(false);
  const [amount, setAmount] = useState({ subTotal: 0, total: 0 });
  const [isPaymentDone, setIsPaymentDone] = useState(false);
  const isSmallScreen = useSmScreen();

  const userData = useSelector((state) => state.userData.data);
  const userId = userData?.user?._id;

  const formik = useFormik({
    initialValues: {
      name: "",
      number: "",
      expiration: "",
      cvv: "",
      orderId: uuidv4(),
    },
    validationSchema: "",
    onSubmit: async (values) => {
      const { cvv, orderId } = values;
      const allValues = { cvv, orderId, userId, amount: amount.total * 100 };

      try {
        const res = await PaymentAPI(allValues);
        if (res.status === 200) {
          setIsPaymentDone(true);
        }
      } catch (err) {
        err;
      }
    },
  });

  return (
    <section className='h-100 h-custom'>
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
                    <CartList data={{ userData, isSmallScreen, isLoading, setIsloading }} />
                  </div>
                  <div className='col-lg-5'>
                    <div
                      className='card bg-primary text-white rounded-3 payment-card'
                      style={{ padding: isSmallScreen && 0 }}>
                      <CheckoutCard formik={formik} amount={amount} setAmount={setAmount} userData={userData} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isPaymentDone && <PaymentSuccessful />}
    </section>
  );
};

export default index;
