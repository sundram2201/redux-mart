import { Link, useNavigate } from "react-router-dom";
import logo from "../../public/reduxMart-logo2.png";

const Navbar = () => {
  const navigate = useNavigate();
  const hasToken = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return hasToken ? (
    <div>
      <nav
        className='navbar navbar-expand-lg px-4 fixed-top'
        style={{
          boxShadow: "0px 2px 28px rgba(0,0,0,0.4)",
          background: "rgba(255,255,255,0.1)",
          color: "white",
          backdropFilter: "blur(5px)",
        }}>
        <Link to='/' className='navbar-brand wlcm-head'>
          <img src={logo} alt='reduxMart logo' />
          {/* <span>redux</span> */}
        </Link>

        <div className='collapse navbar-collapse justify-content-between' id='navbarSupportedContent'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item active'>
              <Link to='/' className='nav-link menu__link'>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/profile' className='nav-link menu__link'>
                My Profile
              </Link>
            </li>
            <li className='nav-item active'>
              <Link to='/' className='nav-link menu__link'>
                Cart
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/add-product' className='nav-link menu__link'>
                Add Product
              </Link>
            </li>
          </ul>
          <div className=''>
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item'>Hello, Sundram</li>
              <li className='nav-item'>
                <button data-quantity='0' className='btn-cart' onClick={() => navigate("/cart")}>
                  <svg
                    className='icon-cart'
                    viewBox='0 0 24.38 30.52'
                    height='30.52'
                    width='24.38'
                    xmlns='http://www.w3.org/2000/svg'>
                    <title>icon-cart</title>
                    <path
                      transform='translate(-3.62 -0.85)'
                      d='M28,27.3,26.24,7.51a.75.75,0,0,0-.76-.69h-3.7a6,6,0,0,0-12,0H6.13a.76.76,0,0,0-.76.69L3.62,27.3v.07a4.29,4.29,0,0,0,4.52,4H23.48a4.29,4.29,0,0,0,4.52-4ZM15.81,2.37a4.47,4.47,0,0,1,4.46,4.45H11.35a4.47,4.47,0,0,1,4.46-4.45Zm7.67,27.48H8.13a2.79,2.79,0,0,1-3-2.45L6.83,8.34h3V11a.76.76,0,0,0,1.52,0V8.34h8.92V11a.76.76,0,0,0,1.52,0V8.34h3L26.48,27.4a2.79,2.79,0,0,1-3,2.44Zm0,0'></path>
                  </svg>
                  <span className='quantity'></span>
                </button>
              </li>

              <li className='nav-item'>
                <button onClick={() => handleLogout()}>Logout</button>
              </li>
            </ul>
          </div>
          {/* <form className='form-inline my-2 my-lg-0'>
         <input className='form-control mr-sm-2' type='search' placeholder='Search' aria-label='Search' />
         <button className='btn btn-outline-success my-2 my-sm-0' type='submit'>
           Search
         </button>
       </form> */}
        </div>
      </nav>
    </div>
  ) : (
    ""
  );
};

export default Navbar;
