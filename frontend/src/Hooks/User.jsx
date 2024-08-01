import React from "react";
import { useSelector } from "react-redux";

const useUserData = () => {
  return useSelector((state) => state?.userData?.data);
};

export default useUserData;
