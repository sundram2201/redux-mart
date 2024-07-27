import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./Slices/UserSlice";
import logo from "../../public/reduxMart-logo2.png";

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
      localStorage.removeItem("token");
    }
  }
};

const Layout = (props) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData.data);

  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

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
    <div>
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
              <div className='me-4'>
                Welcome, <b> {userData?.user?.fullname}</b>
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
