import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import "./T_recipe/exerciseList.css";
import YouTube, { YouTubeProps } from "react-youtube";

interface BeforeSurvey {
  angle: number;
  beforeImgRoute: string;
  prescriptionId: number;
}

interface Training {
  trainingID: number;
  trainingName: string | null;
  trainingURL: string;
  startPoint: number;
  middlePoint: number;
  endPoint: number;
  difficulty: number;
  description: string;
  rom: number;
  jointTrainingTypeMappingDtoList: any[] | null;
  thumbnailImgRoute: string | null;
  filterImgRoute: string | null;
  imageImgRoute: string | null;
}

interface AfterSurvey {
  painDegree: number;
  difficulty: number;
  satisfaction: number;
  painRelief: number;
  etc: string;
  prescriptionId: number;
}

interface ResultData {
  beforeSurvey: BeforeSurvey;
  training: Training;
  prescriptionComment: string;
  afterSurvey: AfterSurvey;
}

function ExerciseDetailPage() {
  const navigate = useNavigate();
  const prescriptionId = useParams();

  // youtube 설정 관련
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const opts: YouTubeProps["opts"] = {
    height: "500rem",
    width: "100%",
  };

  //유튜브 아이디만 가져오는 함수
  const extractVideoId = (url: string | undefined) => {
    if (!url) {
      return ""; //타입이 undefined일 경우 대비해서 지정
    } else {
      const videoIdPattern = /v=([^&]+)/;
      const match = url.match(videoIdPattern);
      return match ? match[1] : "";
    }
  };

  // 불러온 운동 디테일 정보들 저장
  const [exercisDetailInfo, setExercisDetailInfo] = useState<ResultData | null>(
    null
  );
  useEffect(() => {
    const fetchExerciseData = async () => {
      try {
        const { data } = await axios.get(
          `/api/prescription/detail/${prescriptionId.prescriptionId}`
        );
        setExercisDetailInfo(data.result);
      } catch (error) {
        alert("잘못된 접근입니다.");
        if (localStorage.getItem('userType') === 'T') {
          navigate('/Tboard');
        } else {
          navigate('/Pboard');
        }
      }
    };
    fetchExerciseData();
  }, [prescriptionId]);

  // 후설문 페이지 그래프용
  const q1Progress = exercisDetailInfo?.afterSurvey?.painDegree || 0;
  const q1ProgressStyle = {
    background: `linear-gradient(to right, #0f5953 ${q1Progress * 10}%, #ccc ${
      q1Progress * 10
    }%)`,
  };

  const q2Progress = exercisDetailInfo?.afterSurvey?.difficulty || 0;
  const q2ProgressStyle = {
    background: `linear-gradient(to right, #0f5953 ${q2Progress * 10}%, #ccc ${
      q2Progress * 10
    }%)`,
  };

  const q3Progress = exercisDetailInfo?.afterSurvey?.satisfaction || 0;
  const q3ProgressStyle = {
    background: `linear-gradient(to right, #0f5953 ${q3Progress * 10}%, #ccc ${
      q3Progress * 10
    }%)`,
  };

  const q4Progress = exercisDetailInfo?.afterSurvey?.painRelief || 0;
  const q4ProgressStyle = {
    background: `linear-gradient(to right, #0f5953 ${q4Progress * 10}%, #ccc ${
      q4Progress * 10
    }%)`,
  };
  const valueWidth = "7.5rem";
  const youtubeID = exercisDetailInfo?.training.trainingURL;

  return (
    <div className="coach-detail-container">
      <img
        src="/Assets/Images/Logo.png"
        alt="logo"
        style={{
          width: "15%",
          marginTop: "5%",
          marginBottom: "7%",
        }}
      />
      <div className="coach-detail-container-margin ">
        {exercisDetailInfo?.beforeSurvey ? (
          <div className="coach-detail-margin">
            <h3 className="coach-detail-title">자가 진단</h3>
            <img
              src={exercisDetailInfo?.beforeSurvey.beforeImgRoute}
              alt="img"
              style={{ width: "100%" }}
            />
          </div>
        ) : (
          <div className="empty-div"></div>
        )}
        <div className="coach-detail-margin">
          <h1 className="coach-detail-title">운동 영상</h1>
          <YouTube videoId={youtubeID} opts={opts} onReady={onPlayerReady} />
        </div>
        <div className="coach-detail-margin">
          <h1 className="coach-detail-title">운동 개요</h1>
          <div
            className="coach-detail-section"
            dangerouslySetInnerHTML={{
              __html: exercisDetailInfo?.training.description!,
            }}
          ></div>
        </div>
        <div className="coach-detail-margin">
          <h1 className="coach-detail-title">주의 사항</h1>
          <div
            className="coach-detail-section"
            dangerouslySetInnerHTML={{
              __html: exercisDetailInfo?.prescriptionComment!,
            }}
          ></div>
        </div>
        {exercisDetailInfo?.afterSurvey ? (
          <div className="coach-survey-margin">
            <h1 className="coach-detail-title">자가 설문</h1>
            <div className="surveyForm-flex">
              <div className="surveyForm">
                <img
                  src="/Assets/Images/Logo.png"
                  alt="logo"
                  style={{
                    width: "30%",
                    marginBottom: "7%",
                  }}
                />
                <h1 className="questionTitle col-flex">
                  운동 중 통증은 어느 정도 인가요? :{" "}
                  {exercisDetailInfo?.afterSurvey.painDegree}
                </h1>
                <div className="range col col-flex">
                  <div className="range-slider col">
                    <div className="col-flex" style={{ width: valueWidth }}>
                      <span className="valueFontSize">1</span>
                      <span>전혀 아프지 않음</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={10}
                      value={exercisDetailInfo?.afterSurvey.painDegree}
                      className="range-input"
                      id=""
                      step={1}
                      style={q1ProgressStyle}
                      name="painDegree"
                    />

                    <div className="col-flex" style={{ width: valueWidth }}>
                      <span className="valueFontSize">10</span>
                      <span>고통이 매우 심함</span>
                    </div>
                  </div>
                </div>
                <h1 className="questionTitle col-flex ">
                  운동 난이도는 어느 정도 였나요? :{" "}
                  {exercisDetailInfo?.afterSurvey.difficulty}
                </h1>
                <div className="range col col-flex">
                  <div className="range-slider col">
                    <div className="col-flex" style={{ width: valueWidth }}>
                      <span className="valueFontSize">1</span>
                      <span>매우 쉬움</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={10}
                      value={exercisDetailInfo?.afterSurvey.difficulty}
                      className="range-input"
                      id=""
                      step={1}
                      style={q2ProgressStyle}
                      name="difficulty"
                    />

                    <div className="col-flex" style={{ width: valueWidth }}>
                      <span className="valueFontSize">10</span>

                      <span>매우 어려움</span>
                    </div>
                  </div>
                </div>
                <h1 className="questionTitle col-flex ">
                  운동에 대한 만족도는 어느 정도 였나요? :{" "}
                  {exercisDetailInfo?.afterSurvey.satisfaction}
                </h1>
                <div className="range col col-flex">
                  <div className="range-slider col">
                    <div className="col-flex" style={{ width: valueWidth }}>
                      <span className="valueFontSize">1</span>
                      <span>매우 불만족</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={10}
                      value={exercisDetailInfo?.afterSurvey.satisfaction}
                      className="range-input"
                      id=""
                      step={1}
                      style={q3ProgressStyle}
                      name="satisfaction"
                    />

                    <div className="col-flex" style={{ width: valueWidth }}>
                      <span className="valueFontSize">10</span>
                      <span>매우 만족</span>
                    </div>
                  </div>
                </div>
                <h1 className="questionTitle col-flex ">
                  통증이 어느 정도 완화된 것 같나요? :
                  {exercisDetailInfo?.afterSurvey.painRelief}
                </h1>
                <div className="range col col-flex">
                  <div className="range-slider col">
                    <div className="col-flex" style={{ width: valueWidth }}>
                      <span className="valueFontSize">1</span>
                      <span>전혀 완화되지 않음</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={10}
                      value={exercisDetailInfo?.afterSurvey.painRelief}
                      className="range-input"
                      id=""
                      step={1}
                      style={q4ProgressStyle}
                      name="painRelief"
                    />

                    <div className="col-flex" style={{ width: valueWidth }}>
                      <span className="valueFontSize">10</span>
                      <span>매우 완화되었음</span>
                    </div>
                  </div>
                </div>

                <h1
                  className="questionTitle col-flex "
                  style={{ marginBottom: "2rem" }}
                >
                  개선될 점이 있다면 작성해주세요.
                </h1>
                <input
                  className="carecode-textarea "
                  name="etc"
                  style={{
                    marginTop: "1rem",
                    marginBottom: "1rem",
                  }}
                  value={exercisDetailInfo?.afterSurvey.etc}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="empty-div"></div>
        )}
        <div className="button-exdetail" style={{cursor: 'pointer'}} onClick={() => {localStorage.getItem('userType') === 'T'? navigate('/Tboard') : navigate('/Pboard')}}>
          <div className="eff-exdetail"></div>
          <p> 뒤로가기 </p>
        </div>
      </div>
    </div>
  );
}

export default ExerciseDetailPage;
