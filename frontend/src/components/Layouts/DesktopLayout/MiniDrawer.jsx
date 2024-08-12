import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import logo from "../../../../public/RM-logo.png";
import { Link, useNavigate } from "react-router-dom";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import {
  ShoppingCartOutlined as ShoppingCartOutlinedIcon,
  AddOutlined as AddOutlinedIcon,
  AccountCircleOutlined as AccountCircleOutlinedIcon,
  HomeOutlined as HomeOutlinedIcon,
  FavoriteBorderOutlined as FavoriteBorderOutlinedIcon,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { hasToken, PrivateNavigation } from "../../../Utils/HelperFunctions";
import toast from "react-hot-toast";
import { fetchUserData } from "..";
import { useDispatch } from "react-redux";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer({ navigate, userData }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isLoggedIn = hasToken();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    toast("You've been logged out");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
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

  const handleNavigation = (name, index) => {
    name === "Home" || index === 0 ? navigate("/") : false;
    name === "Profile" || index === 1 ? PrivateNavigation("/profile", "navigation", navigate) : false;
    name === "Add Product" || index === 2 ? PrivateNavigation("/add-product", "navigation", navigate) : false;
    name === "Cart" || index === 3 ? PrivateNavigation("/cart", "navigation", navigate) : false;
    name === "Favourites" || index === 4 ? PrivateNavigation("/favourites", "navigation", navigate) : false;
  };

  const UserTooltip = () => {
    const user = userData?.user?.fullname;
    const userFChar = userData?.user?.fullname.charAt(0).toUpperCase();
    const guest = "Guest";
    const guestFChar = "Guest".charAt(0).toUpperCase();

    return (
      <Tooltip title={user || guest} arrow>
        <Link to='/profile' className='user-link'>
          {isLoggedIn ? userFChar : guestFChar}
        </Link>
      </Tooltip>
    );
  };

  useEffect(() => {
    fetchUserData(dispatch);
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position='fixed' open={open}>
        <Toolbar className='justify-content-between'>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}>
            <MenuIcon />
          </IconButton>
          <Link to='/' className='navbar-brand wlcm-head'>
            <img src={logo} alt='reduxMart logo' />
          </Link>
          <Typography noWrap component='div'>
            <div className='d-flex justify-content-center align-items-center '>
              <div className='me-4'>
                <UserTooltip />
              </div>

              <div className='bg-dark'>
                {isLoggedIn ? (
                  <button className='grd-btn' onClick={() => handleLogout()}>
                    <LogoutOutlinedIcon /> Logout
                  </button>
                ) : (
                  <button className='grd-btn' onClick={() => handleLogin()}>
                    <LogoutOutlinedIcon /> Login
                  </button>
                )}
              </div>
            </div>
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant='permanent' open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Home", "Profile", "Add Product", "Cart", "Favourites"].map((text, index) => (
            <ListItem
              onClick={(e) => handleNavigation(e.target.textContent, index)}
              key={text}
              disablePadding
              sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}>
                  {displayIcon(index)}
                </ListItemIcon>
                <ListItemText
                  primary={<Typography style={{ fontWeight: "bold" }}>{text}</Typography>}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}
