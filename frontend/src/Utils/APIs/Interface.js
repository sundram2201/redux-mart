import axios from "axios";
import { BaseUrl } from "./BaseUrl";

export const POST = (EndPoint, data) => {
  return axios.post(BaseUrl + EndPoint, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const FILEPOST = (EndPoint, data) => {
  return axios.post(BaseUrl + EndPoint, data, {
    headers: {
      // "Content-Type": "application/json",
    },
  });
};

export const GET = (EndPoint) => {
  return axios.get(BaseUrl + EndPoint);
};

export const GETBYTOKEN = (EndPoint) => {
  return axios.get(BaseUrl + EndPoint, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const DELETE = (EndPoint, data) => {
  return axios.delete(BaseUrl + EndPoint, {
    headers: {
      "Content-Type": "application/json",
    },
    params: data,
  });
};
