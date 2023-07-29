import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import "./SimpleSlider.css";

const SimpleSlider = () => {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    // 화살표 없애야된다
    arrows: false,
    // 자동 넘김을 할 것인가. 한다면 스피드는?
    autoplay: true,
    autoplaySpeed: 10000,
    pauseOnHover: true,
    // variableWidth : true,
  };

  return (
    <div className="sliderdiv">
      <Slider {...settings}>
        <div>
          <div className="blurdiv"></div>
          <video muted autoPlay loop className="mainvideo">
            <source src="/Assets/Videos/메인페이지영상1.mp4" type="video/mp4" />
          </video>
          <div className="videoTitlediv">
            <div >
              <p className="maintitle1">혼자라서 힘들 때,</p>
              <p className="maintitle2">함께하는 건강한 습관</p>
              <p className="maintitle3">지금 시작해볼까요?</p>
              <div className="Btndiv">
                <button className="MainBtn1">운동 시작하기 →</button>
                <button className="MainBtn2">회원 가입 →</button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="blurdiv"></div>
          <video muted autoPlay loop>
            <source src="/Assets/Videos/메인페이지영상2.mp4" type="video/mp4" />
          </video>
          <div className="videoTitlediv">
            <div data-aos="fade" data-aos-duration="1000" data-aos-delay="500" data-aos-easing="ease-in">
              <p className="maintitle1">두번째 멘트</p>
              <p className="maintitle2">당당하게 걷기</p>
              <p className="maintitle3">두번째 멘트</p>
              <div className="Btndiv">
                <button className="MainBtn1">운동 시작하기→</button>
                <button className="MainBtn2">회원 가입→</button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="blurdiv"></div>
          <video muted autoPlay loop>
            <source src="/Assets/Videos/메인페이지영상3.mp4" type="video/mp4" />
          </video>
          <div className="videoTitlediv">
            <div data-aos="fade" data-aos-duration="1000" data-aos-delay="500" data-aos-easing="ease-in">
              <p className="maintitle1">세번째 멘트</p>
              <p className="maintitle2">당당하게 걷기</p>
              <p className="maintitle3">세번째 멘트</p>
              <div className="Btndiv">
                <button className="MainBtn1">운동 시작하기→</button>
                <button className="MainBtn2">회원 가입→</button>
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};
export default SimpleSlider;
