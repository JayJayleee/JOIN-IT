import React from 'react';
import './nav.css';
import TodayRecipe from './nav/todayRecipe';

interface propsType {
  eventChangeFtn : (num: number) => void
}


function Navbar({eventChangeFtn}:propsType) {

  return (
    <div className='col nav-container'>
      <div className='col nav-list'>
        <div className='divbtn ' onClick={() => eventChangeFtn(0)}>
          <div className='selectedPagetab'>
            <p>Calendar</p>
          </div>
        </div>
        <div className='h_Line'/>
        <div className='divbtn ' onClick={() => eventChangeFtn(1)}>
          <div className='selectedPagetab'>
            <p>나의 치료 목록</p>
          </div>
        </div>
        <div className='h_Line'/>
        <div className='divbtn ' onClick={() => eventChangeFtn(2)}>
          <div className='selectedPagetab'>
            <p>나의 환자 목록</p>
          </div>
        </div>
      </div>
      <TodayRecipe />
    </div>
  )
}

export default Navbar