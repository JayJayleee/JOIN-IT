import React from 'react';
import './patientProfileDetail.css';
import PatientCareList from './pateintProfileDetail/patientCareList';


function PatientProfile() {
  return (
    <div>
      <h1>patientProfile</h1>
      <PatientCareList />
    </div>
  )
}

export default PatientProfile