import React from 'react';
import './nav.css';
import TodayRecipe from './nav/todayRecipe';
import MiniProfile from './nav/miniProfile';
import CareList from './nav/careList';
import PatientList from './nav/patientList';
import { Link } from 'react-router-dom';


function Nav() {
  return (
    <div>
      <h1>nav 바</h1>
      <MiniProfile />
      <div>
        <Link to="">Calendar</Link>
        <Link to="">나의 치료 목록</Link>
        <Link to="">나의 환자 목록</Link>
      </div>
    </div>
  )
}

export default Nav