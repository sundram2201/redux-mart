import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import {
  ShoppingCartOutlined as ShoppingCartOutlinedIcon,
  AddOutlined as AddOutlinedIcon,
  AccountCircleOutlined as AccountCircleOutlinedIcon,
  HomeOutlined as HomeOutlinedIcon,
  ArrowBackIosNewOutlined as ArrowBackIosNewOutlinedIcon,
  FavoriteBorderOutlined as FavoriteBorderOutlinedIcon,
} from "@mui/icons-material";
import { AppBar, Button, Menu, MenuItem, Toolbar, Typography } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const LayoutContext = React.createContext();

export const useLayoutContext = () => React.useContext(LayoutContext);

export default function ResLayout({ children, userData }) {
  const [value, setValue] = React.useState("recents");
  const navigate = useNavigate();
  const drawerWidth = 320;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(userData, ">?");

  return (
    <div className='position-relative'>
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
              {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      {children}

      <BottomNavigation className='btm-nv' sx={{ width: 500 }} value={value} onChange={handleChange}>
        <BottomNavigationAction className='btm-btn' label='Home' value='home' icon={<HomeOutlinedIcon />} />
        <BottomNavigationAction
          className='btm-btn'
          label='Profile'
          value='profile'
          icon={<AccountCircleOutlinedIcon />}
        />
        <BottomNavigationAction className='btm-btn' label='Add' value='add-product' icon={<AddOutlinedIcon />} />
        <BottomNavigationAction className='btm-btn' label='Cart' value='cart' icon={<ShoppingCartOutlinedIcon />} />
        <BottomNavigationAction
          className='btm-btn'
          label='Favourites'
          value='favourites'
          icon={<FavoriteBorderOutlinedIcon />}
        />
      </BottomNavigation>
    </div>
  );
}
