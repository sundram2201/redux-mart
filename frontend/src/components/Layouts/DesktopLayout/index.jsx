import React, { createContext, useContext } from "react";
import { Box, CssBaseline } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MiniDrawer from "./MiniDrawer";

const drawerWidth = 280;

const LayoutContext = createContext();
export const useLayoutContext = () => useContext(LayoutContext);

const DesktopLayout = (props) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex" }} className='comp-box'>
      <CssBaseline />
      <MiniDrawer navigate={navigate} userData={props?.userData} />
      <Box component='main' sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <div className='heightFromHeader'></div>
        {props.children}
      </Box>
    </Box>
  );
};

export default DesktopLayout;
