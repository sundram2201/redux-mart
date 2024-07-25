import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { AddProductAPI } from "../../Utils/APIs";
import { useNavigate } from "react-router-dom";

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

        selectedFiles.forEach((file) => {
          formData.append("image", file);
        });
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

  const renderImagePreviews = () => {
    return selectedFiles.map((file) => (
      <div className='thumbnailImage' key={file.name}>
        <img src={URL.createObjectURL(file)} alt={file.name} />
      </div>
    ));
  };

  // const handleFilechange = async (e) => {
  //   const files = Array.from(e.target.files); // Convert FileList to an array
  //   formik.setFieldValue(
  //     "image",
  //     files.map((file) => file)
  //   );
  //   // setSelectedFiles(Array.from(e.target.files));

  //   // formdata.append("name", file);
  //   // formdata.append("image", file);
  //   // formdata.append("image", file);
  //   // let file = e.target.files[0];
  //   // const type = file.type.split("/")[1];
  //   // const imageType = ["jpeg", "jpg", "png"];
  //   // const validImageType = imageType.includes(type);
  //   // if (!validImageType) {
  //   //   formik.setFieldError("profilePic", "Please upload a valid image : jpeg, png, jpg");
  //   //   toast.dismiss(loadingToast);
  //   // } else {
  //   //   if (file.size > 5000001) {
  //   //     formik.setFieldError("profilePic", "image size is more than 5 MB");
  //   //     toast.dismiss(loadingToast);
  //   //     setProfile("");
  //   //   } else {
  //   //     let fr = new FileReader();
  //   //     fr.readAsDataURL(file);
  //   //     fr.onload = function () {
  //   //       setImage(fr.result);
  //   //     };
  //   //   }
  //   // }
  //   // const formdata = new FormData();
  //   // formdata.append("file", file);
  //   // try {
  //   //   const response = await uploadProductImageAPI(formdata);
  //   //   if (response?.status === 200) {
  //   //     toast.success(response.data.message, { id: "001" });
  //   //     toast.dismiss(loadingToast);
  //   //   }
  //   //   setImage(response.data.filePath);
  //   //   formik.setFieldValue("image", response.data.filePath);
  //   // } catch (err) {
  //   //   toast.success(err?.response?.message, { id: "001" });
  //   //   toast.dismiss(loadingToast);
  //   // }
  // };

  // useEffect(() => {
  //   if (loggedInUser?.data[0]?._id) {
  //     formik.setValues({
  //       name: loggedInUser?.data[0]?.firstName + loggedInUser?.data[0]?.lastName,
  //       email: loggedInUser?.data[0]?.email,
  //       image: loggedInUser?.data[0]?.filePath,
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [loggedInUser]);

  return (
    <>
      <p className='wlcm-head w-100 text-white' style={{ padding: "5rem 0 3rem 0" }}>
        Want to add your own <span>Product?</span>
      </p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form className='form' onSubmit={formik.handleSubmit}>
          <p id='heading'>Add here!</p>
          <div className='d-flex'>
            <div className='field'>
              <input
                name='name'
                value={formik.values.name}
                onChange={formik.handleChange}
                autoComplete='off'
                placeholder='Product name'
                className='input-field'
                type='text'
              />
            </div>

            <div className='field'>
              <input
                name='price'
                value={formik.values.price}
                onChange={formik.handleChange}
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
              value={formik.values.desc}
              onChange={formik.handleChange}
              autoComplete='off'
              placeholder='Product description'
              className='input-field'
              type='text'></textarea>
          </div>

          <label style={{ margin: "0.5rem 2rem" }} className='text-start text-white '>
            Choose category :
          </label>
          <div className='radio-input' style={{ margin: "0.5rem 2rem" }}>
            <input onChange={formik.handleChange} name='category' value='men' id='value-1' type='radio' />
            <label htmlFor='value-1'>Men</label>
            <input onChange={formik.handleChange} name='category' value='women' id='value-2' type='radio' />
            <label htmlFor='value-2'>Women</label>
            <input onChange={formik.handleChange} value='kids' name='category' id='value-3' type='radio' />
            <label htmlFor='value-3'>Kids </label>
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
            <div className='text-danger'>{formik.errors.image}</div>
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

          <div className='btnn'>
            <button type='submit' className='login-btn'>
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
