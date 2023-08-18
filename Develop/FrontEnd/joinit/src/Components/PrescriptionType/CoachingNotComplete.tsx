import React from 'react';
import './CoachingNotComplete.css';
import { useNavigate } from 'react-router-dom';


function CoachingNotComplete(props: any) {

  const navigate = useNavigate();

  const userType = localStorage.getItem('userType');

  let time_hour: number|string = +props.data.prescriptionProcessTime.substring(11,13) + 1;
  if (time_hour < 10) {
    time_hour = `0${time_hour}`;
  }

  const updateBtn = <div className='meeting-detail-update-btn'>
    <div className='prescription_updateBtn' style={{visibility: 'hidden'}}></div>
    <div className='prescription_updateBtn' onClick={e => {navigate(`/MeetUpdate/${props.data.prescriptionId}`)}}>
      <div className='prescription_updateBtn-eff'></div>
      <p>수정하기</p>
    </div>
  </div>
  
  return (
    <div className='row CoachingNotComplete-detail' key={props.data.prescriptionId}>
      <div className='CoachingNotComplete-detail-image-box'>
        <div className='CoachingNotComplete-detail-image'>
          <img src="/Assets/Images/therapistConfirm.png" alt="patient" style={{width: '4rem', height: '4rem'}}/>
        </div>
      </div>
      <div className='col CoachingNotComplete-detail-text'>
        <div className='row CoachingNotComplete-detail-text-title'>
          <p style={{fontWeight: 'bold', fontSize: '20px'}}>화상 코칭 - {props.data.trainingName}</p>
          <p>{props.data.prescriptionProcessTime && props.data.prescriptionProcessTime.substring(2,10).replaceAll('-', '.')} {props.data.prescriptionProcessTime.substring(11,16)} - {`${time_hour}${props.data.prescriptionProcessTime.substring(13,16)}`}</p>
        </div>
        <div className='row meeting-detail-text-description' style={{marginBottom: props.data.timeOver !== 'Y'? "1.5rem":"2.5rem"}}>
          <div className='row detail-joint-training-mapping-scroll'>
            <p>{props.data.therapistName} 선생님</p>
          </div>
          {(props.data.timeOver !== 'Y' && props.data.isCompleted !== 'Y' && props.userType === 'T') && updateBtn}
        </div>
      </div>
    </div>
  )
}

export default CoachingNotComplete