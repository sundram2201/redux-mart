import React, { createContext, useContext, useEffect, useState } from "react";
import DesktopLayout from "./DesktopLayout";
import MobileLayout from "./MobileLayout";
import { GetUserDataAPI } from "../../Utils/APIs";
import { useDispatch } from "react-redux";
import useUserData from "../Hooks/useUserData";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../Redux/Slices/UserSlice";
import useSmScreen from "../Hooks/useSmSceen";

const LayoutContext = createContext();
export const useLayoutContext = () => useContext(LayoutContext);

export const fetchUserData = async (dispatch) => {
  try {
    const res = await GetUserDataAPI();
    if (res.status === 200) {
      dispatch(getUser(res.data.data));
    }
  } catch (err) {
    if (err.response.status === 401) {
      // navigate("/login");
      localStorage.removeItem("token");
    }
  }
};

const index = ({ children }) => {
  const [isFetchingUser, setIsFetchingUser] = useState(true);
  const dispatch = useDispatch();
  const userData = useUserData();
  const isSmallScreen = useSmScreen();

  useEffect(() => {
    fetchUserData(dispatch);
  }, []);

  return (
    <LayoutContext.Provider value={{ userData, isFetchingUser, setIsFetchingUser }}>
      {isSmallScreen ? (
        <MobileLayout userData={userData}>{children}</MobileLayout>
      ) : (
        <DesktopLayout userData={userData}>{children}</DesktopLayout>
      )}
    </LayoutContext.Provider>
  );
};

export default index;
