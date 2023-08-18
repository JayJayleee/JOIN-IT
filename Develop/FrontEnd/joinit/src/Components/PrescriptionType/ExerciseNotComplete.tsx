import React from 'react'
import './ExerciseNotComplete.css';
import { useNavigate } from 'react-router-dom';

type DtoList = {
  [key: string] : string
}


function ExerciseNotComplete(props: any) {

  const navigate = useNavigate();

  const updateBtn = <React.Fragment>
    <div className='two-prescription_updateBtn' onClick={e => {navigate(`/ExerciseUpdate/${props.data.prescriptionId}`)}}>
      <div className='two-prescription_updateBtn-eff'></div>
      <p>수정하기</p>
    </div>
  </React.Fragment>


  const acceptUpdate = <div className='row exerciseNotComplete-detail-text-description-button'>
    {updateBtn}
    <div className='row exerciseNotComplete-detail-change-button' onClick={e => {navigate(`/ExerciseDetailPage/${props.data.prescriptionId}`)}}>
      <div className='exerciseNotComplete-detail-change-button-eff'></div>
      <p>요약 보기</p>
    </div>
  </div>

  const forbiddenUpdate = <div className='row exerciseNotComplete-detail-button' onClick={e => {navigate(`/ExerciseDetailPage/${props.data.prescriptionId}`)}}>
    <div className='exerciseNotComplete-detail-button-eff'></div>
    <p>요약 보기</p>
  </div>

  return (
    <div className='row exerciseNotComplete-detail' key={props.data.prescriptionId}>
      <div className='exerciseNotComplete-detail-image-box'>
        <div className='exerciseNotComplete-detail-image'>
          <img src="/Assets/Images/patient_image.png" alt="patient" style={{width: '4rem', height: '4rem'}}/>
        </div>
      </div>
      <div className='col exerciseNotComplete-detail-text'>
        <div className='row exerciseNotComplete-detail-text-title'>
          <p style={{fontWeight: 'bold', fontSize: '20px'}}>운동 - {props.data.trainingName}</p>
          <p>30분 소요</p>
        </div>
        <div className='row exerciseNotComplete-detail-text-description' style={{marginBottom: props.data.timeOver !== 'Y'? "1.5rem":"2.5rem"}}>
          <div className='row detail-joint-training-mapping-scroll' >
            {props.data.jointTrainingTypeMappingDtoList.map((el: DtoList) => {
              return <p style={{marginRight: '1rem'}} key={el.mappingId}>{el.jointName} {'>'} {el.trainingName}</p>
            })}
          </div>
          {(props.data.timeOver !== 'Y' && props.userType === 'T')? acceptUpdate : forbiddenUpdate }
        </div>
      </div>
    </div>
  )
}

export default ExerciseNotComplete