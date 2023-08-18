import React, { useState } from 'react';
import './T_board/T_board.css';
import Nav from '../Components/Nav/Nav';
import Navbar from './T_board/nav';
import MyCareList from './T_board/myCareList';
import MyPatientList from './T_board/myPatientList';
import CareDetail from './T_board/careDetail';
import CalendarList from './T_board/calendarList';
import PatientProfileDetail from './T_board/patientProfileDetail';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';


function TabContent(props :any) {
  
  const calendarListPage = <CalendarList />
  const careListPage = <MyCareList eventChangeFtn={props.eventChangeFtn} setTreatId={props.setTreatId} setCompleteCareStatus={props.setCompleteCareStatus} setNameAndJoint={props.setNameAndJoint}/>
  const patientListPage = <MyPatientList eventChangeFtn={props.eventChangeFtn} setPatientId={props.setPatientId} />
  const careDetailPage = <CareDetail givetreatId={props.givetreatId} completeCareStatus={props.completeCareStatus} nameAndJoint={props.nameAndJoint}/>
  const patientProfileDetailPage = <PatientProfileDetail eventChangeFtn={props.eventChangeFtn} givePatientId={props.givePatientId} setTreatId={props.setTreatId} setCompleteCareStatus={props.setCompleteCareStatus} setNameAndJoint={props.setNameAndJoint}/>


  return [ calendarListPage, careListPage, patientListPage, careDetailPage, patientProfileDetailPage ][props.pageNum]
}


function TBoard() {

  const navigate = useNavigate();

  const { state } = useLocation();

  const fixPageNum = 0
  const [nowPage, changePage] = useState(fixPageNum);
  const [givePatientId, setPatientId] = useState('');
  const [givetreatId, setTreatId] = useState(0);
  const [completeCareStatus, setCompleteCareStatus] = useState(false);
  const [nameAndJoint, setNameAndJoint] = useState('');

  const [TherapistName, setTherapistName] = useState('치료사');

  const eventChangeFtn = (num :number) => {
    changePage(num);
  }

  useEffect(() => {
    if (state) {
      changePage(state.pagenumber)
    }

    const headers = {
      'context-Type' : 'apllication/json',
      'Authorization' : `Bearer ${localStorage.getItem('access-token')}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true'
    }

    const fetchData = async () => {
      try {
        const Result = await axios.get(`/api/therapist/profile/${localStorage.getItem('userPk')}`, {headers})
        setTherapistName(Result.data.name);
      } catch {
      }
    }
    fetchData();
  }, [state])


  return (
    <React.Fragment>
      <Nav />
      <div className='col board'>
        <div className='row uppertitle'>
          <p className='welcomeMsg'>오늘도 좋은 하루 보내세요, <span className='therapistName'>{TherapistName}</span> 치료사님!</p>
          <div className="tboardbutton-2" onClick={(e)=> {navigate('/carecreate')}}>
            <div className="tboardeff-2"></div>
            <p> 치료 시작하기 </p>
          </div>
        </div>
        <div className='row dashboardDivide'>
          <div className='dashboardDivide_left'>
            <Navbar eventChangeFtn={eventChangeFtn} nowPage={nowPage} />
          </div>
          <div className='dashboardDivide_right'>
            <TabContent pageNum={nowPage}
             givePatientId={givePatientId} 
             setPatientId={setPatientId} 
             givetreatId={givetreatId} 
             setTreatId={setTreatId} 
             eventChangeFtn={eventChangeFtn} 
             completeCareStatus={completeCareStatus} 
             setCompleteCareStatus={setCompleteCareStatus}
             nameAndJoint={nameAndJoint}
             setNameAndJoint={setNameAndJoint}
              />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default TBoard;