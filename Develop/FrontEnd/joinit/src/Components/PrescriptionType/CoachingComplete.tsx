import React from 'react';
import './CoachingComplete.css';
import { useNavigate } from 'react-router-dom';

function CoachingComplete(props: any) {

  const navigate = useNavigate();

  let time_hour: number|string = +props.data.prescriptionProcessTime.substring(11,13) + 1;
  if (time_hour < 10) {
    time_hour = `0${time_hour}`;
  }

  const updateBtn = <div className='meeting-detail-update-btn'>
    <div className='CoachingComplete-detail-button' style={{visibility: 'hidden'}}></div>
    <div className='CoachingComplete-detail-button' onClick={e => {navigate(`/CoachDetailPage/${props.data.prescriptionId}`)}}>
      <div className='CoachingComplete-detail-button-eff'></div>
      <p>자세히 보기</p>
    </div>
  </div>

  return (
    <div className='row CoachingComplete-detail' key={props.data.prescriptionId}>
      <div className='CoachingComplete-detail-image-box'>
        <div className='CoachingComplete-detail-image'>
          <img src="/Assets/Images/coachingComplete.png" alt="patient" style={{width: '4rem', height: '4rem'}}/>
        </div>
      </div>
      <div className='col CoachingComplete-detail-text'>
        <div className='row CoachingComplete-detail-text-title'>
          <p style={{fontWeight: 'bold', fontSize: props.patient ?'1.6rem' : '2rem'}}>화상 코칭 - {props.data.trainingName}</p>
          <p>{(props.data.prescriptionProcessTime && props.patient === undefined) && props.data.prescriptionProcessTime.substring(2,10).replaceAll('-', '.')} {props.data.prescriptionProcessTime.substring(11,16)} - {`${time_hour}${props.data.prescriptionProcessTime.substring(13,16)}`}</p>
        </div>
        <div className='row CoachingComplete-detail-text-description'>
          <p>{props.data.therapistName} 물리치료사 선생님</p>
          {updateBtn}
        </div>
      </div>
    </div>
  )
}

export default CoachingComplete