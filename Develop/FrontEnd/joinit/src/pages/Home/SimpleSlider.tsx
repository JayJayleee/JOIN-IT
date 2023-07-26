
import React from "react";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from "react-slick"

import "./SimpleSlider.css"



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
  };

  return (
    <div>
        <Slider {...settings}>
          <div>
            <video muted autoPlay loop className="mainvideo">
              <source src="/Assets/Videos/메인페이지영상1.mp4" type="video/mp4" />
            </video>
          </div>
          <div>
            <video muted autoPlay loop>
              <source src="/Assets/Videos/메인페이지영상2.mp4" type="video/mp4" />
            </video>
          </div>
          <div>
            <video muted autoPlay loop>
              <source src="/Assets/Videos/메인페이지영상3.mp4" type="video/mp4" />
            </video>
          </div>
        </Slider>
      </div>
  )
}
export default SimpleSlider
