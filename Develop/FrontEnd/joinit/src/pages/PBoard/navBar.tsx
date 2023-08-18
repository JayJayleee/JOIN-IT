import React from 'react'
import './nav/nav.css'
import DoingRecipe from './nav/DoingRecipe';
import CompleteRecipe from './nav/CompleteRecipe';
import MiniProfile from './nav/miniProfile';

interface propType {
  setGoToRegisterCareCode: (x: boolean) => void;
  setTreatmentId: (x:number) => void;
  selectTreatmentId: number
}


function NavBar({setGoToRegisterCareCode, setTreatmentId, selectTreatmentId}: propType) {

  return (
    <div className='col Pnav-container'>
      <MiniProfile setGoToRegisterCareCode={e => {setGoToRegisterCareCode(true)}}/>
      <div className='col' style={{width: '100%', display: 'flex', justifyContent: 'center',alignItems: 'center'}}>
        <p style={{paddingLeft: '1.5rem', fontSize: '2.1rem', fontWeight: '500', width: '90%', textAlign: "left" }}>진행중인 치료 목록</p>
        <DoingRecipe setTreatmentId={setTreatmentId} selectTreatmentId={selectTreatmentId} />
      </div>
      <div className='col' style={{width: '100%', display: 'flex', justifyContent: 'center',alignItems: 'center'}}>
        <p style={{paddingLeft: '1.5rem', fontSize: '2.1rem', fontWeight: '500', width: '90%', textAlign: "left" }}>완료된 치료 목록</p>
        <CompleteRecipe setTreatmentId={setTreatmentId} selectTreatmentId={selectTreatmentId} />
      </div>
    </div>
  )
}

export default NavBar