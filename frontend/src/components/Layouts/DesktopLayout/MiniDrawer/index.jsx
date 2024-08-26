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
import logo from "../../../../../public/RM-logo.png";
import { Link } from "react-router-dom";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LoginIcon from "@mui/icons-material/Login";
import {
  ShoppingCartOutlined as ShoppingCartOutlinedIcon,
  AddOutlined as AddOutlinedIcon,
  AccountCircleOutlined as AccountCircleOutlinedIcon,
  HomeOutlined as HomeOutlinedIcon,
  FavoriteBorderOutlined as FavoriteBorderOutlinedIcon,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { hasToken, PrivateNavigation } from "../../../../Utils/HelperFunctions";
import toast from "react-hot-toast";
import { fetchUserData } from "../..";
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

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
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

const MENU_ITEMS = [
  { label: "Home", icon: <HomeOutlinedIcon />, route: "/" },
  { label: "Profile", icon: <AccountCircleOutlinedIcon />, route: "/profile" },
  { label: "Add Product", icon: <AddOutlinedIcon />, route: "/add-product" },
  { label: "Cart", icon: <ShoppingCartOutlinedIcon />, route: "/cart" },
  {
    label: "Favourites",
    icon: <FavoriteBorderOutlinedIcon />,
    route: "/favourites",
  },
];

export default function index({ navigate, userData }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleDrawerToggle = () => setOpen((prevOpen) => !prevOpen);

  const handleNavigation = (route) => {
    if (
      route === "/profile" ||
      route === "/add-product" ||
      route === "/cart" ||
      route === "/favourites"
    ) {
      PrivateNavigation(route, "navigation", navigate);
    } else {
      navigate(route);
    }
  };

  const isLoggedIn = hasToken();
  const userInitial = isLoggedIn
    ? userData?.user?.fullname?.charAt(0).toUpperCase()
    : "G";

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

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    toast("You've been logged out");
  };

  useEffect(() => {
    fetchUserData(dispatch);
  }, [dispatch]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar className="justify-content-between top-box">
          {isLoggedIn ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              edge="start"
              sx={{ marginRight: 5, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            ""
          )}
          <Link to="/" className="navbar-brand wlcm-head">
            <img src={logo} alt="reduxMart logo" />
          </Link>
          <Typography noWrap component="div">
            <div className="d-flex justify-content-center align-items-center">
              <div className="me-4">
                <Tooltip
                  title={isLoggedIn ? userData?.user?.fullname : "Guest"}
                  arrow
                >
                  <button
                    onClick={() => handleNavigation("/profile")}
                    className="user-link"
                  >
                    {userInitial}
                  </button>
                </Tooltip>
              </div>
              <div className="bg-dark">
                <button
                  className="grd-btn"
                  onClick={isLoggedIn ? handleLogout : () => navigate("/login")}
                >
                  {isLoggedIn ? (
                    <>
                      Logout <LogoutOutlinedIcon />
                    </>
                  ) : (
                    <>
                      Login <LoginIcon />
                    </>
                  )}
                </button>
              </div>
            </div>
          </Typography>
        </Toolbar>
      </AppBar>
      {isLoggedIn ? (
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerToggle}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {MENU_ITEMS.map(({ label, icon, route }, index) => (
              <ListItem key={label} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  onClick={() => handleNavigation(route)}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography style={{ fontWeight: "bold" }}>
                        {label}
                      </Typography>
                    }
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
      ) : (
        ""
      )}
    </Box>
  );
}
