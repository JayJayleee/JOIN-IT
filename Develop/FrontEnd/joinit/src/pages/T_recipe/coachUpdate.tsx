import React from "react";
import Editor from "../T_care/Editor";
import "./coach.css";

function coachUpdate() {
  return (
    <div className="background">
      <div className="container">
        <img
          className="smallLogo"
          src="/Assets/Images/Logo.png"
          alt="logo img"
        />
        <h3>계획있는 운동으로 건강해지세요!</h3>
        <div className="widthForInput">
          <h4 className="labels">운동 내용</h4>
          <input className="input" type="text" />
          <h4 className="labels">코칭 일자</h4>
          <input className="input" type="date" />
          <h4 className="labels">목표 각도</h4>
          <input className="input" type="text" />
          <h4 className="labels">코칭 시간</h4>
          <input className="input" type="text" />
        </div>

        <Editor />
        <div className="button-2 buttonsizeBig">
          <div className="eff-2"></div>
          <a href="#"> 수정 완료 </a>
        </div>
        <div style={{ width: "10px" }}></div>
        <div className="button-2 buttonsizeSmall">
          <div className="eff-2"></div>
          <a href="#"> 삭제 하기</a>
        </div>
      </div>
    </div>
  );
}

export default coachUpdate;
