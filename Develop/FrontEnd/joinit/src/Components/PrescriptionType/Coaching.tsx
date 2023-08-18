import React from 'react';
import './Coaching.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Coaching(props: any) {

  const navigate = useNavigate();

  const userType = localStorage.getItem('userType');

  let time_hour: number|string = +props.data.prescriptionProcessTime.substring(11,13) + 1;
  if (time_hour < 10) {
    time_hour = `0${time_hour}`;
  }

  const headers = {
    'context-Type' : 'apllication/json',
    'Authorization' : `Bearer ${localStorage.getItem('access-token')}`,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true'
  }

  const CheckAndEnter = async (prescriptionId: any) => {
    console.log(localStorage.getItem('userType'))
    if (localStorage.getItem('userType') === 'T') {
      navigate(`/therapist/coaching/${prescriptionId}`)
    } else {

      try {
        const Result = await axios.get(`/api/coaching/isStart/${prescriptionId}`, {headers})
        console.log(Result)
        if (Result.data.result === false) {
          alert('아직 치료사가 입장하지 않았습니다.\n잠시 후에 접속해주세요.')
        } else {
          navigate(`/patient/survey/coaching/${prescriptionId}`)
        }
      } catch(err) {
        console.log(err)
      }
    }
  }

  const updateBtn = <React.Fragment>

  </React.Fragment>

  const acceptUpdate = <div className='row coaching-detail-text-description-button'>
    <div className='two-prescription_updateBtn' style={{visibility:(props.data.timeOver !== 'Y' && userType === 'T')? 'visible' : 'hidden'}} onClick={e => {navigate(`/CoachUpdate/${props.data.prescriptionId}`)}}>
      <div className='two-prescription_updateBtn-eff'></div>
      <p>수정하기</p>
    </div>
    <div className='row exerciseNotComplete-detail-change-button' onClick={e => {CheckAndEnter(props.data.prescriptionId)}}>
      <div className='exerciseNotComplete-detail-change-button-eff'></div>
      <p>시작하기</p>
    </div>
  </div>

  const forbiddenUpdate = <div className='row coaching-detail-button' onClick={e => {CheckAndEnter(props.data.prescriptionId)}}>
    <div className='coaching-detail-button-eff'></div>
    <p>시작하기</p>
  </div>


  return (
    <div className='row coaching-detail' key={props.data.prescriptionId}>
      <div className='coaching-detail-image-box'>
        <div className='coaching-detail-image'>
          <img src="/Assets/Images/therapistConfirm.png" alt="patient" style={{width: '4rem', height: '4rem'}}/>
        </div>
      </div>
      <div className='col coaching-detail-text'>
        <div className='row coaching-detail-text-title'>
          <p style={{fontWeight: 'bold', fontSize: props.patient ?'1.6rem' : '2rem'}}>코칭 - {props.data.trainingName}</p>
          <p>{(props.data.prescriptionProcessTime && localStorage.getItem('userType') === 'T') && props.data.prescriptionProcessTime.substring(2,10).replaceAll('-', '.')} {props.data.prescriptionProcessTime.substring(11,16)} - {`${time_hour}${props.data.prescriptionProcessTime.substring(13,16)}`}</p>
        </div>
        <div className='row coaching-detail-text-description' style= {{marginBottom: props.data.timeOver !== 'Y'? "1.5rem":"2.5rem"}}>
          <p>{props.data.therapistName} 물리치료사 선생님</p>
          {acceptUpdate}
        </div>
      </div>
    </div>
  )
}

export default Coaching