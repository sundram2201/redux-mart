import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import logo from "../../../../public/reduxMart-logo2.png";
import aside from "../../../../public/aside.png";

import {
  ShoppingCartOutlined as ShoppingCartOutlinedIcon,
  AddOutlined as AddOutlinedIcon,
  AccountCircleOutlined as AccountCircleOutlinedIcon,
  HomeOutlined as HomeOutlinedIcon,
  ArrowBackIosNewOutlined as ArrowBackIosNewOutlinedIcon,
  FavoriteBorderOutlined as FavoriteBorderOutlinedIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

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

const SideDrawer = ({ navigate }) => {
  const handleNavigate = (name) => {
    name === "Home" && navigate("/");
    name === "Profile" && navigate("/profile");
    name === "Add Product" && navigate("/add-product");
    name === "Cart" && navigate("/cart");
    name === "Favourites" && navigate("/favourites");
  };
  return (
    <div className='drawer' style={{ background: ` url(${aside}) no-repeat right top #000`, height: "100vh" }}>
      <Toolbar />
      <Link to='/' className='navbar-brand wlcm-head'>
        <img style={{ width: "90%" }} src={logo} alt='reduxMart logo' />
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
};
export default SideDrawer;
