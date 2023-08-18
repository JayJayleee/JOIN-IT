import React from "react";
import "./AD_board/AdBoard.css";
import ExerciseList from "./AD_board/AD_exercise/exerciseList";
import PatientList from "./AD_board/AD_Patient/patientList";
import TherapistList from "./AD_board/AD_therapist/therapistList";
import AdNav from "./AD_board/AdNav1";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function AdBoard() {
  const navnum = 0;
  let [navSection, setNavsection] = useState(navnum);
  const { state } = useLocation();
  useEffect(() => {
    if (state) {
      setNavsection(state.setnav);
    }
  }, [state]);

  return (
    <div className="containboardforadboard">
      <div className="flexcontainerforadboard">
        <div className="navigationforadboard">
          <AdNav navSection={navSection} setNavsection={setNavsection} />
        </div>
        <div className="tabcontent">
          <TabContent navSection={navSection} />
        </div>
      </div>
    </div>
  );
}

function TabContent(props: any) {
  const ExerciseListPage = <ExerciseList />;
  const PatientListPage = <PatientList />;
  const TherapistListPage = <TherapistList />;
  return [ExerciseListPage, TherapistListPage, PatientListPage][
    props.navSection
  ];
}
export default AdBoard;
