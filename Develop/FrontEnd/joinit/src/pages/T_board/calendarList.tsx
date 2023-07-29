import React from 'react';
import './calendarList.css'
import Calendar from './calendarList/calendar';
import SelectDay from './calendarList/selectDay';


function CalendarList() {
  return (
    <div className='col'>
      <Calendar />
      <SelectDay />
    </div>
  )
}

export default CalendarList;