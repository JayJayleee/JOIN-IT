import React from "react";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();
  const backToList = () => {
    navigate("/");
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
        <img src="./Assets/Images/logo.png" alt="" />
        <h1 style={{ fontSize: "5rem" }}>
          이 페이지는 유효하지 않은 페이지입니다.
        </h1>
        <div
          className="button-2"
          onClick={backToList}
          style={{ width: "15rem" }}
        >
          <div className="eff-2"></div>
          <p>홈으로 이동</p>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
