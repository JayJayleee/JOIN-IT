import React from 'react';
import './nav.css';
import TodayRecipe from './nav/todayRecipe';
import MiniProfile from './nav/miniProfile';


function Nav() {
  return (
    <div className='col'>
      <h1>nav 바</h1>
      <MiniProfile />
      <div>
        <div>
          <button>Calendar</button>
        </div>
        <hr />
        <div>
          <button>나의 치료 목록</button>
        </div>
        <hr />
        <div>
          <button>나의 환자 목록</button>
        </div>
      </div>
      <TodayRecipe />
    </div>
  )
}

export default Nav