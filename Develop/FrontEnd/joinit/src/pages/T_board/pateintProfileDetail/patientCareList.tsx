import React from 'react';
import './patientCareList.css';
import CompleteCare from './completeCare';
import NotCompleteCare from './notCompleteCare';


function PatientCareList() {
  return (
    <div>
      <h1>patientCareList</h1>
      <CompleteCare />
      <NotCompleteCare />
    </div>
  )
}

export default PatientCareList