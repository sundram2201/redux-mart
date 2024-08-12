import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../../Pages/Home";
import Login from "../../Pages/Acount/Login.jsx";
import NotFound from "../404.jsx";
import Profile from "../../Pages/Acount/Profile.jsx";
import Cart from "../../Pages/Cart";
import Favourites from "../../Pages/Favourites";
import AddProduct from "../../Pages/Products/AddProduct";
import ProductView from "../../Pages/Products/ProductView.jsx";
import { Toaster } from "react-hot-toast";
import Private from "./PrivateRouting.jsx";
import Public from "./PublicRouting.jsx";
import SignUp from "../../Pages/Acount/SignUp.jsx";

const index = () => {
  return (
    <div>
      <BrowserRouter>
        <Toaster />

        <Routes>
          <Route
            path='/'
            element={
              <Public>
                <Home />{" "}
              </Public>
            }
          />
          <Route
            path='/product/:productId'
            element={
              <Public>
                <ProductView />
              </Public>
            }
          />
          <Route
            path='/profile'
            element={
              <Private>
                <Profile />
              </Private>
            }
          />
          <Route
            path='/add-product'
            element={
              <Private>
                <AddProduct />
              </Private>
            }
          />
          <Route
            path='/cart'
            element={
              <Private>
                <Cart />
              </Private>
            }
          />
          <Route
            path='/favourites'
            element={
              <Private>
                <Favourites />
              </Private>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default index;
