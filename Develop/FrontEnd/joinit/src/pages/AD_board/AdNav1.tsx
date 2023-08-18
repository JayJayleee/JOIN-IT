import React from "react";
import { useNavigate } from "react-router-dom";

function AdNav1(props: any) {
  const navigate = useNavigate();
  const logout = () => {
    window.localStorage.clear();
    navigate("/");
  };
  return (
    <div className="adboardcontainer">
      <div className="AD_nav">
        <img
          className="smallLogo"
          src="/Assets/Images/Logo.png"
          alt="logo img"
        />
        <hr />
        <div className="spacefornav marginfornav flexing">
          <img
            className="icon"
            src="/Assets/Images/Forward Arrow.png"
            alt="directicon"
          />
          <a
            className="ADfont"
            href="/"
            style={{ cursor: "pointer" }}
            onClick={logout}
          >
            사이트로 바로가기
          </a>
        </div>

        <h2
          style={{
            alignSelf: "baseline",
            color: "#858585",
            marginLeft: "10px",
          }}
        >
          사이트 관리
        </h2>
        <div className="AD_nav_section">
          <div
            className="spaceforupdown flexing"
            onClick={() => props.setNavsection(0)}
            style={{
              backgroundColor: props.navSection === 0 ? "#0F5953" : "#353535",
            }}
          >
            <div className="flexing spaceforleft" style={{ cursor: "pointer" }}>
              <img
                className="icon"
                src="/Assets/Images/Dumbbell.png"
                alt="directicon"
              />
              <h2 className="ADfont ">운동 리스트 관리</h2>
            </div>
          </div>
          <div
            className="spaceforupdown flexing"
            onClick={() => props.setNavsection(1)}
            style={{
              backgroundColor: props.navSection === 1 ? "#0F5953" : "#353535",
            }}
          >
            <div className="flexing spaceforleft" style={{ cursor: "pointer" }}>
              <img
                className="icon"
                src="/Assets/Images/PhysicalTherapy.png"
                alt="directicon"
              />
              <h2 className="ADfont">치료사 리스트 관리</h2>
            </div>
          </div>
          <div
            className="spaceforupdown flexing"
            onClick={() => props.setNavsection(2)}
            style={{
              backgroundColor: props.navSection === 2 ? "#0F5953" : "#353535",
            }}
          >
            <div className="flexing spaceforleft" style={{ cursor: "pointer" }}>
              <img
                className="icon"
                src="https://i.imgur.com/ppzFiri.png"
                alt="directicon"
              />
              <h2 className="ADfont">환자 리스트 관리</h2>
            </div>
          </div>
        </div>
        <div
          className="ADfont"
          onClick={logout}
          style={{
            marginBottom: "0",
            color: "white",
            width: "100%",
            height: "6rem",
            backgroundColor: "#58867A",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: "0",
          }}
        >
          로그아웃
        </div>
      </div>
    </div>
  );
}

export default AdNav1;
