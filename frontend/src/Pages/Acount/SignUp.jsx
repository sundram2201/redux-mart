import { useFormik } from "formik";
import { SignupAPI } from "../../Utils/APIs";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../public/reduxMart-logo2.png";
import { useState } from "react";
import PasswordField from "../../components/PasswordField";
import SubmitButton from "../../components/SubmitButton";

const SignUp = () => {
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullname: "",
      username: "",
      email: "",
      contact: "",
      password: "",
    },
    validationSchema: "",
    onSubmit: async (values) => {
      try {
        setIsloading(true);
        const res = await SignupAPI(values);
        if (res.status === 201) {
          setIsloading(false);
          toast.success(res.data.message, { id: "loadingToastId" });
          navigate("/login");
        }
      } catch (err) {
        setIsloading(true);
        toast.error(err?.code === "ERR_NETWORK" ? "No internet" : err.response.data.message, { id: "loadingToastId" });
      }
    },
  });

  const { handleSubmit, values, handleChange } = formik;

  return (
    <>
      <p className='login-logo py-5'>
        <img src={logo} width={"20%"} style={{ mixBlendMode: "plus-lighter" }} />
      </p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form className='form' onSubmit={handleSubmit}>
          <p id='heading'>Create new Account</p>

          <div className='field'>
            <input
              value={values.fullname}
              name='fullname'
              onChange={(e) => handleChange(e)}
              autoComplete='off'
              placeholder='Full name'
              className='input-field'
              type='text'
            />
          </div>
          <div className='field'>
            <input
              value={values.username}
              name='username'
              onChange={(e) => handleChange(e)}
              autoComplete='off'
              placeholder='Username'
              className='input-field'
              type='text'
            />
          </div>
          <div className='field'>
            <input
              value={values.email}
              name='email'
              onChange={(e) => handleChange(e)}
              autoComplete='off'
              placeholder='Email'
              className='input-field'
              type='text'
            />
          </div>
          <div className='field'>
            <input
              value={values.contact}
              name='contact'
              onChange={(e) => handleChange(e)}
              autoComplete='off'
              placeholder='Contact No.'
              className='input-field'
              type='text'
            />
          </div>
          <div className='field' style={{ position: "relative" }}>
            <PasswordField values={values} handleChange={handleChange} />
          </div>

          <SubmitButton isLoading={isLoading} />
          <div className='crt-acnt-box'>
            Existing User?{" "}
            <Link to='/login' style={{ color: "rgb(122, 62, 246)" }} className='crt-acnt-link'>
              Login here
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
