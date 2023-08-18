import React from 'react'
import './Meeting.css'
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';


function Meeting(props: any) {
  const today = format(new Date(), 'yyyy.MM.dd');
  const navigate = useNavigate();

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

  const patient_date = props.data.prescriptionProcessTime? props.data.prescriptionProcessTime.substring(0,10).replaceAll('-', '.') : '';

  return (
    <div className={`row meeting-detail ${props.data.isCompleted === 'Y'? 'done' : ((today !== props.inputDate || today !== patient_date)? 'done' : '')}`} key={props.data.prescriptionId}>
      <div className='meeting-detail-image-box'>
        <div className='meeting-detail-image'>
          <img src="/Assets/Images/offlineMeet.png" alt="Meet" />
        </div>
      </div>
      <div className='col meeting-detail-text'>
        <div className='row meeting-detail-text-title'>
          <p style={{fontWeight: 'bold', fontSize: '20px'}}>대면 진료</p>
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

export default Meeting