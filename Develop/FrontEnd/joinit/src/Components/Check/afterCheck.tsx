import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useLocation } from "react-router";
import "./afterCheck.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface propType {
  selfCheck: () => void;
  prescriptionId: number;
}

interface SelfCheckInfoForm {
  prescriptionId: number;
  painDegree: number;
  difficulty: number;
  satisfaction: number;
  painRelief: number;
  etc: string;
}

function AfterCheck({ selfCheck, prescriptionId }: propType) {
  // 나중에 받아올 처방 아이디

  const navigate = useNavigate();

  const headers = {
    "context-Type": "apllication/json",
    Authorization: `Bearer ${localStorage.getItem("access-token")}`,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
  };

  const [selfCheckInfo, setSelfCheckInfo] = useState<SelfCheckInfoForm>({
    prescriptionId,
    painDegree: 0,
    difficulty: 0,
    satisfaction: 0,
    painRelief: 0,
    etc: "",
  });

  const AfterCheck = async () => {
    try {
      await axios.put(`/api/prescription/end/${prescriptionId}`, { headers });
      navigate("/pboard", { replace: true, state: {} });
      selfCheck();
      window.location.reload();
    } catch (err) {}
  };

  const saveSelfCheck = async () => {
    const getpainDegree = (
      document.querySelector("[name='painDegree']") as HTMLInputElement
    ).value;
    const getdifficulty = (
      document.querySelector("[name='difficulty']") as HTMLInputElement
    ).value;
    const getsatisfaction = (
      document.querySelector("[name='satisfaction']") as HTMLInputElement
    ).value;
    const getpainRelief = (
      document.querySelector("[name='painRelief']") as HTMLInputElement
    ).value;

    const getetc = (document.querySelector("[name='etc']") as HTMLInputElement)
      .value;

    if (
      !selfCheckInfo.painDegree ||
      !selfCheckInfo.difficulty ||
      !selfCheckInfo.satisfaction ||
      !selfCheckInfo.painRelief ||
      !selfCheckInfo.etc
    ) {
      alert("모든 칸을 입력해주세요.");
    } else {
      setSelfCheckInfo({
        ...selfCheckInfo,
        painDegree: parseInt(getpainDegree, 10),
        difficulty: parseInt(getdifficulty, 10),
        satisfaction: parseInt(getsatisfaction, 10),
        painRelief: parseInt(getpainRelief, 10),
        etc: getetc,
      });
      try {
        await axios.post("/api/survey/after", selfCheckInfo);
        AfterCheck();
      } catch (error) {
        alert("문제가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  const valueWidth = "120px";
  const [question1Value, setQuestion1Value] = useState<number>(0);

  const handleq1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    const q1Value = parseInt(event.target.value, 10);
    setQuestion1Value(q1Value);
    setSelfCheckInfo({
      ...selfCheckInfo,
      painDegree: q1Value,
    });
  };

  const q1Progress = (question1Value / 100) * 100;
  const q1ProgressStyle = {
    background: `linear-gradient(to right, #0f5953 ${q1Progress * 10}%, #ccc ${
      q1Progress * 10
    }%)`,
  };

  const [question2Value, setQuestion2Value] = useState<number>(0);

  const handleq2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    const q2Value = parseInt(event.target.value, 10);
    setQuestion2Value(q2Value);
    setSelfCheckInfo({
      ...selfCheckInfo,
      difficulty: q2Value,
    });
  };

  const q2Progress = (question2Value / 100) * 100;
  const q2ProgressStyle = {
    background: `linear-gradient(to right, #0f5953 ${q2Progress * 10}%, #ccc ${
      q2Progress * 10
    }%)`,
  };

  const [question3Value, setQuestion3Value] = useState<number>(0);

  const handleq3Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    const q3Value = parseInt(event.target.value, 10);
    setQuestion3Value(q3Value);
    setSelfCheckInfo({
      ...selfCheckInfo,
      satisfaction: q3Value,
    });
  };

  const q3Progress = (question3Value / 100) * 100;
  const q3ProgressStyle = {
    background: `linear-gradient(to right, #0f5953 ${q3Progress * 10}%, #ccc ${
      q3Progress * 10
    }%)`,
  };

  const [question4Value, setQuestion4Value] = useState<number>(0);

  const handleq4Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    const q4Value = parseInt(event.target.value, 10);
    setQuestion4Value(q4Value);
    setSelfCheckInfo({
      ...selfCheckInfo,
      painRelief: q4Value,
    });
  };

  const q4Progress = (question4Value / 100) * 100;
  const q4ProgressStyle = {
    background: `linear-gradient(to right, #0f5953 ${q4Progress * 10}%, #ccc ${
      q4Progress * 10
    }%)`,
  };

  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <div className="carecoderegister-backdrop" />,
        document.getElementById("backdrop-root")!
      )}
      <div className="carecodePage">
        <div className="carecodePage-flex">
          <img
            src="/Assets/Images/Logo.png"
            alt="logo"
            style={{
              width: "30%",
              marginTop: "3%",
              marginBottom: "7%",
              marginLeft: "35%",
            }}
          />
          <h1 className="questionTitle col-flex">
            운동 중 통증은 어느 정도 인가요? : {question1Value}
          </h1>
          <div className="range col col-flex">
            <div className="range-slider col">
              <div className="col-flex" style={{ width: valueWidth }}>
                <span className="valueFontSize">1</span>
                {/* <br /> */}
                <span>전혀 아프지 않음</span>
              </div>
              <input
                type="range"
                min={0}
                max={10}
                value={question1Value}
                className="range-input"
                id=""
                step={1}
                onChange={handleq1Change}
                style={q1ProgressStyle}
                name="painDegree"
              />

              <div className="col-flex" style={{ width: valueWidth }}>
                <span className="valueFontSize">10</span>
                {/* <br /> */}
                <span>고통이 매우 심함</span>
              </div>
            </div>
          </div>
          <h1 className="questionTitle col-flex ">
            운동 난이도는 어느 정도 였나요? : {question2Value}
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
                value={question2Value}
                className="range-input"
                id=""
                step={1}
                onChange={handleq2Change}
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
            운동에 대한 만족도는 어느 정도 였나요? : {question3Value}
          </h1>
          <div className="range col col-flex">
            <div className="range-slider col">
              <div className="col-flex" style={{ width: valueWidth }}>
                <span className="valueFontSize">1</span>
                {/* <br /> */}
                <span>매우 불만족</span>
              </div>
              <input
                type="range"
                min={0}
                max={10}
                value={question3Value}
                className="range-input"
                id=""
                step={1}
                onChange={handleq3Change}
                style={q3ProgressStyle}
                name="satisfaction"
              />

              <div className="col-flex" style={{ width: valueWidth }}>
                <span className="valueFontSize">10</span>
                {/* <br /> */}
                <span>매우 만족</span>
              </div>
            </div>
          </div>
          <h1 className="questionTitle col-flex ">
            통증이 어느 정도 완화된 것 같나요? : {question4Value}
          </h1>
          <div className="range col col-flex">
            <div className="range-slider col">
              <div className="col-flex" style={{ width: valueWidth }}>
                <span className="valueFontSize">1</span>
                {/* <br /> */}
                <span>전혀 완화되지 않음</span>
              </div>
              <input
                type="range"
                min={0}
                max={10}
                value={question4Value}
                className="range-input"
                id=""
                step={1}
                onChange={handleq4Change}
                style={q4ProgressStyle}
                name="painRelief"
              />

              <div className="col-flex" style={{ width: valueWidth }}>
                <span className="valueFontSize">10</span>
                {/* <br /> */}
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
              marginLeft: "20%",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
            value={selfCheckInfo.etc}
            onChange={(e) =>
              setSelfCheckInfo({ ...selfCheckInfo, etc: e.target.value })
            }
          />
          <div
            className="button-selfCheck"
            onClick={saveSelfCheck}
            style={{ marginLeft: "20%" }}
          >
            <div className="eff-selfCheck"></div>
            <p> 설문 완료 </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AfterCheck;
