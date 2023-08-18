import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import axios from "axios";
import "./exerciseList.css";
interface selectexerciseprops {
  trainingId: string;
  trainingName: string;
  thumbnailImgRoute: string;
  difficulty: string;
}

function ExerciseList(props: any) {
  const [painpointlist, setPainpointlist] = useState<any[]>([]);
  useEffect(() => {
    const fetchpainpointlistData = async () => {
      try {
        const { data } = await axios.get("/api/training/jointMapping");
        setPainpointlist(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchpainpointlistData();
  }, []);

  const [ExerciseOptionList, setExerciseOptionList] = useState<
    selectexerciseprops[]
  >([]);
  const [selectMappingIdValue, setSelectMappingIdValue] = useState(0);
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(event.target.value, 10);
    setSelectMappingIdValue(selectedValue);
  };

  useEffect(() => {
    const fetchExerciseListData = async () => {
      try {
        let response;
        if (selectMappingIdValue) {
          response = await axios.get(
            `/api/training/list/${selectMappingIdValue}`
          );
        } else {
          response = await axios.get(`/api/training/list`);
        }
        const exerciseOptionData = response.data;
        setExerciseOptionList(exerciseOptionData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (selectMappingIdValue) {
      fetchExerciseListData();
    } else {
      fetchExerciseListData();
    }
  }, [selectMappingIdValue]);

  const gobacktoList = (trainingId: any, trainingName: any) => {
    props.updateSelectedTraining(trainingId, trainingName);
    props.GoToExerciseListHandler(false);
  };

  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <div className="carecoderegister-backdrop" />,
        document.getElementById("backdrop-root")!
      )}
      <div className="carecodePage">
        <div className="exercise-card-container ">
          <img
            src="/Assets/Images/Logo.png"
            alt="logo img"
            style={{
              width: "30%",
              marginTop: "3%",
              marginBottom: "7%",
              marginLeft: "35%",
            }}
          />

          <div style={{ width: "100%" }}>
            <h1>운동 리스트</h1>
            <select
              name="jointId"
              id="jointId"
              className="selects"
              onChange={handleSelectChange}
              style={{ marginBottom: "2rem" }}
            >
              <option value="">전체</option>
              {painpointlist.map((painpoint, index) => (
                <option key={index} value={painpoint.mappingId}>
                  {painpoint.jointName}-{painpoint.trainingTypeName}
                </option>
              ))}
            </select>
            <div className="exercise-option-card-grid">
              {ExerciseOptionList.map((exercise, index) => {
                return (
                  <div
                    key={index}
                    className="exercise-option-card"
                    onClick={() =>
                      gobacktoList(exercise.trainingId, exercise.trainingName)
                    }
                  >
                    <img
                      src={exercise.thumbnailImgRoute}
                      alt="thumbnail"
                      style={{
                        width: "100%",
                        height: "100px",
                        borderBottom: "1px solid #a2a2a2",
                      }}
                    />
                    <div className="levelBox">LV.{exercise.difficulty}</div>
                    <div className="exercise-name-box">
                      {exercise.trainingName}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ExerciseList;
