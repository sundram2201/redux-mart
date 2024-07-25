import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "../../Pages/Products";
import Login from "../../Pages/Acount/Login.jsx";
import NotFound from "../404.jsx";
import Profile from "../../Pages/Acount/Profile.jsx";
import Cart from "../../Pages/Cart";
import AddProduct from "../../Pages/Products/AddProduct.jsx";
import ProductView from "../../Pages/Products/ProductView.jsx";
import { Toaster } from "react-hot-toast";
import Private from "./PrivateRouting.jsx";

const index = () => {
  return (
    <div>
      <BrowserRouter>
        <Toaster />

        <Routes>
          <Route
            path='/'
            element={
              <Private>
                <Products />
              </Private>
            }
          />
          <Route
            path='/product/:productId'
            element={
              <Private>
                <ProductView />
              </Private>
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
          <Route path='/login' element={<Login />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default index;
