import React from 'react';
import './nav.css';
import TodayRecipe from './nav/todayRecipe';

interface propsType {
  eventChangeFtn : (num: number) => void
  nowPage : number
}


function Navbar({eventChangeFtn, nowPage}:propsType) {

  return (
    <div className='col nav-container'>
      <div className='col nav-list'>
        <div className='divbtn ' onClick={() => eventChangeFtn(0)}>
          <div className='selectedPagetab' style={{backgroundColor: nowPage === 0 ? '#58867A' : '#0f5953'}}>
            <p>Calendar</p>
          </div>
        </div>
        <div className='h_Line'/>
        <div className='divbtn ' onClick={() => eventChangeFtn(1)}>
          <div className='selectedPagetab' style={{backgroundColor: nowPage === 1 || nowPage === 3? '#58867A' : '#0f5953'}}>
            <p>나의 치료 목록</p>
          </div>
        </div>
        <div className='h_Line'/>
        <div className='divbtn ' onClick={() => eventChangeFtn(2)}>
          <div className='selectedPagetab' style={{backgroundColor: nowPage === 2 || nowPage === 4? '#58867A' : '#0f5953'}}>
            <p>나의 환자 목록</p>
          </div>
        </div>
      </div>
      <TodayRecipe />
    </div>
  )
}

export default Navbar