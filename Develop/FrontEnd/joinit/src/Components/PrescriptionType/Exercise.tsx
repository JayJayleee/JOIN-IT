import React from 'react'
import './Exercise.css';
import { useNavigate } from 'react-router-dom';

type DtoList = {
  [key: string] : string
}

function Exercise(props: any) {

  const navigate = useNavigate();

  const userType = localStorage.getItem('userType');

  const moveToPagePvsT = () => {
    if (userType === 'T') {
      navigate(`/ExerciseDetailPage/${props.data.prescriptionId}`)
    } else {
      navigate(`/patient/survey/exercise/${props.data.prescriptionId}`)
    }
  }


  const acceptUpdate = <div className='row coaching-detail-text-description-button'>
    <div className='exercise-prescription_updateBtn' style={{visibility: (props.data.timeOver !== 'Y' && props.userType === 'T')? 'visible' : 'hidden' }} onClick={e => {navigate(`/ExerciseUpdate/${props.data.prescriptionId}`)}}>
      <div className='exercise-prescription_updateBtn-eff'></div>
      <p>수정하기</p>
    </div>
    <div className='row exercise-detail-button' onClick={e => {moveToPagePvsT()}}>
      <div className='exercise-detail-button-eff'></div>
      {userType === 'T'? <p>요약 보기</p> : <p>시작하기</p>}
    </div>
  </div>

  return (
    <div className='row exercise-detail' key={props.data.prescriptionId}>
      <div className='exercise-detail-image-box'>
        <div className='exercise-detail-image'>
          <img src="/Assets/Images/patient_image.png" alt="patient" style={{width: '4rem', height: '4rem'}}/>
        </div>
      </div>
      <div className='col exercise-detail-text'>
        <div className='row exercise-detail-text-title'>
          <p style={{fontWeight: 'bold', fontSize: props.patient ?'1.5rem' : '2rem'}}>운동 - {props.data.trainingName}</p>
          <p>30분 소요</p>
        </div>
        <div className='row exercise-detail-text-description' style={{marginBottom: props.data.timeOver !== 'Y'? "1.5rem":"2.5rem"}}>
          <div className='row detail-joint-training-mapping-scroll'>
            {props.data.jointTrainingTypeMappingDtoList.map((el: DtoList) => {
              return <p style={{marginRight: '1rem'}} key={el.mappingId}>{el.jointName} {'>'} {el.trainingName}</p>
            })}
          </div>
          {acceptUpdate}
        </div>
      </div>
    </div>
  )
}

export default Exercise