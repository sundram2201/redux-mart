import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { AddProductAPI } from "../../../Utils/APIs";
import { useNavigate } from "react-router-dom";
import AddProductForm from "./AddProductForm";
import { hasToken } from "../../../Utils/HelperFunctions";
import Identifier from "../../../components/Identifier";

const index = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const navigate = useNavigate();
  const isLoggedIn = hasToken();

  const formik = useFormik({
    initialValues: { name: "", desc: "", price: "", category: "", image: [] },
    validationSchema: "",
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("desc", values.desc);
        formData.append("price", values.price);
        formData.append("category", values.category);

        selectedFiles.forEach((file) => formData.append("image", file));
        const res = await AddProductAPI(formData);
        if (res.status === 201) {
          toast.success(res?.data?.message);
          navigate("/");
        }
      } catch (error) {
        toast.error(error?.response?.data?.message, { id: "001" });
      }
    },
  });

  return (
    <>
      <p className='wlcm-head w-100 text-white' style={{ padding: "5rem 0 3rem 0" }}>
        Want to add your own <span>Product?</span>
      </p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <AddProductForm formik={formik} selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />
      </div>
    </>
  );
};

export default index;
