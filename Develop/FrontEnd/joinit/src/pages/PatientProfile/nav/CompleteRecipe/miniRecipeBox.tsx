import React from 'react';
import './miniRecipeBox.css';


function MiniRecipeBox(props: any) {
  return (
  <div className='col complete-mini-recipe-box'>
    {props.posts.map((data: any) => (
      <div className='row complete-recipe-box-detail' key={data.treatmentId} onClick={(e) => {props.eventChangeFtn(data.treatmentId)}}>
        <div className='recipe-box-detail-image'>
          <img src="/Assets/Images/patient_image.png" alt="patient" style={{width: '3.5rem', height: '3.5rem'}}/>
        </div>
        <div className='col complete-recipe-box-detail-text'>
          <div className='col complete-recipe-box-detail-text-title'>
            <p style={{fontWeight: 'bold', fontSize: '1.6rem'}}>{data.therapistName} - {data.jointName}</p>
          </div>
          <div className='complete-recipe-box-detail-text-description'>
            <p>{data.startTime} ~ {data.endTime}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
  );
}

export default MiniRecipeBox