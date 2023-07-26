import React, { useEffect } from "react";
import "./Home/Home.css";
import SimpleSlider from "./Home/SimpleSlider";
import AOS from "aos";
import "aos/dist/aos.css";


function Home() {
  
  useEffect(() => {
    AOS.init();
  })

  return (
    <div>
      {/* 비디오 */}
      <div className="videodiv">
        <SimpleSlider />
        <div className="videoTitlediv">
          <div data-aos="fade" data-aos-duration="1000" data-aos-delay="500" data-aos-easing="ease-in">
            <p className="maintitle1">언제 어디서나</p>
            <p className="maintitle2">당당하게 걷기</p>
            <p className="maintitle3">나를 움직이는 힘</p>
            <div className="Btndiv">
              <button className="MainBtn1">운동 시작하기→</button>
              <button className="MainBtn2">회원 가입→</button>
            </div>  
          </div>
        </div>
      </div>
      
      {/* 중간문구 */}
      <div 
      className="main1div" 
      data-aos="fade" 
      data-aos-duration="1000" 
      data-aos-delay="500" 
      data-aos-easing="ease-in"
      >
        <img src="/Assets/Images/logo2.png" alt="logo img" className="mainimg" />
        <p className="mainInfo">당신의 평생 헬스케어 파트너</p>
        <p className="mainInfo">건강한 삶을 응원합니다</p>
      </div>
      {/* 그림문구 */}
      <div className="main2div" data-aos="fade" data-aos-duration="1000" data-aos-delay="500" data-aos-easing="ease-in">
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
      <div className="main2div" data-aos="fade" data-aos-duration="1000" data-aos-delay="500" data-aos-easing="ease-in">
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
      <div className="main2div" data-aos="fade" data-aos-duration="1000" data-aos-delay="500" data-aos-easing="ease-in">
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
      <div className="main3div" data-aos="fade" data-aos-duration="1000" data-aos-delay="500" data-aos-easing="ease-in" data-aos-offset="200px">
        <p className="main3Info">지금부터 시작해볼까요?</p>
        <p className="main4Info">JOINT, JOIN IT!</p>
      </div>
    </div>
  );
}

export default Home;
