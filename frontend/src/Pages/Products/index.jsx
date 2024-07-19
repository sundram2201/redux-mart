import "./Products.css";
import Tab from "./Tab";
import ProductList from "./ProductList";
import { useSelector } from "react-redux";

const index = () => {
  const userData = useSelector((state) => state.userData);

  return (
    <div style={{ padding: "7rem" }}>
      <Tab />
      <ProductList />
    </div>
  );
};

export default index;
