import React from 'react'

interface propType {
  patient: any;
  eventChangeFtn: (x: number) => void;
  setPatientId: (x: string) => void;
}

function CompleteCare({patient, eventChangeFtn, setPatientId}: propType) {

  const btnEventClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setPatientId(patient.userId);
    eventChangeFtn(4);
  }

  return (
    <React.Fragment>
      <div className='row patientlist-detail complete'>
        <div className='patientlist-detail-image'>
          <img src="/Assets/Images/patient_image.png" alt="patient" style={{width: '4rem', height: '4rem'}}/>
        </div>
        <div className='col patientlist-detail-text'>
          <div className='col patientlist-detail-text-title'>
            <p style={{fontWeight: 'bold', fontSize: '20px'}}>{patient.name}</p>
            <p>{patient.phone.substring(0,3)}-{patient.phone.substring(3,7)}-{patient.phone.substring(7,11)}</p>
          </div>
          <div className='patientlist-detail-text-description'>
            <div className='patientlist-detail-button completeBtn' onClick={(e) => {btnEventClick(e)}}>
              <p>프로필 보기</p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default CompleteCare