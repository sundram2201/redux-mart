import { useFormik } from "formik";
import { LoginAPI } from "../../Utils/APIs";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../components/Slices/UserSlice";
import logo from "../../../public/reduxMart-logo2.png";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [hasToken, setHasToken] = useState(null);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: "",
    onSubmit: async (values) => {
      const loadingToast = toast.loading("Loading...");
      try {
        const res = await LoginAPI(values);
        if (res.status === 200) {
          const token = res.data.token;
          localStorage.setItem("token", token);
          toast.dismiss(loadingToast);
          toast.success(res.data.message, { id: "loadingToastId" });
          navigate("/");
          dispatch(getUser(res.data));
        }
      } catch (err) {
        toast.dismiss(loadingToast);
        console.log();
        toast.error(err?.code === "ERR_NETWORK" ? "No internet" : err.response.data.message, { id: "loadingToastId" });
      }
    },
  });

  const { handleSubmit, values, handleChange, touched, errors } = formik;
  return (
    <>
      <p className='login-logo py-5'>
        {/* Welcome to <span>ReduxMart</span> */}
        <img src={logo} width={"20%"} />
      </p>
      <div style={{ display: "flex", justifyContent: "center" }}>
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
              Submit
            </button>
          </div>
          <div style={{ padding: "5px 10px" }}>
            <p style={{ margin: "0" }}>
              user : <b>redux_mart</b>
            </p>
            <p style={{ margin: "0" }}>
              pass : <b>123</b>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
