import { useFormik } from "formik";
import { LoginAPI } from "../../Utils/APIs";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../public/reduxMart-logo2.png";
import { useState } from "react";
import { SmCartLoader } from "../../components/Loaders";

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

  const { handleSubmit, values, handleChange } = formik;
  return (
    <>
      <p className='login-logo py-5'>
        <img src={logo} width={"20%"} style={{ mixBlendMode: "plus-lighter" }} />
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
          <div className='field'>
            <input
              value={values.password}
              onChange={(e) => handleChange(e)}
              name='password'
              placeholder='Password'
              className='input-field'
              type='password'
            />
          </div>
          <div className='btnn'>
            <button type='submit' className='login-btn'>
              {isLoading ? <SmCartLoader page='login' /> : "Submit"}
            </button>
          </div>
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
