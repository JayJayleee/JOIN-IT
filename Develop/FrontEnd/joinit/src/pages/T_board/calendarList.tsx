import React, { useState, useEffect } from 'react';
import './calendarList.css'
import axios from 'axios';
import Calendar from '../../Components/calendar/Calendar';
import SelectDay from '../../Components/SelectDay/selectDay';

type saveObject = {
  [key: string] : innerObject
}

type innerObject = {
  [key: string] : number
}

function CalendarList() {

  const [selectedDay, setSelectedDay] = useState(new Date());
  const [posts, setPosts] = useState([]);

  const [prescriptionList, setPrescriptionList] = useState<saveObject>({});

  useEffect(() => {
    
    const headers = {
      'Content-Type' : 'apllication/json',
      'Authorization' : `Bearer ${localStorage.getItem('access-token')}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true'
    }

    const fetchData = async () => {

      try {
        const response = await axios.get(`/api/prescription/therapist/${localStorage.getItem('userPk')}`, {headers});
        const content: any = {};

        response.data.forEach((element: any) => {
          if (Object.keys(content).includes(element.prescriptionTime)) {
            content[element.prescriptionTime][element.prescriptionCode] += 1;
          } else {
            content[element.prescriptionTime] = {"코칭" : 0, "대면" : 0};
          }
        });
        
        setPrescriptionList(content);
        
      } catch(err) {
        console.log(err);
        setPrescriptionList({})
      }
    }
    fetchData();
  }, [])


  useEffect(() => {

    const headers = {
      'Content-Type' : 'apllication/json',
      'Authorization' : `Bearer ${localStorage.getItem('access-token')}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true'
    }

    const fetchData = async () => {

      try {
        const result = await axios.get('/api/prescription/daily/therapist',
         { params: 
          { therapistId: localStorage.getItem('userPk'),
            date: `${selectedDay.getFullYear()}-${selectedDay.getMonth() + 1 >= 10 ? `${selectedDay.getMonth() + 1}` 
            : `0${selectedDay.getMonth() + 1}`}-${selectedDay.getDate() >= 10? `${selectedDay.getDate()}` 
            : `0${selectedDay.getDate()}` }`
          },
          headers: headers
         }
        )
        setPosts(result.data);
      } catch(err) {
        setPosts([]);
      }
    };
    fetchData();
  }, [selectedDay])


  return (
    <div className='col' style={{width: '100%', alignItems: 'center', padding: '15rem 0rem'}}>
      <Calendar selectedDay={selectedDay} setSelectedDay={setSelectedDay} prescriptionList={prescriptionList} type={true} />
      <SelectDay selectedDay={selectedDay} posts={posts} />
    </div>
  )
}

export default CalendarList;