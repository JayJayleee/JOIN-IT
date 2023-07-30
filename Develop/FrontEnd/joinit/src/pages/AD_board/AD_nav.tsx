import React from "react";
import "./AD_nav.css";
import ExerciseList from "./AD_exercise/exerciseList";
import PatientList from "./AD_Patient/patientList";
import TherapistList from "./AD_therapist/therapistList";
import { useState } from "react";

function AdBoard() {
  const navnum = 0;
  let [navSection, setNavsection] = useState(navnum);
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
          <a className="ADfont" href="/">
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
        <div
          className="spacefornav"
          onClick={() => setNavsection(0)}
          style={{ backgroundColor: navSection === 0 ? "#0F5953" : "#353535" }}
        >
          <img
            className="icon"
            src="/Assets/Images/Dumbbell.png"
            alt="directicon"
          />
          <h2 className="ADfont">운동 리스트 관리</h2>
        </div>
        <div
          className="spacefornav"
          onClick={() => setNavsection(1)}
          style={{ backgroundColor: navSection === 1 ? "#0F5953" : "#353535" }}
        >
          <img
            className="icon"
            src="/Assets/Images/Physical Therapy.png"
            alt="directicon"
          />
          <h2 className="ADfont">치료사 리스트 관리</h2>
        </div>
        <div
          className="spacefornav"
          onClick={() => setNavsection(2)}
          style={{ backgroundColor: navSection === 2 ? "#0F5953" : "#353535" }}
        >
          <img
            className="icon"
            src="/Assets/Images/user Account.png"
            alt="directicon"
          />
          <h2 className="ADfont">환자 리스트 관리</h2>
        </div>
      </div>
      <div className="tabcontent">
        <TabContent className="tabcontent" navSection={navSection} />
      </div>
    </div>
  );
}

function TabContent(props: any) {
  const ExerciseListPage = <ExerciseList />;
  const PatientListPage = <PatientList />;
  const TherapistListPage = <TherapistList />;
  return [ExerciseListPage, PatientListPage, TherapistListPage][
    props.navSection
  ];
}
export default AdBoard;
