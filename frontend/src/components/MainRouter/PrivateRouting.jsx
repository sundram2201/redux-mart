import { Navigate } from "react-router-dom";
import Layout from "../Layout";

const Private = ({ children }) => {
  const hasToken = localStorage.getItem("token");

  return hasToken ? <Layout>{children}</Layout> : <Navigate to='/login' />;
};

export default Private;
