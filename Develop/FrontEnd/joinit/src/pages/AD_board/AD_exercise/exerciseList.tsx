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
        <h1>전체 운동 리스트</h1>
        <div onClick={createPage}>
          <img src="/Assets/Images/plus.png" alt="plus" />
          <h3>운동 추가하기</h3>
        </div>
        <div>
          <select name="painpoint" id="">
            <option value="1">환부</option>
            <option value="2">목</option>
            <option value="3">손목</option>
            <option value="4">허리</option>
          </select>
          <select name="exercise" id="">
            <option value="1">운동 분류</option>
            <option value="2">목</option>
            <option value="3">손목</option>
            <option value="4">허리</option>
          </select>
          <button>검색</button>
        </div>
        <div>
          <h3>호흡</h3>
          <hr />
          {exerciseList.map((a, e) => {
            return <ExerciseCard key={a.trainingId} props={a} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default ExerciseList;
