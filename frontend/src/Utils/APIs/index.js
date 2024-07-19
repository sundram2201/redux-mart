import { FILEPOST, GET, POST } from "./Interface";

export const LoginAPI = (data) => POST("/api/v1/user/login-user", data);

// export const uploadProductImageAPI = () => POST();
export const AddProductAPI = (data) => FILEPOST("/api/v1/product/add-product", data);
export const GetAllProductAPI = () => GET("/api/v1/product/all-products");
