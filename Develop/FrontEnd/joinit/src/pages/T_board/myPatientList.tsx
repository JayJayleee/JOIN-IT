import React from 'react';
import './myPatientList.css';
import CompleteCare from './myPatientList/completeCare';
import NotCompleteCare from './myPatientList/notCompleteCare';


function MyPatientList() {
  return (
    <div>
      <h1>myPatientList</h1>
      <CompleteCare />
      <NotCompleteCare />
    </div>
  )
}

export default MyPatientList