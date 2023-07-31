import React from "react";
import { useEffect, useState } from "react";
import ExerciseCard from "./exerciseCard";
import "./exerciseList.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

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

function ExerciseList() {
  const navigate = useNavigate();
  const [exerciseList, setExerciseList] = useState<Exerciseprop[]>([]);
  useEffect(() => {
    async function fetchdata() {
      const { data } = await axios.get("/api/training/list");
      setExerciseList(data);
      console.log(data);
    }
    fetchdata();
  }, [exerciseList.length]);
  const createPage = () => {
    navigate("/ExerciseCreate");
  };
  return (
    <div className="exerciseLists">
      <div>
        <div className="titlecontainer">
          <h1 className="exerciseLists_title">전체 운동 리스트</h1>
          <div className="addcontainer" onClick={createPage}>
            <img src="/Assets/Images/plus.png" alt="plus" />
            <div style={{ width: "20px" }}></div>
            <h2>운동 추가하기</h2>
          </div>
        </div>
        <div className="searchbar">
          <select className="select" id="">
            <option value="1">환부-운동 분류</option>
            <option value="2">목-어디</option>
            <option value="3">손목-어디</option>
            <option value="4">허리-어디</option>
          </select>
          <div style={{ width: "20px" }}></div>
          <div className="button-2">
            <div className="eff-2"></div>
            <a href="#"> 선택 </a>
          </div>
        </div>
        <div>
          <h1>호흡</h1>
          <hr className="hr" />
          <div className="exerciseList_container">
            {exerciseList.map((a, e) => {
              return <ExerciseCard key={a.trainingId} props={a} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExerciseList;
