import React, {useState, useEffect} from 'react';
import './careDetail.css';
// import Calendar from '../../Components/calendar/Calendar';
import CalendarNotChoose from '../../Components/calendar/CalendarNotChoose';
import Statistic from '../../Components/Statistic/Statistic';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Coaching from '../../Components/PrescriptionType/Coaching';
import CoachingComplete from '../../Components/PrescriptionType/CoachingComplete';
import CoachingNotComplete from '../../Components/PrescriptionType/CoachingNotComplete';
import Exercise from '../../Components/PrescriptionType/Exercise';
import ExerciseComplete from '../../Components/PrescriptionType/ExerciseComplete';
import ExerciseNotComplete from '../../Components/PrescriptionType/ExerciseNotComplete';
import Meeting from '../../Components/PrescriptionType/Meeting';
import { format } from 'date-fns';


type divideObj = {
  [key:string] : string;
}


function CareDetail(props: any) {
  // 달력과 전체 처방 리스트 
  const [calendarData, setCalendarData] = useState([]);
  const [paginationList, setPaginationList] = useState([]);
  const [selectedDay, setSelectedDay] = useState(new Date());
  // 환자 치료 상세 정보
  const [patientCareDetail, setPatientCareDetail] = useState<divideObj>({}); 
  // 전설문통계 정보
  const [before, setBefore] = useState([]);
  // pagination을 위한 state
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);
  const [surveyObj, setSurveyObj] = useState([]);
  const today = format(new Date(), 'yyyy.MM.dd')

  const navigate = useNavigate();

  useEffect(() => {
    const headers = {
      'context-Type' : 'apllication/json',
      'Authorization' : `Bearer ${localStorage.getItem('access-token')}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true'
    }

    const firstData = async () => {
      try {
        const Result = await axios.get(`/api/prescription/${props.givetreatId}`, {headers})
        const content: any = {};
        setPaginationList(Result.data)

        Result.data.forEach((element: any) => {
          const date = format(new Date(element.prescriptionProcessTime), 'yyyy.MM.dd')

          if (Object.keys(content).includes(date)) {
            content[date][element.prescriptionCode] += 1;
          } else {
            content[date] = {"코칭" : 0, "운동" : 0, "대면" : 0};
            content[date][element.prescriptionCode] += 1;
          }
        });
        setCalendarData(content);
      } catch(err) {
      }
    }

    const secondData = async () => {
      try {
        const Result = await axios.get(`/api/treatment/update/${props.givetreatId}`, {headers})
        setPatientCareDetail(Result.data)
      } catch(err) {
      }
    }
    
    const thirdData = async () => {
      try {
        const Result = await axios.get(`/api/survey/before/statistics/${props.givetreatId}`, {headers})
        setBefore(Result.data.result)
      } catch(err) {
      }
    }
    
    const fourthData = async () => {
      try {
        const Result = await axios.get(`/api/survey/after/statistics/${props.givetreatId}`, {headers})
        setSurveyObj(Result.data.result)
      } catch(err) {
      }
    }

    firstData();
    secondData();
    thirdData();
    fourthData();
  },[props.givetreatId])


  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentList = (careList: Array<Object>) => {
    let currentPosts: object[] = [];
    if (careList === undefined || careList.length === 0) {
      return []
    } else {
      currentPosts = careList.slice(indexOfFirstPost, indexOfLastPost);
      return currentPosts
    }
  }
  let postLength = 0

  if (paginationList !== undefined) {
    postLength = paginationList.length
  } 

  let pageNumber = Math.ceil(postLength / postsPerPage);
  if (pageNumber === 0) {
    pageNumber = 1;
  }

  const pagination = <ul className="row pagination">
    <div
      className="pageBoxBtn"
      onClick={currentPage === 1? undefined : () => setCurrentPage(currentPage - 1)}
      style={{backgroundColor: currentPage === 1? '#5D6569' : '#dbf2f1'}}
      >
      <p className="page-link">
        {'<'}
      </p>
    </div>
    <div className="pageBoxPageNum">
      <p>{currentPage} / {pageNumber}</p>
    </div>
    <div
      className="pageBoxBtn"
      onClick={currentPage === pageNumber? undefined : () => setCurrentPage(currentPage + 1)}
      style={{backgroundColor: currentPage === pageNumber? '#5D6569' : '#dbf2f1'}}
    >
      <p className="page-link">
        {'>'}
      </p>
    </div>
  </ul>


const prescriptionBox = <div className='col mini-prescription-box'>
  {currentList(paginationList).map((data: any) => {
    if (data.prescriptionCode === "대면") {
      return <Meeting data={data} inputDate={data.prescriptionProcessTime.substring(0,10).replaceAll('-', '.')} key={data.prescriptionId} type={true} userType={'T'} />
    } else if (data.prescriptionCode === "코칭") {
      if (data.isCompleted === 'Y') {
        return <CoachingComplete data={data} key={data.prescriptionId} type={true} userType={'T'} />
      } else if (today !== data.prescriptionProcessTime.substring(0,10).replaceAll('-', '.')) {
        return <CoachingNotComplete data={data} key={data.prescriptionId} type={true} userType={'T'} />
      } else {
        return <Coaching data={data} key={data.prescriptionId} type={true} userType={'T'} />
      } 
    } else {
      if (data.isCompleted === 'Y') {
        return <ExerciseComplete data={data} key={data.prescriptionId} type={true} userType={'T'} />
      } else if (today !== data.prescriptionProcessTime.substring(0,10).replaceAll('-', '.') || data.timeOver === 'Y') {
        return <ExerciseNotComplete data={data} key={data.prescriptionId} type={true} userType={'T'} />
      } else {
        return <Exercise data={data} key={data.prescriptionId} type={true} userType={'T'} />
      }
    }}
  )}
  </div>

  const EndTime = <div className='row caredetail-patient-detail-box-tag-short'>
    <div className='row caredetail-patient-detail-box-category'>
      <p>치료 종료일</p>
    </div>
    <p>{patientCareDetail.endTime && patientCareDetail.endTime.substring(0,10).replaceAll('-', '.')}</p>
  </div>

  return (
    <div className='col' style={{width: '100%', alignItems: 'center', padding: '15rem 0rem'}}>
      <div className='col top-white-board'>
        <div className='row caredetail-title'>
          <p className='caredetail-title-name'>{props.nameAndJoint} <span className='caredetail-title-name-2'>{props.completeCareStatus? <></> : "내용입니다."}</span></p>
          <div className="tboard-caredetail-button-2" style={{display: props.completeCareStatus? 'none' : 'block'}} onClick={(e)=> {navigate(`/CareUpdate/${props.givetreatId}`)}}>
            <div className="tboard-caredetail-eff-2"></div>
            <p> 치료 수정 및 종료하기</p>
          </div>
        </div>
        <CalendarNotChoose prescriptionList={calendarData} type={'y'} />
      </div>
      <div className='col bottom-white-board'>
        <div className='col caredetail-patient-detail'>
          <p style={{fontSize: '4rem', fontWeight: 'bold', color: '#0f5953', marginBottom: '1rem'}}>환자 정보</p>
          <div className='col caredetail-patient-detail-box'>
            <div className='row divide_even'>
              <div className='row caredetail-patient-detail-box-tag-short'>
                <div className='row caredetail-patient-detail-box-category'>
                  <p>치료 시작일</p>
                </div>
                <p>{patientCareDetail.startTime && patientCareDetail.startTime.substring(0,10).replaceAll('-', '.')}</p>
              </div>
              {props.completeCareStatus && EndTime}
            </div>
            <div className='row caredetail-patient-detail-box-tag'>
              <div className='col caredetail-patient-detail-box-category'>
                <p>사고 경위</p>
              </div>
              <p>{patientCareDetail.accidentDetail}</p>
            </div>
            <div className='row caredetail-patient-detail-box-tag'>
              <div className='col caredetail-patient-detail-box-category'>
                <p>메모</p>
              </div>
              <p>{patientCareDetail.summary}</p>
            </div>
          </div>
        </div>
        <div className='col caredetail-patient-prescription-box'>
          <div className='row caredetail-patient-prescription-title'>
            <p style={{fontSize: '4rem', fontWeight: 'bold', color: '#0f5953', marginBottom: '1rem'}}>처방된 활동</p>
            <div className="tboard-caredetail-button-2" style={{display: props.completeCareStatus? 'none' : 'block'}} onClick={(e)=> {navigate('/RecipeSelect/', {state: {prescriptionId: props.givetreatId}})}}>
              <div className="tboard-caredetail-eff-2"></div>
              <p>처방하기</p>
            </div>
          </div>
          <div className='col caredetail-patient-prescription-content'>
            {postLength !== 0? prescriptionBox : <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', textAlign: 'center', marginTop: '2rem', marginBottom: '2rem'}}><p style={{fontSize: '2rem', fontWeight: 'bold', color: '#0f5953'}}>아직 등록된 처방이 없습니다.</p></div>}
          </div>
          <div className='col caredetail-patient-prescription-pagination'>
            {pagination}
          </div>
        </div>
        <div className='col caredetail-patient-statistic-box'>
          <Statistic existTodolist={false} beforeStatic={before} afterStatic={surveyObj} type={'y'}/>
        </div>
      </div>
    </div>
  )
}

export default CareDetail