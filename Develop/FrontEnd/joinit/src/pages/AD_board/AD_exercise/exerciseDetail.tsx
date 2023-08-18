import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import ExerciseCard from "./exerciseCard";
import "./exerciseUpdate.css";
import AdNav2 from "../AdNav2";
import axios from "axios";

function AdExerciseDetail() {
  const { trainingId } = useParams();
  const navnum = 0;
  const [nav] = useState(navnum);
  console.log(nav);

  interface TrainingTypeList {
    jointName: any;
    mappingId: any;
    trainingName: any;
  }

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
    jointTrainingTypeMappingDtoList: Array<TrainingTypeList>;
    thumbnailImgRoute: string;
    filterImgRoute: string;
    imageImgRoute: string;
  }

  const navigate = useNavigate();
  const [exerciseDetail, setExerciseDetail] = useState<ExerciseProp | null>(
    null
  );

  // 더미데이터
  // const dummyExerciseDetail: ExerciseProp = {
  //   trainingId: 1,
  //   trainingName: "목 돌리기 운동",
  //   trainingURL: "http://123.123.123.123/123123",
  //   startPoint: 1,
  //   middlePoint: 2,
  //   endPoint: 3,
  //   difficulty: 5,
  //   description: "목 돌리기 운동입니다. 목을 조심하세요",
  //   rom: 30,
  //   jointNameAndTrainingTypeList: ["어깨", "팔", "목"],
  // };

  //더미데이터 적용을 위한 코드
  // React.useEffect(() => {
  //   setExerciseDetail(dummyExerciseDetail);
  // }, []);

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
    <div className="containboard">
      <div className="flexcontainer">
        <div className="navigation">
          <AdNav2 nav={nav} />
        </div>
        {exerciseDetail ? (
          <div className="buttonseparate">
            <div className="titlediv">
              <h1 className="exercisetitle">{exerciseDetail.trainingName}</h1>
            </div>
            <div className="flexcontainer">
              <div className="detailfirstarea">
                {/* 운동 미리 보기 등록 */}
                <div className="col admin-register-divide-license">
                  <h1 className="titletext">미리 보기 이미지</h1>
                  <div className="col imgflex">
                    <div className="admin-register-preview">
                      <img
                        src={exerciseDetail.thumbnailImgRoute}
                        alt=""
                        style={{ width: "100%", height: "90%" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="col admin-register-divide-license">
                  <h1 className="titletext">운동 GIF</h1>
                  <div className="col imgflex">
                    <div className="admin-register-preview">
                      <img
                        src={exerciseDetail.imageImgRoute}
                        alt=""
                        style={{ width: "100%", height: "90%" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="col admin-register-divide-license">
                  <h1 className="titletext">필터 이미지</h1>
                  <div className="col imgflex">
                    <div className="admin-register-preview">
                      <img
                        src={exerciseDetail.filterImgRoute}
                        alt=""
                        style={{ width: "100%", height: "90%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="detailleftarea">
                <div>
                  <div>
                    <h1 className="titletext">운동 이름</h1>
                    <div className="detail-info">
                      <p className="bodytext">{exerciseDetail.trainingName}</p>
                    </div>
                  </div>

                  <div>
                    <h1 className="titletext">운동 분류</h1>
                    <div className="detail-info">
                      {exerciseDetail.jointTrainingTypeMappingDtoList.map(
                        (item, index) => (
                          <p className="bodytext space-bodytext" key={index}>
                            {item.jointName}-{item.trainingName} /
                          </p>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <h1 className="titletext">운동 난이도 / ROM</h1>
                    <div className="detail-info">
                      <p className="bodytext">
                        LV.{exerciseDetail.difficulty} / {exerciseDetail.rom} °
                      </p>
                    </div>
                  </div>

                  {/* <div>
                    <h1 className="titletext">ROM</h1>
                    <div className="detail-info">
                      <p className="bodytext"></p>
                    </div>
                  </div> */}

                  <div>
                    <h1 className="titletext">운동 URL</h1>
                    <div className="detail-info">
                      <p className="bodytext">{exerciseDetail.trainingURL}</p>
                    </div>
                  </div>
                  <div>
                    <h1 className="titletext">운동 설명</h1>
                    <div
                      className="bodytextforeditor"
                      id="exerciseExplanation"
                      dangerouslySetInnerHTML={{
                        __html: exerciseDetail.description,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="detailrightarea">
                <div className="rightside-container">
                  <div className="right-left-area">
                    <div className="imgflex">
                      <img
                        src="https://i.imgur.com/m9MWgRD.png"
                        alt="guideline_img"
                        style={{ width: "70%" }}
                      />
                    </div>
                    <div className="guideline-point-container">
                      <div className="guideline-point">
                        <h1 className="titletext">시작점</h1>
                        <p className="bodytext" style={{ margin: "0.5rem" }}>
                          {exerciseDetail.startPoint}
                        </p>
                      </div>
                      <div className="guideline-point">
                        <h1 className="titletext">중심점</h1>
                        <p className="bodytext" style={{ margin: "0.5rem" }}>
                          {exerciseDetail.middlePoint}
                        </p>
                      </div>
                      <div className="guideline-point">
                        <h1 className="titletext">끝 점</h1>
                        <p className="bodytext" style={{ margin: "0.5rem" }}>
                          {exerciseDetail.endPoint}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="right-right-area">
                    <div className="button-2 " onClick={updatePage}>
                      <div className="eff-2"></div>
                      <p>수정하기</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="bodytext">Loading...</p>
        )}
      </div>
    </div>
  );
}

export default AdExerciseDetail;
