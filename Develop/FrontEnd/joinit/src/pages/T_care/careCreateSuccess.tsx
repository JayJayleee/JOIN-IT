import React from "react";
import "./careCreateSuccess.css";
import { useNavigate } from "react-router-dom";

function CareCreateSuccess() {
  const navigate = useNavigate();
  const backToList = () => {
    navigate("/");
  };

  const gotoCareList = () => {
    navigate("/RecipeSelect");
  };
  return (
    <div className="success-container">
      <div className="success-image-container">
        <h1 className="success-title">치료 등록 성공!</h1>
        <img src="/Assets/Images/check.gif" alt="" />
        <div className="button-scc">
          <div className="eff-scc"></div>
          <h1 onClick={backToList}>뒤로가기</h1>
        </div>
        <div className="button-scc" style={{ backgroundColor: "#58867A" }}>
          <div className="eff-scc"></div>
          <h1 onClick={gotoCareList}>처방 등록하기</h1>
        </div>
      </div>
    </div>
  );
}

export default CareCreateSuccess;
