import React from "react";
import "./recipeSelect.css";

function recipeSelect() {
  return (
    <div className="background">
      <div className="container">
        <img
          className="smallLogo"
          src="/Assets/Images/Logo.png"
          alt="logo img"
        />
        <h3>무슨 처방일까요?</h3>
        <h4>처방 종류를 선택해주세요.</h4>

        <select className="select" name="bodypart" id="">
          <option value="choose">please</option>
          <option value="">코칭</option>
          <option value="">운동</option>
          <option value="">대면</option>
        </select>
        <div className="button-2 buttonsizeSmall">
          <div className="eff-2"></div>
          <a href="#"> 다음</a>
        </div>
      </div>
    </div>
  );
}

export default recipeSelect;
