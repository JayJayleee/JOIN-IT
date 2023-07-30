import React from 'react'
import "./Footer.css"


function Footer() {
  return (
    <div className='footer'>
      <div className="inner">
        <ul className="menu">
        <li><a href="#">개인정보처리방침</a></li>
        <li><a href="#">영상정보처리기기 운영관리 방침</a></li>
        <li><a href="#">홈페이지 이용약관</a></li>
        <li><a href="#">데이터처리 이용약관</a></li>
        <li><a href="#">윤리경영 핫라인</a></li>
      </ul>
      <div className="info">
        <span>사업자등록번호 S09P12B203</span>
        <span>JOIN-IT(당신의 건강과 함께합니다)</span>
        <span>TEL : 02) 1234-1234 / FAX : 02) 1234-1234</span>
        <span>개인정보 책임자 : 김아무개</span>
      </div>

      <p className="copyright">
        Join-It Company. All Rights Reseved.
      </p>
      <img src="./images/starbucks_logo_only_text.png" alt="" className="logo" />
      </div>
    </div>
  )
}

export default Footer