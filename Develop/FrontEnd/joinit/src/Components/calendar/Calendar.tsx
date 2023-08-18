import React, { useEffect, useState } from 'react';
import './calendar.css';
import { Icon } from '@iconify-icon/react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameDay, isSameMonth, addDays } from 'date-fns';


//header로 전달하는 변수들의 type
interface headerprop {
  currentMonth: Date;
  prevMonth: () => void;
  nextMonth: () => void;
}

//body로 전달하는 변수들의 type
interface bodyprop {
  currentMonth: Date;
  selectedDate: Date;
  onDateClick: (x:Date) => void;
  prescriptionList: saveObject
}

type saveObject = {
  [key: string] : innerObject
}

type innerObject = {
  [key: string] : number
}

// 달력 상단의 현재 보는 월과 년도, 월 이동 버튼을 나타내는 컴포넌트
const RenderHeader = ({currentMonth, prevMonth, nextMonth}: headerprop) => {
  return (
    <div className='header row'>
      <div className='col col-start'>
        <span className='text'>
          <span className='text month'>
            {format(currentMonth, 'M')}월
          </span>
          {format(currentMonth, 'yyyy')}
        </span>
      </div>
      <div className='row col-end'>
        <Icon icon="bi:arrow-left-square-fill" onClick={prevMonth} className='calendarbtn' title='이전달'/>
        <Icon icon="bi:arrow-right-square-fill" onClick={nextMonth} className='calendarbtn' title='다음달'/>
      </div>
    </div>
  )
}

// 달력에서 요일을 나타내는 컴포넌트
const RenderDays = () => {
  const days = [];
  const date = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  for (let i=0; i<7; i++) {
    days.push(
      <div className={`days-col ${date[i] === 'SUN'? 'red' : (date[i] === 'SAT'? 'blue' : '')}`} key={i}>
        {date[i]}
      </div>
    )
  }

  return <div className='days row'>{days}</div>
}


