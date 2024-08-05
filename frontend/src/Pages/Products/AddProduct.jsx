import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { AddProductAPI } from "../../Utils/APIs";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../../components/SubmitButton";

const AddProduct = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const navigate = useNavigate();

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

  const handleFilechange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const RenderImagePreviews = () => {
    return selectedFiles?.map((file) => {
      return <li>{file.name}</li>;
    });
  };

  const { handleChange, handleSubmit, values, errors } = formik;

  return (
    <>
      <p className='wlcm-head w-100 text-white' style={{ padding: "5rem 0 3rem 0" }}>
        Want to add your own <span>Product?</span>
      </p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form className='form' onSubmit={handleSubmit}>
          <p id='heading'>Add here!</p>
          <div className='d-flex'>
            <div className='field'>
              <input
                name='name'
                value={values.name}
                onChange={handleChange}
                autoComplete='off'
                placeholder='Product name'
                className='input-field'
                type='text'
              />
            </div>

            <div className='field'>
              <input
                name='price'
                value={values.price}
                onChange={handleChange}
                autoComplete='off'
                placeholder='Product price'
                className='input-field'
                type='text'
              />
            </div>
          </div>

          <div className='field'>
            <textarea
              name='desc'
              value={values.desc}
              onChange={handleChange}
              autoComplete='off'
              placeholder='Product description'
              className='input-field'
              rows='6'
              cols='50'
              type='text'></textarea>
          </div>

          <label style={{ margin: "0.5rem 2rem" }} className='text-start text-white '>
            Choose category :
          </label>
          <div className='radio-input' style={{ margin: "0.5rem 2rem" }}>
            {["men", "women", "kids"].map((el, i) => {
              return (
                <>
                  <input onChange={handleChange} name='category' value={el} id={`value-${i + 1}`} type='radio' />
                  <label htmlFor={`value-${i + 1}`}>{el}</label>
                </>
              );
            })}
          </div>

          <div className=''>
            <input
              id='profileImage'
              type='file'
              accept='image/png, image/jpeg, image/jpg'
              name='image'
              className='form-control'
              onChange={handleFilechange}
              hidden={true}
              multiple
            />
            <div className='text-danger'>{errors.image}</div>
          </div>
          <div className='field'>
            <label
              className='c bg-repeat-0 bg-position-center bg-size-cover'
              htmlFor='profileImage'
              style={{
                color: "gray",
                border: "2px dashed gray",
                borderRadius: "10px",
                width: "100%",
                cursor: "pointer",
                padding: "1rem 0",
              }}>
              <svg
                viewBox='0 0 640 512'
                height='1em'
                style={{
                  height: "50px",
                  fill: "rgb(82, 82, 82)",
                  marginBottom: "20px",

                  width: "100%",
                }}>
                <path d='M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z'></path>
              </svg>
              Add product Image
            </label>
          </div>
          <div className='thumbnailImage'>
            <ol>
              <RenderImagePreviews />
            </ol>
          </div>

          <SubmitButton />
        </form>
      </div>
    </>
  );
};

export default AddProduct;
