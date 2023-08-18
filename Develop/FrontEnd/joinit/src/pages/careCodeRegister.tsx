import React, { useState, useEffect } from "react";
import "./PBoard/careCodeRegister.css";
import axios from "axios";
import ReactDOM from "react-dom";

interface propType {
  CareCodeRegister: () => void;
}

// modal 창으로 구현하기
function CareCodeRegister({ CareCodeRegister }: propType) {
  // axios header 정보
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Context-Type": "application/json",
  };

  // 받은 결과를 저장하기 위한 state
  const [treatmentCodeList, setCodeList] = useState<string[]>([]);
  // 입력 값들을 저장하는 state
  const [userName, setUserName] = useState("");
  const [phoneNumberInput, setPhoneNumber] = useState("");
  const [userInput, setUserInput] = useState("");
  const [firstBtnActive, setFirstBtnActive] = useState(false);
  // 인증 번호 입력창 활성화 여부 저장하는 state
  const [inputNumActive, setInputNumActive] = useState(false);

  const pwInputTag = document.getElementById(
    "pphoneNumberInput"
  )! as HTMLInputElement;

  let comment = "사용자 인증하기";
  if (inputNumActive) {
    comment = "치료 등록하기";
  }

  useEffect(() => {
    if (userName !== "" && phoneNumberInput !== "") {
      setFirstBtnActive(true);
    }
  }, [userName, phoneNumberInput]);

  /** 이메일 인증 클릭 혹은 이메일 입력 창에서 엔터 키 입력 시 실행하는 함수
   * 1. 이름과 이메일이 db에 존재하며, 매치하는지를 확인
   * 2. 확인이 되면 이메일로 번호를 발송 후, 알람으로 발송 완료 메시지 출력
   * 3. 인증 번호 입력 창 활성화
   */
  const CheckDbNameAndPhone = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.KeyboardEvent
  ) => {
    const userPk = localStorage.getItem("userPk");
    try {
      const Result = await axios.get(
        `/api/treatment/code?patientName=${userName}&patientPhone=${phoneNumberInput}`,
        { headers }
      );
      if (Result.data.patientId === userPk) {
        setCodeList(Result.data.treatmentCodeList);
        setInputNumActive(true);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 400) {
          alert(
            "해당 정보로 가입한 내용이 없습니다.\n정보를 다시 입력해주세요"
          );
          setUserName("");
          setPhoneNumber("");
          setInputNumActive(false);
        } else {
          alert("서버 에러가 발생하였습니다.\n조금 후에 다시 시도해주세요.");
        }
      }
    }
  };

  /** 치료 번호 입력 후 치료 등록하기 클릭 시 실행하는 함수
   */
  const CheckAllInputDataHandler = async (e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.KeyboardEvent) => {
    if (treatmentCodeList.includes(userInput)) {
      try {
        await axios.put(`/api/treatment/patient?patientId=${localStorage.getItem("userPk")}&treatmentCode=${userInput}`, {
          headers,
        });
        alert("치료가 할당되었습니다.");
        CareCodeRegister();
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 400) {
            alert("존재하지 않는 치료 코드입니다.");
            setUserInput("");
          } else {
            alert("서버 에러로 인해 조금 후에 시도해주세요.");
          }
        } else {
        }
      }
    } else {
      alert("입력된 환자에게 배당되지 않은 치료 코드입니다.");
      setUserInput("");
    }
  };

  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <div
          className="carecoderegister-backdrop"
          onClick={CareCodeRegister}
        />,
        document.getElementById("backdrop-root")!
      )}
      <div className="col carecode-register-Page">
        <img
          src="/Assets/Images/Logo.png"
          alt="Logo"
          className="carecodeLogoImg"
          title="환자 대시보드로 이동"
          onClick={CareCodeRegister}
        />
        <p
          style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem" }}
        >
          치료 코드 입력
        </p>
        <div className="col">
          <div className="col carecode-name">
            <p>이름 *</p>
            <label className="carecode-name-input">
              <input
                type="text"
                placeholder="조인잇 *"
                id="nameInput"
                value={userName}
                style={{ fontSize: "1.7rem" }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    pwInputTag.focus();
                  }
                }}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </label>
          </div>
          <div className="col carecode-phone">
            <p>전화번호 *</p>
            <label className="carecode-phone-input">
              <input
                type="tel"
                id="pphoneNumberInput"
                placeholder="01012345678 *"
                value={phoneNumberInput}
                style={{ fontSize: "1.7rem" }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    CheckDbNameAndPhone(e);
                  }
                }}
                onChange={(el) => {
                  setPhoneNumber(el.currentTarget.value.replace(/[^0-9]/g, ""));
                }}
              />
            </label>
          </div>
          <div
            className="col carecode-authNumInput"
            style={{ display: !inputNumActive ? "none" : "block" }}
          >
            <p>인증번호 입력 *</p>
            <label className="carecode-authNumInput-input">
              <input
                type="text"
                id="AuthenEmailNum"
                value={userInput}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    CheckAllInputDataHandler(e);
                  }
                }}
                onChange={(e) => {
                  setUserInput(e.target.value);
                }}
              />
            </label>
          </div>
          <div
            className={`carecode-submit-button ${firstBtnActive ? "" : "grey"}`}
            onClick={
              firstBtnActive
                ? inputNumActive
                  ? CheckAllInputDataHandler
                  : CheckDbNameAndPhone
                : undefined
            }
          >
            <div
              className={`carecode-submit-button-inner ${
                firstBtnActive ? "" : "grey"
              }`}
            />
            <p>{comment}</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CareCodeRegister;
