import React from "react";
import Editor from "../T_care/Editor";
import "./coach.css";
import ExerciseList from "./exerciseList";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

interface ExerciseForm {
  prescriptionId: number;
  trainingId: number;
  prescriptionProcessTime: string;
  prescriptionComment: string;
  targetAngle: number;
}

function CoachUpdate() {
  const navigate = useNavigate();
  const getPrescriptionId = useParams<{ careId?: string }>();
  const numPrescriptionId = getPrescriptionId.careId
    ? parseInt(getPrescriptionId.careId, 10)
    : 0;
  console.log(getPrescriptionId);
  const [editorData, setEditorData] = useState("");
  const handleEditorChange = (inputdata: string) => {
    setEditorData(inputdata);
    setExercise((prevExercise) => ({
      ...prevExercise,
      prescriptionComment: inputdata,
    }));
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
    prescriptionId: numPrescriptionId,
    trainingId: 0,
    prescriptionProcessTime: formatDatetime(new Date()),
    prescriptionComment: editorData,
    targetAngle: 0,
  });

  const {
    prescriptionId,
    trainingId,
    prescriptionProcessTime,
    prescriptionComment,
    targetAngle,
  } = exercise;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/prescription/update/${numPrescriptionId}`
        ); //${getPrescriptionId.state}

        setExercise((prevExercise) => ({
          ...prevExercise,

          prescriptionProcessTime: formatDatetime(data.prescriptionProcessTime),
          prescriptionComment: data.prescriptionComment,
          trainingId: data.training.trainingID,
          setCount: data.setCount,
          targetAngle: data.targetAngle,
        }));
        setEditorData(data.prescriptionComment);
        setSelectTrainingId(data.training.trainingID);
        setTrainingName(data.training.trainingName);
        console.log("겟요청", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (numPrescriptionId) {
      fetchData();
    }
  }, [numPrescriptionId]);
  console.log("exercise", exercise);
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

  const updateSelectedTraining = (trainingId: number, trainingName: string) => {
    setSelectTrainingId(trainingId);
    setTrainingName(trainingName);

    setExercise((prevExercise) => ({
      ...prevExercise,
      trainingId: trainingId,
    }));
  };
  const saveSelect = async (e: any) => {
    e.preventDefault();
    setExercise({
      ...exercise,
      prescriptionComment: editorData,
      trainingId: selectTrainingId,
    });
    if (
      !exercise.trainingId ||
      !exercise.prescriptionProcessTime ||
      !exercise.targetAngle ||
      !exercise.prescriptionComment
    ) {
      alert("모든 칸을 입력해주세요.");
    } else {
      const updatedExercise = {
        ...exercise,
        prescriptionComment: editorData,
      };
      try {
        await axios.put(
          `/api/prescription/coaching/${numPrescriptionId}`,
          updatedExercise,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access-token")}`,
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": "true",
            },
          }
        );
        alert("코칭 수정이 완료되었습니다.");
        navigate('/Tboard');
      } catch (error) {
        console.log("오류 발생:", error);
        console.log(exercise);
        alert("문제가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  const deleteSelect = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    try {
      await axios.delete(`/api/prescription/${numPrescriptionId}`);
      alert("코칭 삭제가 완료되었습니다.");
      navigate('/Tboard');
    } catch (error) {
      console.log("오류 발생:", error);
      console.log(exercise);
      alert("문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // 운동 선택창 props
  const [GoToExerciseList, setGoToExerciseList] = useState(false);
  const GoToExerciseListHandler = () => {
    setGoToExerciseList(false);
  };
  const backToList = () => {
    navigate("/tboard");
  };

  return (
    <div className="background" style={{ overflow: "scroll" }}>
      {GoToExerciseList && (
        <ExerciseList
          GoToExerciseListHandler={GoToExerciseListHandler}
          setSelectTrainingId={setSelectTrainingId}
          updateSelectedTraining={updateSelectedTraining}
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
          style={{ cursor: "pointer" }}
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
            value={exercise.prescriptionProcessTime}
            onChange={onInputChange}
          />
          <h2 className="labels">목표 각도</h2>
          <input
            className="inputs"
            type="number"
            name="targetAngle"
            value={exercise.targetAngle}
            onChange={onInputChange}
            min="0"
          />
        </div>
        <div style={{ width: "100%" }}>
          <h2 className="labels">코멘트</h2>
          <Editor
            data={exercise.prescriptionComment}
            onChange={handleEditorChange}
          />

          <div className="button-sizeBig" onClick={saveSelect}>
            <div className="eff-sizeBig"></div>
            <p> 수정 완료 </p>
          </div>
          <div style={{ width: "10px" }}></div>
          <div className="button-sizeSmall" onClick={deleteSelect}>
            <div className="eff-sizeSmall"></div>
            <p> 삭제하기 </p>
          </div>
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

export default CoachUpdate;
