import { Navigate } from "react-router-dom";
import Layout from "../Layouts";
import { hasToken } from "../../Utils/HelperFunctions";

const Private = ({ children }) => {
  const isLoggedIn = hasToken();

  return isLoggedIn ? <Layout>{children}</Layout> : <Navigate to="/login" />;
};

export default Private;
