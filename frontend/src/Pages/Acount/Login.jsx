import { useFormik } from "formik";
import { LoginAPI } from "../../Utils/APIs";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../public/reduxMart-logo2.png";
import { useState } from "react";

import PasswordField from "../../components/PasswordField";
import SubmitButton from "../../components/SubmitButton";
import { useMediaQuery } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: "",
    onSubmit: async (values) => {
      try {
        setIsloading(true);
        const res = await LoginAPI(values);
        if (res.status === 200) {
          setIsloading(false);
          const token = res.data.token;
          localStorage.setItem("token", token);
          toast.success(res.data.message, { id: "loadingToastId" });
          navigate("/");
        }
      } catch (err) {
        setIsloading(false);
        toast.error(err?.code === "ERR_NETWORK" ? "No internet" : err.response.data.message, { id: "loadingToastId" });
      }
    },
  });

  const isSmallScreen = useMediaQuery("(max-width: 599px)");

  const { handleSubmit, values, handleChange } = formik;
  return (
    <>
      <p className='login-logo py-5'>
        <img src={logo} style={{ mixBlendMode: "plus-lighter", width: isSmallScreen ? "100%" : "" }} />
      </p>
      <div className='d-flex justify-content-center'>
        <form className='form' onSubmit={handleSubmit}>
          <p id='heading'>Login</p>
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
          <div className='field' style={{ position: "relative" }}>
            <PasswordField values={values} handleChange={handleChange} />
          </div>

          <SubmitButton isLoading={isLoading} />
          <div className='crt-acnt-box'>
            New to ReduxMart?{" "}
            <Link to='/signup' style={{ color: "rgb(122, 62, 246)" }} className='crt-acnt-link'>
              Create Account
            </Link>
          </div>
          {/* <hr style={{ borderColor: "red" }} />
          <div className='crt-acnt-box'>
            <p style={{ margin: "0" }}>
              user : <b>redux_mart</b>
            </p>
            <p style={{ margin: "0" }}>
              pass : <b>123</b>
            </p>
          </div> */}
        </form>
      </div>
    </>
  );
};

export default Login;
