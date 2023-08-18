import React from "react";
import "./meet.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Editor from "../T_care/Editor";

interface ExerciseForm {
  treatmentId: number;
  prescriptionProcessTime: string;
  prescriptionComment: string;
}

function MeetCreate() {
  const navigate = useNavigate();
  const params = useParams();

  // params로 치료 아이디 가져온 뒤, 숫자로 변경
  const getTreatmentID = params.treatmentId
    ? parseInt(params.treatmentId, 10)
    : 0;

  const [editorData, setEditorData] = useState("");
  const handleEditorChange = (inputdata: string) => {
    setEditorData(inputdata);
  };
  const [meeting, setMeeting] = useState<ExerciseForm>({
    treatmentId: getTreatmentID!,
    prescriptionProcessTime: formatDatetime(new Date()),
    prescriptionComment: editorData,
  });
  console.log("params", meeting);
  const { treatmentId, prescriptionProcessTime, prescriptionComment } = meeting;

  const [currentDatetime, setCurrentDatetime] = useState("");
  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const formattedDatetime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    setCurrentDatetime(formattedDatetime);
    setMeeting((prevExercise) => ({
      ...prevExercise,
      prescriptionProcessTime: currentDatetime,
      prescriptionComment: editorData,
    }));
  }, [currentDatetime, editorData]);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "prescriptionProcessTime") {
      // 날짜 포맷 변환
      setMeeting((prevExercise) => ({
        ...prevExercise,
        prescriptionProcessTime: formatDatetime(value),
      }));
    } else {
      setMeeting((prevExercise) => ({
        ...prevExercise,
        [name]: value,
        prescriptionProcessTime:
          name === "prescriptionProcessTime" && value === ""
            ? currentDatetime
            : prevExercise.prescriptionProcessTime,
      }));
    }
  };

  const saveSelect = async (e: any) => {
    e.preventDefault();
    setMeeting({
      ...meeting,
      prescriptionComment: editorData,
    });
    if (!prescriptionProcessTime || !prescriptionComment || !treatmentId) {
      alert("모든 칸을 입력해주세요.");
    } else {
      console.log("세이브", meeting);
      try {
        await axios.post("/api/prescription/meeting", meeting, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
          },
        });
        alert("대면 등록이 완료되었습니다.");
        navigate('/Tboard');
      } catch (error) {
        console.log("오류 발생:", error);
        console.log(meeting);
        alert("문제가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  const backToList = () => {
    navigate("/tboard");
  };

  console.log(meeting);
  return (
    <div className="background">
      <div className="container">
        <img
          className="smallLogo"
          src="/Assets/Images/Logo.png"
          alt="logo img"
          onClick={backToList}
          style={{ cursor: "pointer" }}
        />
        <h1>우리 언제 만날까요?</h1>
        <div className="widthForInput">
          <h2 className="labels">대면 일자</h2>
          <input
            name="prescriptionProcessTime"
            className="inputs"
            type="datetime-local"
            min="2022-01-01T00:00"
            max="2100-12-30T11:30"
            defaultValue={currentDatetime.substring(0, 16)}
            onChange={onInputChange}
          />
          <h2 className="labels">대면 내용</h2>
          <Editor data={editorData} onChange={handleEditorChange} />
          <div className="button-exercisesave" onClick={saveSelect}>
            <div className="eff-exercisesave"></div>
            <p> 운동 등록하기 </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatDatetime(datetime: any) {
  const date = new Date(datetime);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export default MeetCreate;
