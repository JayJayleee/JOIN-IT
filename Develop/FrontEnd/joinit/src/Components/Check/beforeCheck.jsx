import React, { useEffect, useState } from "react";
import "./beforeCheck.css";
import WebCamCheck from "./WebCamCheck";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

function BeforeCheck() {
  let params = useParams();
  let navigate = useNavigate();

  const [countdown, setCountdown] = useState(null);
  const [ExerciseInfodata, setExerciseInfodata] = useState({});
  const [loading, setLoading] = useState(true);
  const [filterImgRoute, setFilterImgRoute] = useState(null);
  const [activateScreenShot, setActivateScreenShot] = useState(false);

  useEffect(() => {
    const headers = {
      "context-Type": "apllication/json",
      Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
    };
    const url = `/api/prescription/training/${params.prescriptionId}`;

    const fetchData = () => {
      axios
        .get(url, { headers })
        .then((response) => {
          setExerciseInfodata(response.data.result);
          setFilterImgRoute(response.data.result.training.filterImgRoute);
          setLoading(false); // 데이터 로드 완료 후 loading 값 업데이트
        })
        .catch((error) => {
          console.error(error);
          setLoading(false); // 데이터 로드 완료 후 loading 값 업데이트
        });
    };

    fetchData();
  }, []);

  const handleClick = () => {
    setCountdown(5);
    const countdownTimer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);
    setTimeout(async () => {
      clearInterval(countdownTimer);
      setCountdown(null);
      await setActivateScreenShot(true);
      // alert("완료되었습니다. 운동 / 코칭 페이지로 이동합니다.");
    }, 5000);
  };

  const temp = () => {
    if (params.type === "coaching") {
      navigate(`/patient/coaching/${params.prescriptionId}`);
    } else if (params.type === "exercise") {
      navigate(`/patient/exercise/${params.prescriptionId}`);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="beforeCheck">
      <div className="beforeCheckdiv">
        <div className="beforeCheck_left">
          <div className="beforeCheck_left_left">
            <WebCamCheck
              ExerciseInfodata={ExerciseInfodata}
              prescriptionId={params.prescriptionId}
              activateScreenShot={activateScreenShot}
              setActivateScreenShot={setActivateScreenShot}
              type={params.type}
              temp={temp}
            />
          </div>
          <img src={filterImgRoute} alt="filterimg" className="filterimg" />
        </div>
        <div className="beforeCheck_right col">
          <div className="beforeCheck_right_right">
            <div
              className="beforeCheck_Btn"
              onClick={handleClick}
              style={{ cursor: "pointer" }}
            >
              {countdown !== null ? countdown : "촬영 시작하기"}
            </div>
          </div>
          <div className="beforeCheck_image">
            <img
              src="/Assets/Images/beforecheck_image.png"
              alt="beforecheck_image"
              className="beforecheck_image"
            />
          </div>
          <div className="beforeCheck_explain col">
            <p>1. 예시와 같이 화면의 가이드라인에 따라 몸을 움직여주세요.</p>
            <p>2. 가이드 라인과 정확하게 같지 않아도 괜찮습니다.</p>
            <p>
              3. 억지로 가이드 라인에 맞추려하지 마세요, 무리하지 않는 선에서
              진행합니다.
            </p>
            <p>
              4. 상단에 촬영 시작하기 버튼을 누르고 5초 뒤 사진이 촬영됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BeforeCheck;
