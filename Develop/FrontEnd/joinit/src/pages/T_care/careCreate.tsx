import React, { useEffect, useState } from "react";
import "./careCreate.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Care {
  therapistId: string;
  jointId: number;
  jointName: string;
  patientName: string;
  patientPhone: string;
  accidentDetail: string;
  significant: string;
  summary: string;
  startTime: string;
}

function CareCreate() {
  const userPk = window.localStorage.getItem("userPk");
  const navigate = useNavigate();
  const today = new Date().toISOString().substring(0, 10);
  const [careinfo, setcareinfo] = useState<Care>({
    therapistId: userPk!,
    jointId: 0,
    jointName: "",
    patientName: "",
    patientPhone: "",
    accidentDetail: "",
    significant: "",
    summary: "",
    startTime: today,
  });

  // 이후 input에 작성한 내용을 다시 전달함
  const {
    therapistId,
    jointId,
    jointName,
    patientName,
    patientPhone,
    accidentDetail,
    significant,
    summary,
    startTime,
  } = careinfo;

  // input 데이터 axios 요청을 위해 모아서 저장하는 함수
  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    const focusPhoneNum = document.getElementById("phone")! as HTMLInputElement;
    if (focusPhoneNum.value) {
      focusPhoneNum.value = focusPhoneNum.value.replace(/[^0-9]/g, "");
    }
    setcareinfo({
      ...careinfo,
      [name]: value,
    });
  };

  const addJointName = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.options[e.target.selectedIndex];

    setcareinfo({
      ...careinfo,
      jointId: parseInt(selectedOption.value),
      jointName: selectedOption.innerText,
    });
  };

  // 환부 - 운동 분류 리스트를 불러옴
  const [painpointlist, setPainpointlist] = useState<any[]>([]);
  // 환부 리스트를 가져오는 axios 요청
  useEffect(() => {
    const fetchExerciseListData = async () => {
      try {
        const { data } = await axios.get("/api/joint");
        setPainpointlist(data);
      } catch (error) {
        alert("환부 데이터 조회에 실패하였습니다. 다시 시도해주세요.");
        console.error("Error fetching data:", error);
      }
    };
    fetchExerciseListData();
  }, []);

  // axios 요청을 통해 저장
  const saveExercise = async () => {
    if (
      !therapistId ||
      !jointId ||
      !jointName ||
      !patientName ||
      !patientPhone ||
      !accidentDetail ||
      !significant ||
      !summary
    ) {
      alert("모든 칸을 입력해주세요.");
    } else {
      try {
        await axios.post("/api/treatment", careinfo, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
          },
        });
        navigate("/Tboard");
      } catch (error) {
        console.log("오류 발생:", error);
        console.log(careinfo);
        console.log(userPk);
        alert("문제가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  const backToList = () => {
    navigate("/tboard");
  };

  console.log("제출 데이터 : ", careinfo);
  return (
    <div className="background">
      <div className="container">
        <img
          className="smallLogo"
          src="/Assets/Images/Logo.png"
          alt="logo img"
          onClick={backToList}
          style={{ marginTop: "20rem" }}
        />
        <h1>치료를 시작해볼까요?</h1>

        <div className="patientInfo1">
          <div className="input-flex">
            <div style={{ width: "45%" }}>
              <h2 className="labels">환자 이름</h2>
              <input
                className="inputs"
                type="text"
                onChange={onInputChange}
                name="patientName"
              />
            </div>

            <div style={{ width: "45%" }}>
              <h2 className="labels">환부</h2>
              <select
                name="jointId"
                id="jointId"
                className="selects"
                onChange={addJointName}
              >
                <option value="">선택하세요</option>
                {painpointlist.map((painpoint, index) => (
                  <option key={index} value={painpoint.jointId}>
                    {painpoint.jointName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="widthForInput">
        <h2 className="labels" id="phonenumber">
          환자 연락처
        </h2>
        <input
          className="inputs"
          type="text"
          onChange={onInputChange}
          name="patientPhone"
          id="phone"
        />
        <h2 className="labels">진료 시작일</h2>
        <input
          className="inputs"
          type="date"
          defaultValue={today}
          onChange={onInputChange}
          name="startTime"
        />
        <h2 className="labels">치료 요약</h2>
        <input
          className="inputs"
          type="text"
          onChange={onInputChange}
          name="summary"
        />
        <h2 className="labels">사고 경위</h2>
        <input
          className="inputs"
          type="text"
          onChange={onInputChange}
          name="accidentDetail"
        />
        <h2 className="labels">특이 사항</h2>
        <textarea
          className="textareaCreate"
          onChange={onInputChange}
          name="significant"
        />
        <div className="button-create" onClick={saveExercise}>
          <div className="eff-create"></div>
          <p> 치료 시작하기 </p>
        </div>
      </div>
    </div>
  );
}

export default CareCreate;