const RenderCells = ({currentMonth, selectedDate, onDateClick, prescriptionList}: bodyprop) => {

  const [isValid, setIsValid] = useState(true);
  // const [isRows, setRows] = useState<string[]>([]);
  // const [selectedDateObject, setSelectedDateObject] = useState<saveObject>({});


  useEffect(() => {
    // setSelectedDateObject(prescriptionList);
    // const newList: string[] = []
    // Object.keys(prescriptionList).forEach((element: string) => {
    //   const date = element.substring(0, 7);
    //   if (newList.includes(date)) {
    //   } else {
    //     newList.push(date)
    //   }
    // })
    // setRows(newList);
    Object.keys(prescriptionList).forEach((element: string) => {
      const d: HTMLElement|null = document.getElementById(element)
      const divComponent = React.createElement('div', {className: 'col careCount'});

    //   <div className='col careCount'>
    //   <p className='carecount-title' style={{color: 'white', backgroundColor: '#A4B0B0'}}>대면 {selectedDateObject[compare]["대면"]}</p>
    //   <p className='carecount-title' style={{color: '#0F5953', backgroundColor: '#55CDAE'}}>코칭 {selectedDateObject[compare]["코칭"]}</p>
    // </div>
      if (d !== null) {
        const p1Component = React.createElement('p', {style: {color: 'white', backgroundColor: '#A4B0B0'}, className: 'carecount-title'}, `대면 ${prescriptionList[element]["대면"]}`);
        const p2Component = React.createElement('p', {style: {color: '#0F5953', backgroundColor: '#55CDAE'}, className: 'carecount-title'}, `코칭 ${prescriptionList[element]["코칭"]}`);
        // divComponent.appendChild(p1Component);
        // divComponent.appendChild(p2Component);
        // d.appendChild(divComponent)
      }
    })
  }, [prescriptionList])

  // useEffect(() => {

  //   const monthStart = startOfMonth(currentMonth);
  //   const monthEnd = endOfMonth(monthStart);
  //   const startDate = startOfWeek(monthStart);
  //   const endDate = endOfWeek(monthEnd);

  //   const rows = []; 
  //   let days = [];
  //   let day = startDate;
  //   let formattedDate = '';
  //   let compare = '';

  //   const arr = Object.keys(selectedDateObject)
  //   if(arr.length !== 0) {
  //     while (day <= endDate) {
  //       for (let i=0; i<7; i++) {
  //         formattedDate = format(day, 'd');
  //         compare = format(day, 'yyyy-MM-dd')
  //         const cloneDay = day;
  //         let isContainDay = false;
    
    
  //         if(isValid) {
  //           isContainDay = arr.indexOf(compare) !== -1? true : false;
  //         }

  //         days.push(
  //           <div 
  //           className={`body-col row cell ${!isSameMonth(day, monthStart) ? 'disabled' : isSameDay(day, selectedDate) ? 'selected' : format(currentMonth, 'M') !== format(day, 'M')? 'not-valid' : 'valid'}`} 
  //           key={compare} 
  //           onClick={() => onDateClick(cloneDay)}>
  //             <span className={`calendarSpan ${format(currentMonth, 'M') !== format(day, 'M')? 'text not-valid' : ''}`}>{formattedDate}</span>
  //             {isContainDay && <div className='col careCount'>
  //               <p className='carecount-title' style={{color: 'white', backgroundColor: '#A4B0B0'}}>대면 {selectedDateObject[compare]["대면"]}</p>
  //               <p className='carecount-title' style={{color: '#0F5953', backgroundColor: '#55CDAE'}}>코칭 {selectedDateObject[compare]["코칭"]}</p>
  //             </div>}
  //           </div>
  //         );
  //         day = addDays(day, 1);
  //         if(isValid && isContainDay) {
  //           arr.splice(arr.indexOf(compare), 1);
  //         }
  //         if (arr.length === 0) {
  //           setIsValid(false);
  //         }
  //       }
          
        
  //       rows.push(
  //         <div className='body-row' key={compare}>
  //           {days}
  //         </div>
  //       );
  //       days = [];
  //     }
  //     setRows(rows)
  //   }
  // }, [prescriptionList])

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = '';
  let compare = '';

  while (day <= endDate) {
    for (let i=0; i<7; i++) {
      formattedDate = format(day, 'd');
      compare = format(day, 'yyyy-MM-dd')
      const cloneDay = day;

      days.push(
        <div 
        className={`body-col row cell ${!isSameMonth(day, monthStart) ? 'disabled' : isSameDay(day, selectedDate) ? 'selected' : format(currentMonth, 'M') !== format(day, 'M')? 'not-valid' : 'valid'}`} 
        key={compare} id={compare}
        onClick={() => onDateClick(cloneDay)}>
          <span className={`calendarSpan ${format(currentMonth, 'M') !== format(day, 'M')? 'text not-valid' : ''}`}>{formattedDate}</span>
          {/* <div className='col careCount'>
            <p className='carecount-title' style={{color: 'white', backgroundColor: '#A4B0B0'}}>대면 {selectedDateObject[compare]["대면"]}</p>
            <p className='carecount-title' style={{color: '#0F5953', backgroundColor: '#55CDAE'}}>코칭 {selectedDateObject[compare]["코칭"]}</p>
          </div> */}
        </div>
      );
      
      day = addDays(day, 1);
      // if(isValid) {
      //   if (isContainDay) {
      //     arr.splice(arr.indexOf(compare), 1);
      //   }
      //   if (arr.length === 0) {
      //     setIsValid(false);
      //   }
      // }
    }
    
    rows.push(
      <div className='body-row' key={formattedDate}>
        {days}
      </div>
    );
    days = [];
  } 
  return <div className='body'>{rows}</div>
}


function Calendar(props: any) {
  // 현재 날짜를 알려줄 변수와 선택된 날짜를 알려줄 변수 생성
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  }

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  }

  const onDateClick = (day: Date) => {
    props.setSelectedDay(day);
  }


  return (
    <div className='col calendarBox' style={{top: props.type? (props.type === true? '16rem' : ''):'57rem'}}>
      <RenderHeader
       currentMonth={currentMonth}
       prevMonth={prevMonth}
       nextMonth={nextMonth} />
      <RenderDays />
      <RenderCells
       currentMonth={currentMonth}
       selectedDate={props.selectedDay}
       onDateClick={onDateClick}
       prescriptionList={props.prescriptionList} />
    </div>
  )
}

export default Calendar;