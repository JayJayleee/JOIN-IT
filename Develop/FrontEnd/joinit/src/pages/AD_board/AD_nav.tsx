import React from "react";
import "./AD_nav.css";
import { ArrowLeftIcon } from "@mui/x-date-pickers";

function AD_nav() {
  return (
    <div className="AD_nav">
      <img className="smallLogo" src="/Assets/Images/Logo.png" alt="logo img" />
      <hr />
      <div className="spacefornav marginfornav flexing">
        <img
          className="icon"
          src="/Assets/Images/Forward Arrow.png"
          alt="directicon"
        />
        <a href="/"> 사이트로 바로가기</a>
      </div>
      <h2 style={{ alignSelf: "baseline", color: "#858585" }}>사이트 관리</h2>
      <div className="spacefornav">
        <img
          className="icon"
          src="/Assets/Images/Dumbbell.png"
          alt="directicon"
        />
        <h2>운동 리스트 관리</h2>
      </div>
      <div className="spacefornav">
        <img
          className="icon"
          src="/Assets/Images/Physical Therapy.png"
          alt="directicon"
        />
        <h2>치료사 리스트 관리</h2>
      </div>
      <div className="spacefornav">
        <img
          className="icon"
          src="/Assets/Images/user Account.png"
          alt="directicon"
        />
        <h2>환자 리스트 관리</h2>
      </div>
    </div>
  );
}

function AD_board() {
  return (
    <div>
      <AD_nav />
    </div>
  );
}
export default AD_board;
