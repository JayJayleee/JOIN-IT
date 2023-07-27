import React, { useState } from 'react';
import './T_board/T_board.css';
import Nav from './T_board/nav';
import MyCareList from './T_board/myCareList';
import MyPatientList from './T_board/myPatientList';
import CareDetail from './T_board/careDetail';
import CalendarList from './T_board/calendarList';
import PatientProfileDetail from './T_board/patientProfileDetail';
import { useSelector } from 'react-redux';


function T_board() {

  let nowShowPage = ''
  let pageName = useSelector((state: any) => state.pageName)

  if (pageName === 'calendar') {
    
  }

  return (
    <div>
      <h1>물리 치료사 치료 대시보드</h1>
      <nav>상단 로고와 프로필 버튼 들어오는 곳</nav>
      <div className='row' style={{ justifyContent : 'space-between' }}>
        <p>오늘도 좋은 하루 보내세요, 치료사 님!</p>
        <button>치료 시작하기</button>
      </div>
      <div className='row'>
        <Nav />
      </div>
    </div>
  )
}

export default T_board;