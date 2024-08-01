import React, { createContext, useContext, useEffect, useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  ShoppingCartOutlined as ShoppingCartOutlinedIcon,
  AddOutlined as AddOutlinedIcon,
  AccountCircleOutlined as AccountCircleOutlinedIcon,
  HomeOutlined as HomeOutlinedIcon,
  ArrowBackIosNewOutlined as ArrowBackIosNewOutlinedIcon,
  FavoriteBorderOutlined as FavoriteBorderOutlinedIcon,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { GetUserDataAPI } from "../Utils/APIs";
import { useDispatch } from "react-redux";
import { getUser } from "./Slices/UserSlice";
import logo from "../../public/reduxMart-logo2.png";
import aside from "../../public/aside.png";
import useUserData from "../Hooks/User";

const drawerWidth = 320;

const LayoutContext = createContext();

export const useLayoutContext = () => useContext(LayoutContext);

export const fetchUserData = async (dispatch, navigate) => {
  try {
    // setIsFetchingUser(true);
    const res = await GetUserDataAPI();
    if (res.status === 200) {
      dispatch(getUser(res.data.data));
      // setIsFetchingUser(false);
    }
  } catch (err) {
    if (err.response.status === 401) {
      // setIsFetchingUser(false);
      navigate("/login");
      localStorage.removeItem("token");
    }
  }
};

const Layout = (props) => {
  const [isFetchingUser, setIsFetchingUser] = useState(true);
  const dispatch = useDispatch();
  const userData = useUserData();

  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    fetchUserData(dispatch, navigate);
  }, []);

  const handleLogout = () => {
    toast("You've been logged out");
    navigate("/login");
    localStorage.removeItem("token");
  };
  // const handleDrawerClose = () => {
  //   setIsClosing(true);
  //   setMobileOpen(false);
  // };

  // const handleDrawerTransitionEnd = () => {
  //   setIsClosing(false);
  // };

  const handleNavigate = (name) => {
    name === "Home" && navigate("/");
    name === "Profile" && navigate("/profile");
    name === "Add Product" && navigate("/add-product");
    name === "Cart" && navigate("/cart");
    name === "Favourites" && navigate("/favourites");
  };

  const displayIcon = (index) => {
    if (index === 0) {
      return <HomeOutlinedIcon />;
    }
    if (index === 1) {
      return <AccountCircleOutlinedIcon />;
    }
    if (index === 2) {
      return <AddOutlinedIcon />;
    }
    if (index === 3) {
      return <ShoppingCartOutlinedIcon />;
    }
    if (index === 4) {
      return <FavoriteBorderOutlinedIcon />;
    }
  };

  const drawer = (
    <div className='drawer' style={{ background: ` url(${aside}) no-repeat right top #000`, height: "100vh" }}>
      <Toolbar />
      <Link to='/' className='navbar-brand wlcm-head'>
        <img src={logo} alt='reduxMart logo' />
      </Link>
      <Divider />
      <List>
        {["Home", "Profile", "Add Product", "Cart", "Favourites"].map((text, index) => {
          return (
            <ListItem onClick={(e) => handleNavigate(e.target.textContent)} key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{displayIcon(index)}</ListItemIcon>
                <ListItemText primary={<Typography style={{ fontWeight: "bold" }}>{text}</Typography>} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

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
                Welcome, <b> {userData?.user?.fullname}</b>
              </div>

              <div className=''>
                <button className='grd-btn' onClick={() => handleLogout()}>
                  Logout
                </button>
              </div>
            </div>
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        style={{ background: ` url(${aside}) no-repeat right top #000` }}
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label='mailbox folders'>
        <Drawer
          style={{ background: ` url(${aside}) no-repeat right top #000` }}
          container={container}
          variant='temporary'
          open={mobileOpen}
          // onTransitionEnd={handleDrawerTransitionEnd}
          // onClose={handleDrawerClose}
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
          {drawer}
        </Drawer>
      </Box>
      <Box component='main' sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <LayoutContext.Provider value={{ userData, isFetchingUser, setIsFetchingUser }}>
          {props.children}
        </LayoutContext.Provider>
      </Box>
    </Box>
  );
};

export default Layout;
