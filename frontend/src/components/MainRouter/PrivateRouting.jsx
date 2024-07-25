import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Layout from "../Layout";

const Private = ({ children }) => {
  // const data = useSelector((state) => state.userData);
  const hasToken = localStorage.getItem("token");

  return hasToken ? <Layout>{children}</Layout> : <Navigate to='/login' />;
  // return children;
};

export default Private;
