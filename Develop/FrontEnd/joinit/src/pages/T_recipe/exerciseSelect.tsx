import { useState, useEffect } from "react";
import Editor from "../T_care/Editor";
import "./exercise.css";
import { useParams } from "react-router";
import ExerciseList from "./exerciseList";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface ExerciseForm {
  treatmentId: number;
  trainingId: number;
  setCount: number;
  prescriptionProcessTime: string;
  prescriptionComment: string;
  targetAngle: number;
}

function ExerciseSelect() {
  const navigate = useNavigate();
  const [GoToExerciseList, setGoToExerciseList] = useState(false);

  const GoToExerciseListHandler = () => {
    setGoToExerciseList(false);
  };

  // params로 치료 아이디 가져온 뒤, 숫자로 변경
  const params = useParams();
  const getTreatmentID = params.treatmentId
    ? parseInt(params.treatmentId, 10)
    : 0;

  const [TrainingName, setTrainingName] = useState<any>("");
  const [selectTrainingId, setSelectTrainingId] = useState<any>(0);
  const [editorData, setEditorData] = useState("");
  const handleEditorChange = (inputdata: string) => {
    setEditorData(inputdata);

    setExercise((prevExercise) => ({
      ...prevExercise,
      prescriptionComment: inputdata,
    }));
  };

  const [exercise, setExercise] = useState<ExerciseForm>({
    treatmentId: getTreatmentID,
    trainingId: 0,
    setCount: 0,
    prescriptionProcessTime: "",
    prescriptionComment: editorData,
    targetAngle: 0,
  });

  const {
    treatmentId,
    trainingId,
    setCount,
    prescriptionProcessTime,
    prescriptionComment,
    targetAngle,
  } = exercise;

  console.log(prescriptionComment);
  console.log("제출 데이터", exercise);
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setExercise({
      ...exercise,
      [name]: value,
    });
    const intValue = ["setCount", "targetAngle"];
    const parsedValue = intValue.includes(name)
      ? parseInt(value, 10) || 0
      : value;

    setExercise({
      ...exercise,
      [name]: parsedValue,
    });
  };

  const saveSelect = async (e: any) => {
    e.preventDefault();
    setExercise({
      ...exercise,
      prescriptionComment: editorData,
      trainingId: selectTrainingId,
    });
    if (
      !treatmentId ||
      !trainingId ||
      !setCount ||
      !prescriptionProcessTime ||
      !targetAngle ||
      !prescriptionComment
    ) {
      alert("모든 칸을 입력해주세요.");
    } else {
      try {
        await axios.post("/api/prescription/training", exercise, {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${localStorage.getItem("access-token")}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
          },
        });
        alert("운동 등록이 완료되었습니다.");
        navigate("/Tboard");
      } catch (error) {
        console.log("오류 발생:", error);
        console.log(exercise);
        alert("문제가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  const updateSelectedTraining = (trainingId: number, trainingName: string) => {
    setSelectTrainingId(trainingId);
    setTrainingName(trainingName);

    setExercise((prevExercise) => ({
      ...prevExercise,
      trainingId: trainingId,
    }));
  };

  const backToList = () => {
    navigate("/tboard");
  };

  const [currentDatetime, setCurrentDatetime] = useState("");
  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    const formattedDatetime = `${year}-${month}-${day}`;
    setCurrentDatetime(formattedDatetime);
    setExercise((prevExercise) => ({
      ...prevExercise,
      prescriptionProcessTime: currentDatetime,
    }));
  }, [currentDatetime]);

  return (
    <div className="background" style={{ overflow: "scroll" }}>
      {GoToExerciseList && (
        <ExerciseList
          updateSelectedTraining={updateSelectedTraining}
          GoToExerciseListHandler={GoToExerciseListHandler}
          setSelectTrainingId={setSelectTrainingId}
          selectTrainingId={selectTrainingId}
          setTrainingName={setTrainingName}
          TrainingName={TrainingName}
        />
      )}
      <div className="container">
        <img
          className="smallLogo"
          src="/Assets/Images/Logo.png"
          alt="logo img"
          onClick={backToList}
          style={{ cursor: "pointer", marginTop: "20rem" }}
        />
        <h1>계획있는 운동으로 건강해지세요!</h1>

        <div className="widthForInput">
          <h2 className="labels">운동 내용</h2>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              className="inputs"
              value={TrainingName}
              id={selectTrainingId}
              type="text"
              style={{ width: "85%", borderRadius: "10px 0px 0px 10px " }}
              onChange={onInputChange}
            />{" "}
            <div
              className="button-selectEx"
              onClick={() => setGoToExerciseList(true)}
            >
              <div className="eff-selectEx"></div>
              <p>선택</p>
            </div>
          </div>
          <h2 className="labels">운동 일자</h2>
          <input
            className="inputs"
            type="date"
            name="prescriptionProcessTime"
            onChange={onInputChange}
            defaultValue={currentDatetime}
          />
        </div>
        <div className="patientInfo1">
          <div style={{ width: "280px" }}>
            <h2 className="labels">세트</h2>
            <input
              className="inputs"
              type="number"
              name="setCount"
              onChange={onInputChange}
            />
          </div>
          <div className="whiteSpace"></div>
          <div style={{ width: "280px" }}>
            <h2 className="labels">목표 각도</h2>
            <input
              className="inputs"
              type="number"
              name="targetAngle"
              onChange={onInputChange}
            />
          </div>
        </div>
        <div className="whiteSpace"></div>
        <div style={{ width: "100%" }}>
          <h2 className="labels">코멘트</h2>
          <Editor data={editorData} onChange={handleEditorChange} />
          <div className="button-exercisesave" onClick={saveSelect}>
            <div className="eff-exercisesave"></div>
            <p> 운동 등록하기 </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExerciseSelect;
