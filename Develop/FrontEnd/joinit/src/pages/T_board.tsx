import React, { useState } from 'react';
import './T_board/T_board.css';
import Navbar from './T_board/nav';
import MyCareList from './T_board/myCareList';
import MyPatientList from './T_board/myPatientList';
import CareDetail from './T_board/careDetail';
import CalendarList from './T_board/calendarList';
import PatientProfileDetail from './T_board/patientProfileDetail';


function TabContent(props :any) {
  const calendarListPage = <CalendarList />
  const careListPage = <MyCareList />
  const patientListPage = <MyPatientList />
  const careDetailPage = <CareDetail />
  const patientProfileDetailPage = <PatientProfileDetail />


  return [ calendarListPage, careListPage, patientListPage, careDetailPage, patientProfileDetailPage ][props.pageNum]
}


function T_board() {


  const fixPageNum = 0
  const [nowPage, changePage] = useState(fixPageNum);

  let TherapistName = '치료사';

  const eventChangeFtn = (num :number) => {
    changePage(num);
  }


  return (
    <div className='board'>
      <div className='row uppertitle'>
        <p className='welcomeMsg'>오늘도 좋은 하루 보내세요, <span className='therapistName'>{TherapistName}</span> 님!</p>
        <div className="tboardbutton-2" onClick={()=> {alert('치료 시작하기 페이지로 갑니다.')}}>
            <div className="tboardeff-2"></div>
            <p> 치료 시작하기 </p>
          </div>
      </div>
      <div className='row dashboardDivide'>
        <div className='dashboardDivide_left'>
          <Navbar eventChangeFtn={eventChangeFtn} nowPage={nowPage} />
        </div>
        <div className='dashboardDivide_right'>
          <TabContent pageNum={nowPage}/>
        </div>
      </div>
    </div>
  )
}

export default T_board;