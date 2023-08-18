import React from 'react';

interface propType {
  care: any;
  eventChangeFtn: (x: number) => void;
  setTreatId: (x: number) => void;
  setCompleteCareStatus: (x: boolean) => void;
  setNameAndJoint: (x:string) => void;
}


function CompleteCare({care, eventChangeFtn, setTreatId, setCompleteCareStatus, setNameAndJoint}: propType) {
  
  const mixFnt = (e: React.MouseEvent<HTMLDivElement>) => {
    setTreatId(care.treatmentId)
    eventChangeFtn(3);
    setCompleteCareStatus(true);
    setNameAndJoint(`${care.patientName}-${care.jointName}`)
  }

  return (
    <React.Fragment>
      <div className='row carelist-detail care-complete'>
        <div className='carelist-detail-image'>
          <img src="/Assets/Images/patient_image.png" alt="patient" style={{width: '4rem', height: '4rem'}}/>
        </div>
        <div className='col carelist-detail-text'>
          <div className='row carelist-detail-text-title'>
            <p style={{fontWeight: 'bold', fontSize: '20px'}}>{care.patientName} - {care.jointName}</p>
            <p>{care.startTime !== undefined? care.startTime.substring(2,10).replaceAll('-', '.') : null} - {care.endTime !== undefined? care.endTime.substring(2,10).replaceAll('-', '.') : null}</p>
          </div>
          <li style={{marginLeft: '2rem'}}>{care.summary}</li>
          <div className='row carelist-detail-text-description'>
            <p style={{display: 'flex', alignItems: 'end'}}>진행 중인 처방 {care.progressPrescription}건 / 완료한 처방 {care.completedPrescription}건</p>
            <div className='carelist-detail-button care-completeBtn' onClick={(e) => {mixFnt(e)}}>
              <p>자세히 보기</p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default CompleteCare