import React, { createContext, useContext, useEffect, useState } from "react";
import { AppBar, Box, CssBaseline, Drawer, Toolbar, Typography } from "@mui/material";
import { ArrowBackIosNewOutlined as ArrowBackIosNewOutlinedIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SideDrawer from "./Drawer";

const drawerWidth = 280;

const LayoutContext = createContext();
export const useLayoutContext = () => useContext(LayoutContext);

const DesktopLayout = (props) => {
  const navigate = useNavigate();

  const { window } = props;
  const container = window !== undefined ? () => window().document.body : undefined;

  const handleLogout = () => {
    toast("You've been logged out");
    navigate("/login");
    localStorage.removeItem("token");
  };

  return (
    <Box sx={{ display: "flex" }} className='comp-box'>
      <CssBaseline />
      <AppBar
        position='fixed'
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}>
        <Toolbar className='justify-content-between'>
          <button className='grd-btn' onClick={() => navigate(-1)}>
            <ArrowBackIosNewOutlinedIcon />
          </button>
          <Typography noWrap component='div'>
            <div className='d-flex justify-content-center align-items-center '>
              <div className='me-4'>
                Welcome, <b> {props?.userData?.user?.fullname}</b>
              </div>

              <div className='bg-dark'>
                <button className='grd-btn' onClick={() => handleLogout()}>
                  Logout
                </button>
              </div>
            </div>
          </Typography>
        </Toolbar>
      </AppBar>

      <Box component='nav' sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label='mailbox folders'>
        <Drawer
          container={container}
          variant='temporary'
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}></Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
          open>
          <SideDrawer navigate={navigate} />
        </Drawer>
      </Box>
      <Box component='main' sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <div className='pt-5'></div>
        {props.children}
      </Box>
    </Box>
  );
};

export default DesktopLayout;
