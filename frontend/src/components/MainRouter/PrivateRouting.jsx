import { Navigate } from "react-router-dom";
import Layout from "../Layout";
import ResLayout from "../ResLayout";

const Private = ({ children }) => {
  const hasToken = localStorage.getItem("token");

  return hasToken ? <Layout>{children}</Layout> : <Navigate to='/login' />;
  // return hasToken ? <ResLayout>{children}</ResLayout> : <Navigate to='/login' />;
};

export default Private;
