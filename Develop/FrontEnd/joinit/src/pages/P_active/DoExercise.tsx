import React, { useEffect, useState } from "react";
import "./DoExercise/DoExercise.css";
import WebCam from "./DoExercise/WebCam";
import Timer from "./DoExercise/Timer";
import ExerciseInfo from "./DoExercise/ExerciseInfo";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import YouTube, { YouTubeProps } from "react-youtube";

import axios from "axios";

function DoExercise() {
  //params로 받은 데이터 적용하기
  let params = useParams<{ prescriptionId?: string }>();

  const navigate = useNavigate();

  const [ExerciseInfodata, setExerciseInfodata] = useState({});
  const [videoId, setvideoId] = useState("");
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const headers = {
      "context-Type": "apllication/json",
      "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
    };
    const url: string = `/api/prescription/training/${params.prescriptionId}`;

    const fetchData = () => {
      axios
        .get(url, { headers })
        .then((response) => {
          setExerciseInfodata(response.data.result);
          setvideoId(response.data.result.training.trainingURL);
          setLoading(false); // 데이터 로드 완료 후 loading 값 업데이트
        })
        .catch((error) => {
          setLoading(false); // 데이터 로드 완료 후 loading 값 업데이트
        });
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // youtube 설정 관련
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const opts: YouTubeProps["opts"] = {
    height: "350",
    width: "640",
    videoId: videoId,
  };

  const prescriptionEndFtn = () => {
    alert('운동을 종료합니다.');
    navigate('/pboard', {replace: true, state: {afterCheck: true, prescriptionId: params.prescriptionId}})
  }

  return (
    <div className="DoExercise">
      <div className="DoExercisediv row">
        <div className="DoExercisediv_left col">
          <WebCam ExerciseInfodata={ExerciseInfodata} />
        </div>
        <div className="DoExercisediv_right col">
          <div className="DoExercisediv_Assistantdiv row">
            <Timer />
            <div className="Done_Exercise_Btn" style={{cursor: 'pointer'}} onClick={(e) => {prescriptionEndFtn()}}>종료하기</div>
          </div>
          <div className="Exercise_Youtube">
            <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />
          </div>
          <div className="Exercise_info">
            <ExerciseInfo ExerciseInfodata={ExerciseInfodata} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoExercise;
