import React from 'react';
import './miniRecipeBox.css';


function MiniRecipeBox(props: any) {
  return (
  <div className='col mini-recipe-box'>
    {props.posts.map((data: any) => (
      <div className='row recipe-box-detail' key={data.id}>
        <div className='recipe-box-detail-image'>
          <img src="/Assets/Images/patient_image.png" alt="patient" style={{width: '35px', height: '35px'}}/>
        </div>
        <div className='col recipe-box-detail-text'>
          <div className='col'>
            <p style={{fontWeight: 'bold', fontSize: '20px'}}>{data.title}</p>
            <p style={{fontSize: '15px'}}>{data.userId}</p>
          </div>
          <div className='recipe-box-detail-text-description'>
            <p>{data.id}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
  );
}

export default MiniRecipeBox