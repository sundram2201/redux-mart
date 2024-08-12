import React from "react";
import { Link } from "react-router-dom";

const index = ({ pageText }) => {
  return (
    <>
      <div class='container-spider center'>
        <div class='rope center'>
          <div class='legs center'>
            <div class='boot-l'></div>
            <div class='boot-r'></div>
          </div>
          <div class='costume center'>
            <div class='spider'>
              <div class='s1 center'></div>
              <div class='s2 center'></div>
              <div class='s3'></div>
              <div class='s4'></div>
            </div>
            <div class='belt center'></div>
            <div class='hand-r'></div>
            <div class='hand-l'></div>
            <div class='neck center'></div>
            <div class='mask center'>
              <div class='eye-l'></div>
              <div class='eye-r'></div>
            </div>
            <div class='cover center'></div>
          </div>
        </div>
      </div>
      <div
        className='d-flex justify-content-center align-items-center flex-column'
        style={{
          height: "calc(100vh - 9.5rem)",
        }}>
        <h1>Identify Yourself !</h1>
        <h5>{pageText}</h5>

        <Link to='/login' style={{ color: "rgb(122, 62, 246)" }} className='crt-acnt-link'>
          Login Here
        </Link>
      </div>
    </>
  );
};

export default index;
