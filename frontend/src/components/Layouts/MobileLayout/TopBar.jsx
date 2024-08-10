import React, { useState } from "react";
import { AppBar, Button, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { ArrowBackIosNewOutlined as ArrowBackIosNewOutlinedIcon } from "@mui/icons-material";
import logo from "../../../../public/reduxMart-logo2.png";
import MenuIcon from "@mui/icons-material/Menu";

const TopBar = ({ data }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const drawerWidth = 280;
  const { userData, navigate } = data;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
    navigate(e);
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
          <button className='grd-btn' onClick={() => navigate(-1)}>
            <ArrowBackIosNewOutlinedIcon />
          </button>
          <img src={logo} alt='reduxMart logo' style={{ width: "20%" }} />

          <div>
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
                {userData?.user?.fullname.split(" ")[0]}
              </Typography>

              <MenuItem onClick={() => handleClose("/profile")}>My account</MenuItem>
              <MenuItem onClick={() => handleClose("/login")}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TopBar;
