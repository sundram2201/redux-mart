import React from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";

export default function index({ children, userData }) {
  const navigate = useNavigate();

  return (
    <div className='position-relative' style={{ paddingTop: "7rem" }}>
      <TopBar data={{ userData, navigate }} />
      {children}
      <div style={{ height: "6rem" }}></div>
      <BottomBar navigate={navigate} />
    </div>
  );
}
