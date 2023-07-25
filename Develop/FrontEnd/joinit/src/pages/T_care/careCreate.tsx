import { useState } from "react";
import "./careCreate.css";
import Editor from "./Editor";

function CareCreate() {
  return (
    <div className="background">
      <div className="container">
        <img
          className="smallLogo"
          src="/Assets/Images/logo.png"
          alt="logo img"
        />
        <h3>치료를 시작해볼까요?</h3>

        <div className="patientInfo1">
          <div className="patientName widthForInput">
            <h4>환자 이름</h4>
            <input className="inputEditfor2" type="text" />
          </div>
          <div className="patientPain widthForInput">
            <h4>환부</h4>
            <select className="inputEditfor2 rightside" name="bodypart" id="">
              <option value="choose">옵션을 선택해주세요.</option>
              <option value="neck">목</option>
              <option value="back">등</option>
            </select>
          </div>
        </div>

        <div className="patientInfo2 widthForInput">
          <h4>환자 연락처</h4>
          <input className="inputEditfor1" type="text" />
          <h4>진료 시작일</h4>
          <input className="inputEditfor1" type="text" />
          <h4>치료 요약</h4>
          <input className="inputEditfor1" type="text" />
          <h4>사고 경위</h4>
          <input className="inputEditfor1" type="text" />
          <h4>특이 사항</h4>
          <textarea className="textareEdit" />
        </div>
      </div>
    </div>
  );
}

export default CareCreate;
