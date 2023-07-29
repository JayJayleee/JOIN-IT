import React from 'react';
import './selectDay.css';

function SelectDay() {
  return (
    <div className='col selectBox'>
      <div>
        <h1>선택된 날짜</h1>
      </div>
      <div>
        <div>
          <p>해당 날짜의 처방</p>
        </div>
      </div>
    </div>
  )
}

export default SelectDay;