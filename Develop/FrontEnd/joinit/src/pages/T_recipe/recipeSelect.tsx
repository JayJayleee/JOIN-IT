import React from "react";
import "./recipeSelect.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";

function RecipeSelect() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const selectCare = () => {
    const selectSession = document.getElementById("select") as HTMLInputElement;
    if (selectSession.value === "1") {
      navigate(`/CoachCreate/${state.prescriptionId}`);
    } else if (selectSession.value === "2") {
      navigate(`/ExerciseSelect/${state.prescriptionId}`);
    } else if (selectSession.value === "3") {
      navigate(`/MeetCreate/${state.prescriptionId}`);
    } else {
      alert("처방 종류를 선택해주세요.");
    }
  };
  const backToList = () => {
    navigate("/tboard");
  };

  return (
    <div className="background">
      <div className="container">
        <img
          className="smallLogo"
          src="/Assets/Images/Logo.png"
          alt="logo img"
          onClick={backToList}
          style={{ cursor: "pointer" }}
        />
        <p className="careTitle">무슨 처방인가요?</p>
        <p className="careSubTitle">처방 종류를 선택해주세요.</p>

        <select className="careselects" name="bodypart" id="select">
          <option value="choose">please</option>
          <option value="1">코칭</option>
          <option value="2">운동</option>
          <option value="3">대면</option>
        </select>
        <div className="button-care" onClick={selectCare}>
          <div className="eff-care"></div>
          <a href="#"> 다음</a>
        </div>
      </div>
    </div>
  );
}

export default RecipeSelect;
