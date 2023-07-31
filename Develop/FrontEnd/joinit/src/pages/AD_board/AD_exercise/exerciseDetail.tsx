import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import ExerciseCard from "./exerciseCard";

function AdExerciseDetail() {
  const { trainingId } = useParams();

  interface ExerciseProp {
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
  const navigate = useNavigate();
  const [exerciseDetail, setExerciseDetail] = useState<ExerciseProp | null>(
    null
  );

  const updatePage = () => {
    navigate(`/AdExerciseUpdate/${trainingId}`);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`/api/training/${trainingId}`);
        setExerciseDetail(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [trainingId]);

  return (
    <div>
      {exerciseDetail ? (
        <div>
          <h1>{exerciseDetail.trainingName}</h1>
          <div>
            <h3>운동 미리 보기</h3>
            <ExerciseCard props={exerciseDetail} />

            <h3>등록된 운동</h3>
            <img src="/Assets/Images/exercise.png" alt="" />
            <h3>등록된 필터</h3>
            <img src="/Assets/Images/filter.png" alt="" />
          </div>
          <div>
            <h2>운동 상세 정보</h2>
            <div>
              <div>
                <h3>운동 이름</h3>
                <p>{exerciseDetail.trainingName}</p>
              </div>
              {/* <div>
                <h3>운동 분류</h3>
                <p>{exerciseDetail.trainingName}</p>
              </div> */}
              <div>
                <h3>운동 난이도</h3>
                <p>{exerciseDetail.difficulty}</p>
              </div>
              <div>
                <h3>운동 URL</h3>
                <p>{exerciseDetail.trainingURL}</p>
              </div>
              <div>
                <div>
                  <h3>시작점</h3>
                  <p>{exerciseDetail.startPoint}</p>
                </div>
                <div>
                  <h3>중심점</h3>
                  <p>{exerciseDetail.middlePoint}</p>
                </div>
                <div>
                  <h3>끝 점</h3>
                  <p>{exerciseDetail.endPoint}</p>
                </div>
              </div>
              <div>
                <h3>운동 설명</h3>
                <p>{exerciseDetail.description}</p>
              </div>
            </div>
          </div>
          <button onClick={updatePage}>수정하기</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default AdExerciseDetail;
