import React from "react";
import { useEffect, useState } from "react";
import ExerciseCard from "./exerciseCard";
import "./exerciseList.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Exerciseprop {
  description: string;
  difficulty: number;
  endPoint: number;
  middlePoint: number;
  rom: number;
  startPoint: number;
  trainingId: number;
  trainingName: string;
  trainingURL: string;
}

interface selectexerciseprops {
  trainingId: string;
  trainingName: string;
  thumbnailImgRoute: string;
  difficulty: string;
}

function ExerciseList() {
  const navigate = useNavigate();
  // 환부 분류 리스트 가져오기
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

  //등록되어 있는 운동 리스트 불러오기
  const [exerciseList, setExerciseList] = useState<Exerciseprop[]>([]);
  useEffect(() => {
    async function fetchdata() {
      const { data } = await axios.get("/api/training/list");
      setExerciseList(data);
    }
    fetchdata();
  }, [exerciseList.length]);

  const createPage = () => {
    navigate("/adExerciseCreate");
  };

  const [ExerciseOptionList, setExerciseOptionList] = useState<
    selectexerciseprops[]
  >([]);

  const [selectMappingIdValue, setSelectMappingIdValue] = useState(0);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(event.target.value, 10);
    setSelectMappingIdValue(selectedValue);
  };

  // 환부 별 운동 리스트를 불러오기
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

  return (
    <div className="exerciseLists">
      <div>
        <div className="titlecontainer">
          <h1 className="exerciseLists_title">전체 운동 리스트</h1>
          <div className="addcontainer" onClick={createPage}>
            <img src="/Assets/Images/plus.png" alt="plus" />
            <div style={{ width: "20px" }}></div>
            <h1>운동 추가하기</h1>
          </div>
        </div>
        <div>
          <div className="select-div">
            {" "}
            <select
              name="jointId"
              id="jointId"
              className="selects"
              onChange={handleSelectChange}
              style={{
                marginBottom: "2rem",
                width: "10%",
              }}
            >
              <option value="">전체</option>
              {painpointlist.map((painpoint, index) => (
                <option key={index} value={painpoint.mappingId}>
                  {painpoint.jointName}-{painpoint.trainingTypeName}
                </option>
              ))}
            </select>
          </div>

          <hr className="hr" />
          <div className="exerciseList_container">
            {ExerciseOptionList.map((a, e) => {
              return <ExerciseCard key={a.trainingId} props={a} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExerciseList;
