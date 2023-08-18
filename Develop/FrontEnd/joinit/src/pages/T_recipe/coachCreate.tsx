import React from "react";
import Editor from "../T_care/Editor";
import "./coach.css";
import ExerciseList from "./exerciseList";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";

interface ExerciseForm {
  treatmentId: number;
  trainingId: number;
  prescriptionProcessTime: string;
  prescriptionComment: string;
  targetAngle: number;
}

function CoachCreate() {
  const navigate = useNavigate();

  // params로 치료 아이디 가져온 뒤, 숫자로 변경
  const params = useParams();
  const getTreatmentID = params.treatmentId
    ? parseInt(params.treatmentId, 10)
    : 0;

  //에디터 정보 받아오는 부분
  const [editorData, setEditorData] = useState("");
  const handleEditorChange = (inputdata: string) => {
    setEditorData(inputdata);
  };

  // 기본 날짜 지정
  const [currentDatetime, setCurrentDatetime] = useState("");
  const [selectTrainingId, setSelectTrainingId] = useState<any>(0);
  const [TrainingName, setTrainingName] = useState<any>("");
  console.log("날짜", currentDatetime);

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const formattedDatetime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    setCurrentDatetime(formattedDatetime);
    setExercise((prevExercise) => ({
      ...prevExercise,
      prescriptionProcessTime: currentDatetime,
      prescriptionComment: editorData,
      trainingId: selectTrainingId,
    }));
  }, [currentDatetime, editorData, selectTrainingId]);

  const [exercise, setExercise] = useState<ExerciseForm>({
    treatmentId: getTreatmentID,
    trainingId: 0,
    prescriptionProcessTime: formatDatetime(new Date()),
    prescriptionComment: editorData,
    targetAngle: 0,
  });

  const {
    treatmentId,
    trainingId,
    prescriptionProcessTime,
    prescriptionComment,
    targetAngle,
  } = exercise;

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "prescriptionProcessTime") {
      // 날짜 포맷 변환
      setExercise((prevExercise) => ({
        ...prevExercise,
        prescriptionProcessTime: formatDatetime(value),
      }));
    } else {
      const intValue = ["targetAngle"];
      const parsedValue = intValue.includes(name)
        ? parseInt(value, 10) || 0
        : value;

      setExercise((prevExercise) => ({
        ...prevExercise,
        [name]: parsedValue,
        prescriptionProcessTime:
          name === "prescriptionProcessTime" && value === ""
            ? currentDatetime
            : prevExercise.prescriptionProcessTime,
      }));
    }
  };

  console.log(exercise);

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
      !prescriptionProcessTime ||
      !targetAngle ||
      !prescriptionComment
    ) {
      alert("모든 칸을 입력해주세요.");
    } else {
      console.log("세이브", exercise);
      try {
        await axios.post("/api/prescription/coaching", exercise, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
          },
        });
        alert("코칭 등록이 완료되었습니다.");
        navigate("/Tboard");
      } catch (error) {
        console.log("오류 발생:", error);
        console.log(exercise);
        alert("문제가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  // 운동 선택창 props
  const [GoToExerciseList, setGoToExerciseList] = useState(false);
  const GoToExerciseListHandler = () => {
    setGoToExerciseList(false);
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
        <h1>실시간 코칭으로 건강해지세요!</h1>
        <div className="widthForInput">
          <h2 className="labels">코칭 내용</h2>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              className="inputs"
              value={TrainingName}
              id={selectTrainingId}
              type="text"
              style={{ width: "85%", borderRadius: "5px 0px 0px 5px " }}
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
          <h2 className="labels">코칭 일자</h2>
          <input
            name="prescriptionProcessTime"
            className="inputs"
            type="datetime-local"
            min="2022-01-01T00:00"
            max="2100-12-30T11:30"
            defaultValue={currentDatetime.substring(0, 16)}
            onChange={onInputChange}
          />
          <h2 className="labels">목표 각도</h2>
          <input
            className="inputs"
            type="number"
            name="targetAngle"
            onChange={onInputChange}
            min="0"
            style={{ marginBottom: "3.5rem" }}
          />
        </div>

        <Editor data={editorData} onChange={handleEditorChange} />

        <div className="button-exercisesave" onClick={saveSelect}>
          <div className="eff-exercisesave"></div>
          <p> 코칭 등록하기 </p>
        </div>
      </div>
    </div>
  );
}

function formatDatetime(datetime: any) {
  const date = new Date(datetime);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export default CoachCreate;
