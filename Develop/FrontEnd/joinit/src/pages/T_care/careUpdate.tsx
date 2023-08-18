import { useState, useEffect } from "react";
import axios from "axios";
import "./careCreate.css";
import { useNavigate, useParams } from "react-router-dom";

interface Care {
  treatmentId: number;
  jointId: number;
  jointName: string;
  patientName: string;
  patientPhone: string;
  accidentDetail: string;
  significant: string;
  summary: string;
  startTime: string;
}

interface PrevCare {
  treatmentId: number;
  jointId: number;
  jointName: string;
  patientName: string;
  patientPhone: string;
  accidentDetail: string;
  treatmentSignificant: string;
  summary: string;
  startTime: string;
}
function CareUpdate() {
  // 링크로 보낼 때, training ID 보낼 것 요청하기
  const { careId } = useParams();
  const parsedCareId = parseInt(careId!);

  //params 말고 state로 전달한다면... 아래 구문 쓰기
  // const userPk = window.localStorage.getItem("userPk");
  //const treatmentId = useLocation();

  const [prevCareInfo, setPrevCareInfo] = useState<PrevCare>({
    treatmentId: 0,
    jointId: 0,
    jointName: "",
    patientName: "",
    patientPhone: "",
    accidentDetail: "",
    treatmentSignificant: "",
    summary: "",
    startTime: "",
  });

  //등록된 치료 정보를 조회하는 axios 요청
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/treatment/update/${parsedCareId}`
        );
        setPrevCareInfo(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (parsedCareId) {
      fetchData();
    }
  }, [parsedCareId]);

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

  const [careinfo, setcareinfo] = useState<Care>({
    treatmentId: parsedCareId!,
    jointId: prevCareInfo.jointId,
    jointName: prevCareInfo.jointName,
    patientName: prevCareInfo.patientName,
    patientPhone: prevCareInfo.patientPhone,
    accidentDetail: prevCareInfo.accidentDetail,
    significant: prevCareInfo.treatmentSignificant,
    summary: prevCareInfo.summary,
    startTime: prevCareInfo.startTime,
  });

  const findJointIdByName = (name: string) => {
    const foundJoint = painpointlist.find(
      (painpoint) => painpoint.jointName === name
    );
    return foundJoint ? foundJoint.jointId : 0; // 이름에 해당하는 jointId가 없을 경우 0을 반환
  };

  useEffect(() => {
    setcareinfo((prevCareinfo) => ({
      ...prevCareinfo,
      jointId: findJointIdByName(prevCareInfo.jointName),
      jointName: prevCareInfo.jointName,
      patientName: prevCareInfo.patientName,
      patientPhone: prevCareInfo.patientPhone,
      accidentDetail: prevCareInfo.accidentDetail,
      significant: prevCareInfo.treatmentSignificant,
      summary: prevCareInfo.summary,
      startTime: prevCareInfo.startTime,
    }));
  }, [prevCareInfo]);

  // 이후 input에 작성한 내용을 다시 전달함
  const {
    treatmentId,
    jointId,
    jointName,
    patientName,
    patientPhone,
    accidentDetail,
    significant,
    summary,
  } = careinfo;

  const addJointName = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.options[e.target.selectedIndex];

    setPrevCareInfo({
      ...prevCareInfo,
      jointId: parseInt(selectedOption.value),
      jointName: selectedOption.innerText,
    });
  };

  const navigate = useNavigate();
  const backToList = () => {
    navigate("/tboard");
  };

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

  const savecare = async () => {
    if (
      !treatmentId ||
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
        await axios.put(`/api/treatment/${parsedCareId}`, careinfo, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
          },
        });
        alert("수정이 완료되었습니다.");
        navigate(-1);
      } catch (error) {
        console.log("오류 발생:", error);
        console.log(careinfo);
        alert("문제가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  const endcare = async () => {
    try {
      await axios.put(`/api/treatment/end/${treatmentId}`);
      alert("치료가 종료되었습니다.");
      navigate("/tboard");
    } catch (error) {
      console.log("오류 발생:", error);
      console.log(careinfo);
      alert("문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

  console.log(prevCareInfo);
  console.log("입력값", careinfo);
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
                defaultValue={prevCareInfo.patientName}
              />
            </div>

            <div style={{ width: "45%" }}>
              <h2 className="labels">환부</h2>
              <select
                name="jointId"
                id="jointId"
                className="selects"
                onChange={addJointName}
                defaultValue={prevCareInfo.jointId}
              >
                <option value="">선택하세요</option>
                {painpointlist.map((painpoint, index) => (
                  <option
                    key={index}
                    value={painpoint.jointId}
                    selected={painpoint.jointName === prevCareInfo.jointName}
                  >
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
          defaultValue={prevCareInfo.patientPhone}
          id="phone"
        />
        <h2 className="labels">진료 시작일</h2>
        <input
          className="inputs"
          type="date"
          defaultValue={prevCareInfo.startTime}
          onChange={onInputChange}
          name="startTime"
        />
        <h2 className="labels">치료 요약</h2>
        <input
          className="inputs"
          type="text"
          onChange={onInputChange}
          defaultValue={prevCareInfo.summary}
          name="summary"
        />
        <h2 className="labels">사고 경위</h2>
        <input
          className="inputs"
          type="text"
          onChange={onInputChange}
          name="accidentDetail"
          defaultValue={prevCareInfo.accidentDetail}
        />
        <h2 className="labels">특이 사항</h2>
        <textarea
          className="textareaCreate"
          onChange={onInputChange}
          name="significant"
          defaultValue={prevCareInfo.treatmentSignificant}
        />
        <div className="buttonContainer">
          <div className=" button-sizeBig" onClick={savecare}>
            <div className="eff-sizeBig"></div>
            <p> 수정 완료 </p>
          </div>
          <div style={{ width: "10px" }}></div>
          <div className="button-sizeSmall" onClick={endcare}>
            <div className="eff-sizeSmall"></div>
            <p> 치료 종료</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CareUpdate;
