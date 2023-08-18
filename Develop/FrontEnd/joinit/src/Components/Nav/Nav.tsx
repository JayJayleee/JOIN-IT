import React, { useState } from "react";
import "./Nav.css";
import AuthLogin from "../../store/modules/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";

function Nav(props?: any) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [view, setView] = useState(false);

  const LogoutFtn = () => {
    dispatch(AuthLogin.actions.Logout());
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  const GoToMyProfile = () => {
    if (localStorage.getItem("userType") === "T") {
      navigate("/TProfile");
    } else if (localStorage.getItem("userType") === "P") {
      navigate("/PProfile");
    } else {
      return false;
    }
  };

  const dropdownForT = (
    <React.Fragment>
      {ReactDOM.createPortal(
        <div className="navbar-backdrop" onClick={(e) => setView(false)} />,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <div
          className={`navbar-dropdown-T ${
            view ? "slide-fade-in-dropdown" : "slide-fade-out-dropdown"
          }`}
        >
          <ul>
            <div
              className="navbar-option"
              onClick={() => {
                GoToMyProfile();
              }}
            >
              <li>마이 페이지</li>
            </div>
            <div className="navbar-line" />
            <div
              className="navbar-option"
              onClick={() => {
                LogoutFtn();
              }}
            >
              <li>로그아웃</li>
            </div>
          </ul>
        </div>,
        document.getElementById("overlay-root")!
      )}
    </React.Fragment>
  );

  const dropdownForP = (
    <React.Fragment>
      {ReactDOM.createPortal(
        <div className="navbar-backdrop" onClick={(e) => setView(false)} />,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <div
          className={`navbar-dropdown-P ${
            view ? "slide-fade-in-dropdown" : "slide-fade-out-dropdown"
          }`}
        >
          <ul>
            <div
              className="navbar-option"
              onClick={() => {
                setView(false);
                props.setGoToRegisterCareCode(true);
              }}
            >
              <li>치료코드등록</li>
            </div>
            <div className="navbar-line" />
            <div
              className="navbar-option"
              onClick={() => {
                GoToMyProfile();
              }}
            >
              <li>마이 페이지</li>
            </div>
            <div className="navbar-line" />
            <div
              className="navbar-option"
              onClick={() => {
                LogoutFtn();
              }}
            >
              <li>로그아웃</li>
            </div>
          </ul>
        </div>,
        document.getElementById("overlay-root")!
      )}
    </React.Fragment>
  );

  return (
    <div>
      <div className="Nav_bar">
        <img
          src="/Assets/Images/logo2.png"
          alt="logo img"
          className="logoimg"
          onClick={
            localStorage.getItem("userType") === "T"
              ? () => navigate("/Tboard")
              : () => navigate("/Pboard")
          }
          style={{ cursor: "pointer" }}
        />
        <div className="col">
          <img
            src="https://i.imgur.com/MAvYucW.png"
            alt="usericon"
            className="usericon"
            onClick={() => setView(!view)}
          />
          {view &&
            (localStorage.getItem("userType") === "T"
              ? dropdownForT
              : dropdownForP)}
        </div>
      </div>
    </div>
  );
}

export default Nav;
