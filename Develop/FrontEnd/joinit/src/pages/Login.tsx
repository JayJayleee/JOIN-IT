import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login/Login.css";
import PatientLogin from "./Login/PatientLogin";
import TherapistLogin from "./Login/TherapistLogin";

type changeFtn = (e: number) => void;

function NowLoginPage(prop: any) {
  return [<PatientLogin />, <TherapistLogin />][prop.CurrentLoginPage];
}

function Login() {

  const movePage = useNavigate();

  const moveHomePage = () => {
    movePage("/");
  };

  const moveFindIdPage = () => {
    movePage("/FindId");
  };

  const moveChangePwPage = () => {
    movePage("/ChangePw");
  };

  const moveSignUpPage = () => {
    movePage("/SignUp");
  };

  const [CurrentLoginPage, ChangeLoginPage] = useState(0);

  const ChangePageHandler: changeFtn = (page: number) => {
    ChangeLoginPage(page);
  };

  return (
    <div className="row">
      <img
        src="/Assets/Images/loginimage.png"
        alt="login"
        className="LoginLeftImg"
      />
      <div className="col LoginRight">
        <img
          src="/Assets/Images/Logo.png"
          alt="Logo"
          className="LoginLogoImg"
          onClick={moveHomePage}
        />
        <div className="row LoginPageSelector">
          <div
            className={`LoginPagePatient ${
              CurrentLoginPage === 0 ? "choose" : ""
            }`}
            onClick={() => ChangePageHandler(0)}
          >
            <p>환자</p>
          </div>
          <div
            className={`LoginPageTherapist ${
              CurrentLoginPage === 1 ? "choose" : ""
            }`}
            onClick={() => ChangePageHandler(1)}
          >
            <p>치료사</p>
          </div>
        </div>
        <NowLoginPage CurrentLoginPage={CurrentLoginPage} />
        <div className="row LoginPageAccountSelector">
          <p onClick={moveFindIdPage}>아이디 찾기</p>
          <p onClick={moveChangePwPage}>비밀번호 찾기</p>
          <p onClick={moveSignUpPage}>회원가입 하기</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
