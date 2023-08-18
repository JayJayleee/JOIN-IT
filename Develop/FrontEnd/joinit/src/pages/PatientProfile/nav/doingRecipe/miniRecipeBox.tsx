import React from 'react';
import './miniRecipeBox.css';


function MiniRecipeBox(props: any) {

  return (
  <div className='col doing-mini-recipe-box'>
    {props.posts.map((data: any) => (
      <div className={`row doing-recipe-box-detail ${props.selectTreatmentId === data.treatmentId? 'selected' : ''}`} key={data.treatmentId} onClick={(e) => {props.eventChangeFtn(data.treatmentId)}}>
        <div className='recipe-box-detail-image'>
          <img src="/Assets/Images/patient_image.png" alt="patient" style={{width: '3.5rem', height: '3.5rem'}}/>
        </div>
        <div className='col doing-recipe-box-detail-text'>
          <div className='col doing-recipe-box-detail-text-title'>
            <p style={{fontWeight: 'bold', fontSize: '1.6rem'}}>{data.therapistName} - {data.jointName}</p>
          </div>
          <div className='doing-recipe-box-detail-text-description'>
            <p>{data.startTime} 시작</p>
          </div>
        </div>
      </div>
    ))}
  </div>
  );
}

export default MiniRecipeBox