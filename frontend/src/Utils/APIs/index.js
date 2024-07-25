import { FILEPOST, GET, GETBYTOKEN, POST } from "./Interface";

export const LoginAPI = (data) => POST("/api/v1/user/login-user", data);

export const GetCartListAPI = () => GETBYTOKEN("/api/v1/cart/cart-list");

export const GetUserDataAPI = () => GETBYTOKEN("/api/v1/user/get-user");
export const AddProductAPI = (data) => FILEPOST("/api/v1/product/add-product", data);
export const GetAllProductAPI = () => GET("/api/v1/product/all-products");
export const GetProdByIdAPI = (productId) => GET(`/api/v1/product/productById?id=${productId}`);

export const AddToCartAPI = (data) => POST("/api/v1/cart/add", data);
export const AddToFavAPI = (data) => POST("/api/v1/favourites/add", data);
