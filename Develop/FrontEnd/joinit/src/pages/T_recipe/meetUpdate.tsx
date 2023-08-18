import React from "react";
import "./meet.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "../T_care/Editor";

interface ExerciseForm {
  prescriptionProcessTime: string;
  prescriptionComment: string;
}

function MeetUpdate() {
  const navigate = useNavigate();
  const getPrescriptionId = useParams();
  const [editorData, setEditorData] = useState("");

  // console.log(getPrescriptionId.PrescriptionId);
  const handleEditorChange = (inputdata: string) => {
    setEditorData(inputdata);
    setMeeting((prevMeeting) => ({
      ...prevMeeting,
      prescriptionComment: inputdata,
    }));
  };

  const [meeting, setMeeting] = useState<ExerciseForm>({
    prescriptionProcessTime: formatDatetime(new Date()),
    prescriptionComment: editorData,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/prescription/update/${getPrescriptionId.PrescriptionId}`
        );
        const formattedTime = formatDatetime(data.prescriptionProcessTime);
        setMeeting((prevMeeting) => ({
          ...prevMeeting,
          prescriptionProcessTime: formattedTime,
          prescriptionComment: data.prescriptionComment,
        }));
        setEditorData(data.prescriptionComment);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (getPrescriptionId) {
      fetchData();
    }
  }, [getPrescriptionId.state]);
  console.log("Meeting", meeting);
  const { prescriptionProcessTime, prescriptionComment } = meeting;

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "prescriptionProcessTime") {
      const formattedValue = formatDatetime(new Date(value));
      setMeeting((prevMeeting) => ({
        ...prevMeeting,
        [name]: formattedValue,
      }));
    } else {
      setMeeting((prevMeeting) => ({
        ...prevMeeting,
        [name]: value,
      }));
    }
  };

  const saveSelect = async (e: any) => {
    e.preventDefault();
    setMeeting({
      ...meeting,
      prescriptionComment: editorData,
    });
    if (!prescriptionProcessTime || !prescriptionComment) {
      alert("모든 칸을 입력해주세요.");
    } else {
      try {
        await axios.put(
          `/api/prescription/meeting/${getPrescriptionId.PrescriptionId}`,
          meeting,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access-token")}`,
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": "true",
            },
          }
        );
        alert("대면 수정이 완료되었습니다.");
        navigate('/Tboard');
      } catch (error) {
        console.log("오류 발생:", error);
        console.log(meeting);
        alert("문제가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  const deleteSelect = async (e: any) => {
    try {
      await axios.delete(
        `/api/prescription/${getPrescriptionId.PrescriptionId}`
      );

      alert("대면 삭제가 완료되었습니다.");
      navigate('/Tboard');
    } catch (error) {
      console.log("오류 발생:", error);
      console.log(meeting);
      alert("문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const backToList = () => {
    navigate("/tboard");
  };
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
            value={meeting.prescriptionProcessTime.substring(0, 16)}
            onChange={onInputChange}
          />
          <h2 className="labels">대면 내용</h2>
          <Editor
            data={meeting.prescriptionComment}
            onChange={handleEditorChange}
          />
          <div className="button-sizeBig" onClick={saveSelect}>
            <div className="eff-sizeBig"></div>
            <p> 수정 완료 </p>
          </div>
          <div style={{ width: "10px" }}></div>
          <div className="button-sizeSmall" onClick={deleteSelect}>
            <div className="eff-sizeSmall"></div>
            <p> 삭제하기</p>
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

export default MeetUpdate;
