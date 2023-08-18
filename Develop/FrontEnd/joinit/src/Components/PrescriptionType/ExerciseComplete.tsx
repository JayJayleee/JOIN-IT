import React from 'react'
import './ExerciseComplete.css';
import { useNavigate } from 'react-router-dom';

type DtoList = {
  [key: string] : string
}


function ExerciseComplete(props: any) {

  const navigate = useNavigate();

  return (
    <div className='row exerciseComplete-detail' key={props.data.prescriptionId}>
      <div className='exerciseComplete-detail-image-box'>
        <div className='exerciseComplete-detail-image'>
          <img src="/Assets/Images/coachingComplete.png" alt="patient" style={{width: '4rem', height: '4rem'}}/>
        </div>
      </div>
      <div className='col exerciseComplete-detail-text'>
        <div className='row exerciseComplete-detail-text-title'>
          <p style={{fontWeight: 'bold', fontSize: props.patient ?'1.6rem' : '2rem'}}>운동 - {props.data.trainingName}</p>
          <p>30분 소요</p>
        </div>
        <div className='row exerciseComplete-detail-text-description'>
          <div className='row detail-joint-training-mapping-scroll'>
            {props.data.jointTrainingTypeMappingDtoList.map((el: DtoList) => {
              return <p key={el.mappingId} style={{marginRight: '1rem'}}>{el.jointName} {'>'} {el.trainingName}</p>
            })}
          </div>
          <div className='meeting-detail-update-btn'>
            <div className='exerciseComplete-detail-button' style={{visibility: 'hidden', fontSize: props.patient ? '.8rem' : '1rem'}}></div>
            <div className='exerciseComplete-detail-button' onClick={e => {navigate(`/ExerciseDetailPage/${props.data.prescriptionId}`)}}>
              <div className='exerciseComplete-detail-button-eff'></div>
              <p>자세히 보기</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExerciseComplete