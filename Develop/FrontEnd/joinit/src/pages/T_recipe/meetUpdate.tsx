import React from "react";
import "./meet.css";

function meetUpdate() {
  return (
    <div className="background">
      <div className="container">
        <img
          className="smallLogo"
          src="/Assets/Images/Logo.png"
          alt="logo img"
        />
        <h3>우리 언제 만날까요?</h3>
        <div className="widthForInput">
          <h4 className="labels">대면 일자</h4>
          <input className="input" type="date" />
          <h4 className="labels">대면 시간</h4>
          <input className="input" type="text" />
          <h4 className="labels">대면 내용</h4>
          <textarea className="textareEdit " />
          <div className="button-2 buttonsizeBig">
            <div className="eff-2"></div>
            <a href="#"> 수정 완료 </a>
          </div>
          <div style={{ width: "10px" }}></div>
          <div className="button-2 buttonsizeSmall">
            <div className="eff-2"></div>
            <a href="#"> 삭제하기</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default meetUpdate;
