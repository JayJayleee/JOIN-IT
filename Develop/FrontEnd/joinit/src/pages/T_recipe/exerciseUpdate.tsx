import React, { useState, useEffect } from "react";
import Editor from "../T_care/Editor";
import "./exercise.css";
import { useParams } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ExerciseList from "./exerciseList";

interface ExerciseForm {
  prescriptionId: number;
  trainingId: number;
  setCount: number;
  prescriptionProcessTime: string;
  prescriptionComment: string;
  targetAngle: number;
}

function ExerciseUpdate() {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Context-Type": "application/json",
    "Access-Control-Allow-Credentials": "true",
  };
  const navigate = useNavigate();
  const [GoToExerciseList, setGoToExerciseList] = useState(false);
  const [loading, setLoading] = useState(true);
  const GoToExerciseListHandler = () => {
    setGoToExerciseList(false);
  };

  const getPrescriptionId = useParams<{ PrescriptionId?: string }>();
  const numPrescriptionId = getPrescriptionId.PrescriptionId
    ? parseInt(getPrescriptionId.PrescriptionId, 10)
    : 0;
  console.log(getPrescriptionId);
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
    prescriptionId: numPrescriptionId,
    trainingId: 0,
    setCount: 0,
    prescriptionProcessTime: "",
    prescriptionComment: "",
    targetAngle: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/prescription/update/${numPrescriptionId}`
        ); //${getPrescriptionId.state}

        setExercise((prevExercise) => ({
          ...prevExercise,
          prescriptionProcessTime: data.prescriptionProcessTime.substr(0, 10),
          prescriptionComment: data.prescriptionComment,
          trainingId: data.training.trainingID,
          setCount: data.setCount,
          targetAngle: data.targetAngle,
        }));
        setEditorData(data.prescriptionComment);
        setSelectTrainingId(data.training.trainingID);
        setTrainingName(data.training.trainingName);
        setLoading(false);
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

    const intValue = ["setCount", "targetAngle"];
    const parsedValue = intValue.includes(name)
      ? parseInt(value, 10) || 0
      : value;

    setExercise((prevExercise) => ({
      ...prevExercise,
      [name]: parsedValue,
    }));
  };

  const updateSelectedTraining = (trainingId: number, trainingName: string) => {
    setSelectTrainingId(trainingId);
    setTrainingName(trainingName);

    setExercise((prevExercise) => ({
      ...prevExercise,
      trainingId: trainingId,
    }));
  };

  const saveSelect = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (
      !exercise.trainingId ||
      !exercise.setCount ||
      !exercise.prescriptionProcessTime ||
      !exercise.targetAngle ||
      !editorData
    ) {
      alert("모든 칸을 입력해주세요.");
    } else {
      const updatedExercise = {
        ...exercise,
        prescriptionComment: editorData,
      };

      try {
        await axios.put(
          `/api/prescription/training/${numPrescriptionId}`,
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
        alert("운동 수정이 완료되었습니다.");
        navigate("/Tboard");
      } catch (error) {
        console.log("오류 발생:", error);
        console.log(updatedExercise);
        alert("문제가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  const deleteSelect = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    try {
      await axios.delete(`/api/prescription/training/${numPrescriptionId}`);
      alert("운동 삭제가 완료되었습니다.");
      navigate("/Tboard");
    } catch (error) {
      console.log("오류 발생:", error);
      console.log(exercise);
      alert("문제가 발생했습니다. 다시 시도해주세요.");
    }
  };
  const backToList = () => {
    navigate("/tboard");
  };
  return (
    <div className="background" style={{ overflow: "scroll" }}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="container">
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
              />
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
              value={exercise.prescriptionProcessTime}
              onChange={onInputChange}
            />
          </div>
          <div className="patientInfo1">
            <div style={{ width: "280px" }}>
              <h2 className="labels">세트</h2>
              <input
                className="inputs"
                type="number"
                name="setCount"
                value={exercise.setCount}
                onChange={onInputChange}
                min={0}
              />
            </div>
            <div className="whiteSpace"></div>
            <div style={{ width: "280px" }}>
              <h2 className="labels">목표 각도</h2>
              <input
                className="inputs"
                type="number"
                name="targetAngle"
                value={exercise.targetAngle}
                onChange={onInputChange}
                min={0}
                max={360}
              />
            </div>
          </div>
          <div className="whiteSpace"></div>
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
      )}
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

export default ExerciseUpdate;
