import React, { useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

const PasswordField = ({ values, handleChange }) => {
  const [isPwd, setIsPwd] = useState(true);

  return (
    <>
      <input
        value={values.password}
        onChange={(e) => handleChange(e)}
        name='password'
        placeholder='Password'
        className='input-field'
        type={isPwd ? "password" : "text"}
      />
      <div
        style={{ position: "absolute", top: "27%", right: "5%", cursor: "pointer", opacity: 0.4 }}
        onClick={() => setIsPwd(!isPwd)}>
        {isPwd ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
      </div>
    </>
  );
};

export default PasswordField;
