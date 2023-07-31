import Editor from "../T_care/Editor";
import "./exercise.css";

function ExerciseSelect() {
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
          <h4 className="labels">운동 일자</h4>
          <input className="input" type="date" />
        </div>
        <div className="patientInfo1">
          <div style={{ width: "280px" }}>
            <h4 className="labels">세트</h4>
            <input className="input" type="text" />
          </div>
          <div className="whiteSpace"></div>
          <div style={{ width: "280px" }}>
            <h4 className="labels">목표 각도</h4>
            <input className="input" type="text" />
          </div>
        </div>
        <Editor />
        <div className="button-2">
          <div className="eff-2"></div>
          <a href="#"> 운동 등록하기 </a>
        </div>
      </div>
    </div>
  );
}

export default ExerciseSelect;
