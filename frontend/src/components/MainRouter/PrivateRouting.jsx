import { Navigate } from "react-router-dom";
import Layout from "../Layouts";
import toast from "react-hot-toast";

const Private = ({ children }) => {
  const hasToken = localStorage.getItem("token");

  return hasToken ? <Layout>{children}</Layout> : <Navigate to='/login' />;
};

export default Private;
