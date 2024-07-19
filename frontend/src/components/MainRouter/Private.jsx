import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Private = ({ children }) => {
  // const data = useSelector((state) => state.userData);
  const hasToken = localStorage.getItem("token");

  return hasToken ? children : <Navigate to='/login' />;
  // return children;
};

export default Private;
