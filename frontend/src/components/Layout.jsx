import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

import logo from "../../public/reduxMart-logo2.png";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { GetUserDataAPI } from "../Utils/APIs";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./Slices/UserSlice";

const drawerWidth = 320;

export const fetchUserData = async (dispatch, navigate) => {
  try {
    const res = await GetUserDataAPI();
    if (res.status === 200) {
      dispatch(getUser(res.data.data));
    }
  } catch (err) {
    if (err.response.status === 401) {
      navigate("/login");
    }
  }
};

const Layout = (props) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData.data);

  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  useEffect(() => {
    fetchUserData(dispatch, navigate);
  }, []);

  const handleLogout = () => {
    toast("You've been logged out");
    navigate("/login");
    localStorage.removeItem("token");
  };
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleNavigate = (name) => {
    name === "Home" && navigate("/");
    name === "Profile" && navigate("/profile");
    name === "Add Product" && navigate("/add-product");
  };

  const displayIcon = (index) => {
    if (index === 0) {
      return <HomeOutlinedIcon />;
    }
    if (index === 1) {
      return <AccountCircleIcon />;
    }
    if (index === 2) {
      return <AddOutlinedIcon />;
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Link to='/' className='navbar-brand wlcm-head'>
        <img src={logo} alt='reduxMart logo' />
      </Link>
      <Divider />
      <List>
        {["Home", "Profile", "Add Product"].map((text, index) => {
          return (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={(e) => handleNavigate(e.target.textContent)}>
                <ListItemIcon>{displayIcon(index)}</ListItemIcon>
                <ListItemText style={{ color: "black" }} primary={text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position='fixed'
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}>
        <Toolbar className='justify-content-between'>
          <button onClick={() => navigate(-1)}>
            <ArrowBackIosNewOutlinedIcon />
          </button>
          <Typography noWrap component='div'>
            <div className='d-flex justify-content-center align-items-center'>
              <div className=''>
                Welcome, <b> {userData?.user?.fullname}</b>
              </div>
              <div className=''>
                <button data-quantity={userData?.itemCount} className='btn-cart' onClick={() => navigate("/cart")}>
                  <ShoppingCartOutlinedIcon className='icon-cart' />

                  <span className='quantity'></span>
                </button>
              </div>
              <div className=''>
                <button onClick={() => handleLogout()}>Logout</button>
              </div>
            </div>
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component='nav' sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label='mailbox folders'>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
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
        {props.children}
      </Box>
    </Box>
  );
};

export default Layout;
