import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import {
  ShoppingCartOutlined as ShoppingCartOutlinedIcon,
  AddOutlined as AddOutlinedIcon,
  AccountCircleOutlined as AccountCircleOutlinedIcon,
  HomeOutlined as HomeOutlinedIcon,
  FavoriteBorderOutlined as FavoriteBorderOutlinedIcon,
} from "@mui/icons-material";

const BottomBar = ({ navigate }) => {
  const handleChange = (event, newValue) => {
    navigate(newValue);
  };
  return (
    <div>
      <BottomNavigation className='btm-nv' sx={{ width: 500 }} onChange={handleChange}>
        <BottomNavigationAction label='Home' value='/' icon={<HomeOutlinedIcon />} />
        <BottomNavigationAction label='Profile' value='/profile' icon={<AccountCircleOutlinedIcon />} />
        <BottomNavigationAction label='Add' value='/add-product' icon={<AddOutlinedIcon />} />
        <BottomNavigationAction label='Cart' value='/cart' icon={<ShoppingCartOutlinedIcon />} />
        <BottomNavigationAction label='Favourites' value='/favourites' icon={<FavoriteBorderOutlinedIcon />} />
      </BottomNavigation>
    </div>
  );
};

export default BottomBar;
