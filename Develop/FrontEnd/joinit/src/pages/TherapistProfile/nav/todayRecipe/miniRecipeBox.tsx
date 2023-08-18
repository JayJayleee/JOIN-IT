import React from 'react';


function MiniRecipeBox(props: any) {
  return (
  <div className='col mini-recipe-box'>
    {props.posts.map((data: any) => (
      <div className='row recipe-box-detail' key={data.prescriptionId}>
        <div className='recipe-box-detail-image'>
          <img src="/Assets/Images/patient_image.png" alt="patient" style={{width: '35px', height: '35px'}}/>
        </div>
        <div className='col recipe-box-detail-text'>
          <div className='col recipe-box-detail-text-title'>
            <p style={{fontWeight: 'bold', fontSize: '1.8rem'}}>{data.patientName} - {data.jointName}</p>
            <p style={{fontSize: '1.3rem', marginTop: '0.5rem'}}>실시간 코칭</p>
          </div>
          <div className='recipe-box-detail-text-description'>
            <p>{data.prescriptionProcessTime.substring(2,10).replaceAll('-', '.')} {data.prescriptionProcessTime.substring(11,16)}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
  );
}

export default MiniRecipeBox