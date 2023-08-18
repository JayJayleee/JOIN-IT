import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home/Home.css";
import SimpleSlider from "./Home/SimpleSlider";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "./Home/Footer/Footer";
import AuthLogin from "../store/modules/auth";
import { useDispatch } from "react-redux";

function Home() {
  const movePageToClickBtn = useNavigate();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const [comment, setComment] = useState("");

  const moveSignUpPageHome = () => {
    if (isLogin) {
      dispatch(AuthLogin.actions.Logout());
      window.location.reload();
    } else {
      movePageToClickBtn("/Signup");
    }
  };

  const moveLoginPageHome = () => {
    if (isLogin) {
      // const userPk = localStorage.getItem('userPk')!
      const userType = localStorage.getItem('userType')!
      movePageToClickBtn(`/${userType}board`)
    } else {
      movePageToClickBtn("/Login");
    }
  };


  const accessToken = localStorage.getItem('access-token')
  const userPk = localStorage.getItem('userPk')

  useEffect(() => {

    if (accessToken !== null && userPk !== 'admin') {
      setIsLogin(true);
      setComment("로그아웃 →");
    } else {
      setIsLogin(false);
      setComment("회원 가입 →");
    }
    AOS.init();
    AOS.refresh();
    window.onbeforeunload = function pushRefresh() {
      window.scrollTo(0, 0);
    };
  }, [accessToken]);


  return (
    <div>
      {/* 비디오 */}
      <div className="videodiv">
        <SimpleSlider
          moveSignUpPageHome={moveSignUpPageHome}
          moveLoginPageHome={moveLoginPageHome}
          comment={comment}
        />
      </div>

      {/* 중간문구 */}
      <div
        className="main1div"
        data-aos="fade"
        data-aos-duration="1000"
        data-aos-delay="1000"
        data-aos-once="true"
      >
        <img
          src="/Assets/Images/Typograph2.gif"
          alt="logo img"
          className="mainimg"
        />
        <p className="mainInfo">당신의 평생 헬스케어 파트너</p>
        <p className="mainInfo">건강한 삶을 응원합니다.</p>
      </div>
      {/* 그림문구 */}
      <div
        className="main2div main2_1div"
        data-aos="fade"
        data-aos-duration="3000"
        data-aos-delay="1500"
        data-aos-once="true"
      >
        <div className="main2Infoleft">
          <img
            src="/Assets/Images/main.png"
            alt="main img"
            className="main2img"
          />
        </div>
        <div className="main2Inforight">
          <h1 className="numbering">01</h1>
          <div className="hrline"></div>
          <h2 className="titleh1">전문 치료사와 함께하는</h2>
          <h2 className="titleh2">1:1 화상 코칭</h2>
          <h2 className="content1">정확한 재활 운동 방법을 알고싶을 때</h2>
          <h2 className="content1">전문 치료사와 화상 코칭을 시작해보세요.</h2>
        </div>
      </div>
      <div
        className="main2div main2_2div"
        data-aos="fade"
        data-aos-duration="3000"
        data-aos-delay="1500"
        data-aos-once="true"
      >
        <div className="main2Infoleft">
          <h1 className="numbering">02</h1>
          <div className="hrline"></div>
          <h2 className="titleh1">언제 어디서나</h2>
          <h2 className="titleh2">나에게 맞는 재활운동</h2>
          <h2 className="content1">몸의 움직임을 보조하는 모션인식을 통해</h2>
          <h2 className="content1">건강한 재활 운동을 시작하세요.</h2>
        </div>
        <div className="main2Inforight">
          <img
            src="/Assets/Images/main2.png"
            alt="main img"
            className="main2img"
          />
        </div>
      </div>
      <div
        className="main2div main2_3div"
        data-aos="fade"
        data-aos-duration="3000"
        data-aos-delay="1500"
        data-aos-once="true"
      >
        <div className="main2Infoleft">
          <img
            src="/Assets/Images/main3.png"
            alt="main img"
            className="main2img"
          />
        </div>
        <div className="main2Inforight">
          <h1 className="numbering">03</h1>
          <div className="hrline"></div>
          <h2 className="titleh1">실시간으로 기록되는</h2>
          <h2 className="titleh2">체계적인 통계 데이터</h2>
          <h2 className="content1">집중적이고 체계적인 재활 통계로</h2>
          <h2 className="content1">조금씩 변화하는 나를 만나보세요.</h2>
        </div>
      </div>
      {/* 마지막 문구 */}
      <div
        className="main3div"
        data-aos="fade"
        data-aos-duration="3000"
        data-aos-delay="1500"
        data-aos-once="true"
      >
        <p className="main3Info">내일의 나를 바꾸는</p>
        <p className="main4Info">건강한 재활 운동</p>
        <div className="Btndiv">
          <button
            className="MainBtn1"
            onClick={moveLoginPageHome}
            style={{ cursor: "pointer" }}
          >
            운동 시작하기 →
          </button>
          <button
            className="MainBtn2"
            onClick={moveSignUpPageHome}
            style={{ cursor: "pointer" }}
          >
            {comment}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
