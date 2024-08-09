import { AppBar, Menu, MenuItem, Toolbar, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";

// TabItem component for rendering individual tab
const TabItem = ({ id, value, label, onClick }) => (
  <>
    <input
      type='radio'
      name='tab'
      id={id}
      className={`tab tab--${id}`}
      value={value}
      onChange={() => onClick(value)}
      aria-checked={false}
    />
    <label className='tab_label' htmlFor={id}>
      {label}
    </label>
  </>
);

const Tab = ({ getProdCate }) => {
  const tabs = [
    { id: "1", value: "", label: "All" },
    { id: "2", value: "men", label: "Men" },
    { id: "3", value: "women", label: "Women" },
    { id: "4", value: "kids", label: "Kids" },
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (val) => {
    setAnchorEl(null);

    const validValues = ["men", "women", "kids", ""];
    const isValidVal = validValues.includes(val);

    if (isValidVal) {
      getProdCate(val);
    }
  };

  const isSmallScreen = useMediaQuery("(max-width: 599px)");

  return (
    <div style={{ display: "flex", justifyContent: "center" }} className='dddddddddddddd'>
      {isSmallScreen ? (
        <div>
          <Button
            id='demo-positioned-button'
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup='true'
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}>
            <span className='me-2'>
              <ManageSearchIcon />
            </span>
            Find by category
          </Button>
          <Menu
            id='demo-positioned-menu'
            aria-labelledby='demo-positioned-button'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}>
            {tabs.map(({ id, value, label }) => (
              <MenuItem key={id} value={value} onClick={() => handleClose(value)}>
                {label}
              </MenuItem>

              // <TabItem key={id} id={`${id}`} value={value} label={label} onClick={getProdCate} />
            ))}
            {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem> */}
          </Menu>
        </div>
      ) : (
        <div className='tab-container'>
          {tabs.map(({ id, value, label }) => (
            <TabItem key={id} id={`${id}`} value={value} label={label} onClick={getProdCate} />
          ))}
          <div className='indicator'></div>
        </div>
      )}
    </div>
  );
};

export default Tab;
