import React from "react";
import { SmCartLoader } from "./Loaders";

const SubmitButton = ({ isLoading }) => {
  return (
    <div className='btnn'>
      <button type='submit' className='login-btn'>
        {isLoading ? <SmCartLoader page='login' /> : "Submit"}
      </button>
    </div>
  );
};

export default SubmitButton;
