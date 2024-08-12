import React, { useState } from "react";
import { AppBar, Button, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { ArrowBackIosNewOutlined as ArrowBackIosNewOutlinedIcon } from "@mui/icons-material";
import logo from "../../../../public/RM-logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import { hasToken } from "../../../Utils/HelperFunctions";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const TopBar = ({ data }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const drawerWidth = 280;
  const { userData, navigate } = data;
  const isLoggedIn = hasToken();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e, actionType) => {
    setAnchorEl(null);
    if (actionType === "logout") {
      localStorage.clear();
      toast("You've been logged out");
    } else if (actionType === "login") {
      navigate(e);
    }
  };

  const UserFirstChar = () => {
    const user = userData?.user?.fullname;
    const userFChar = userData?.user?.fullname.charAt(0).toUpperCase();
    const guestFChar = "Guest".charAt(0).toUpperCase();

    return (
      <Link to='/profile' className='user-link'>
        {user ? userFChar : guestFChar}
      </Link>
    );
  };

  return (
    <div>
      <AppBar
        position='fixed'
        className='top-small'
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}>
        <Toolbar className='justify-content-between'>
          <img src={logo} alt='reduxMart logo' style={{ width: "20%" }} />

          <div className='d-flex'>
            <UserFirstChar />
            <Button
              className='grd-btn'
              id='basic-button'
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup='true'
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}>
              <MenuIcon />
            </Button>
            <Menu
              id='basic-menu'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}>
              <Typography style={{ fontWeight: "bolder", padding: "6px 16px" }}>
                {userData?.user?.fullname.split(" ")[0] || "Guest"}
              </Typography>

              <MenuItem onClick={() => handleClose("/profile")}>My account</MenuItem>
              {isLoggedIn ? (
                <MenuItem onClick={() => handleClose("/", "logout")}>Logout</MenuItem>
              ) : (
                <MenuItem onClick={() => handleClose("/login", "login")}>Login</MenuItem>
              )}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TopBar;
