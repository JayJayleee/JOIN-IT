import React from "react";
import "./Home/Home.css";
function Home() {
  return (
    <div>
      {/* 비디오 */}
      <div className="videodiv">
        <video muted autoPlay loop>
          <source src="/Assets/Videos/main1.mp4" type="video/mp4" />
        </video>
      </div>
      {/* 중간문구 */}
      <div className="main1div">
        <img src="/Assets/Images/logo.png" alt="logo img" className="mainimg" />
        <p className="mainInfo">당신의 평생 헬스케어 파트너</p>
        <p className="mainInfo">건강한 삶을 응원합니다</p>
      </div>
      {/* 그림문구 */}
      <div className="main2div">
        <div className="main2Infoleft">
          <img src="/Assets/Images/main.png" alt="main img" className="main2img" />
        </div>
        <div className="main2Inforight">
          <h1>01</h1>
          <div className="hrline"></div>
          <h2>대충멋진 문구 줄줄</h2>
          <h2>대충멋진 문구 줄줄</h2>
        </div>
      </div>
      <div className="main2div">
        <div className="main2Infoleft">
          <h1>02</h1>
          <div className="hrline"></div>
          <h2>대충멋진 문구 줄줄</h2>
          <h2>대충멋진 문구 줄줄</h2>
        </div>
        <div className="main2Inforight">
          <img src="/Assets/Images/main2.png" alt="main img" className="main2img" />
        </div>
      </div>
      <div className="main2div">
        <div className="main2Infoleft">
          <img src="/Assets/Images/main3.png" alt="main img" className="main2img" />
        </div>
        <div className="main2Inforight">
          <h1>03</h1>
          <div className="hrline"></div>
          <h2>대충멋진 문구 줄줄</h2>
          <h2>대충멋진 문구 줄줄</h2>
        </div>
      </div>
      {/* 마지막 문구 */}
      <div className="main3div">
        <p className="main3Info">지금부터 시작해볼까요?</p>
        <p className="main4Info">JOINT, JOIN IT!</p>
      </div>
    </div>
  );
}

export default Home;
