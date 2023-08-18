import React, {useState, useEffect} from 'react'
import './RightDashboard.css'
import Calendar from '../../Components/calendar/Calendar'
import TreatSelectDay from '../../Components/SelectDay/TreatSelectDay'
import Statistic from '../../Components/Statistic/Statistic'
import axios from 'axios'

type saveObject = {
  [key: string] : innerObject
}

type innerObject = {
  [key: string] : number
}

function RightDashboard(props: any) {

  const [selectedDay, setSelectedDay] = useState(new Date());
  const [posts, setPosts] = useState([]);
  const [prescriptionList, setPrescriptionList] = useState<saveObject>({});
  const [beforeStatic, setBeforeStatic] = useState([]);
  const [afterStatic, setAfterStatic] = useState([]);
  
  useEffect(() => {
    
    const headers = {
      'Content-Type' : 'apllication/json',
      'Authorization' : `Bearer ${localStorage.getItem('access-token')}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true'
    }

    const setBeforeData = async () => {
      try {
        const Result = await axios.get(`/api/survey/before/statistics/${props.selectTreatmentId}`, {headers})
        setBeforeStatic(Result.data.result)
      }catch(err) {
        console.log(err)
      }
    }

    const setAfterData = async () => {
      try {
        const Result = await axios.get(`/api/survey/after/statistics/${props.selectTreatmentId}`, {headers})
        setAfterStatic(Result.data.result)
      }catch(err) {
        console.log(err)
      }
    }

    const fetchData = async () => {

      try {
        const response = await axios.get(`/api/prescription/${props.selectTreatmentId}`, {headers});
        const content: any = {};

        response.data.forEach((element: any) => {
          const prescriptionTime = element.prescriptionProcessTime.substr(0,10);
          if (Object.keys(content).includes(prescriptionTime)) {
            content[prescriptionTime][element.prescriptionCode] += 1;
          } else {
            content[prescriptionTime] = {"코칭" : 0, "대면" : 0, "운동" : 0};
            content[prescriptionTime][element.prescriptionCode] += 1;
          }
        });

        setPrescriptionList(content);
        
      } catch(err) {
        console.log(err);
        setPrescriptionList({})
      }
    }
    fetchData();
    if (props.selectTreatmentId !== 0){
      setBeforeData();
      setAfterData();
    }
  }, [props.selectTreatmentId,])


  useEffect(() => {

    const headers = {
      'Content-Type' : 'apllication/json',
      'Authorization' : `Bearer ${localStorage.getItem('access-token')}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true'
    }

    const fetchData = async () => {

      try {
        const result = await axios.get('/api/prescription/daily/treatment',
         { params: 
          { treatmentId: props.selectTreatmentId, 
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
  }, [props.selectTreatmentId, selectedDay])

  return (
    <div className='col' style={{width: '100%', alignItems: 'center', padding: '15rem 0rem'}}>
      <Calendar selectedDay={selectedDay} setSelectedDay={setSelectedDay} prescriptionList={prescriptionList} />
      <TreatSelectDay selectedDay={selectedDay} posts={posts} existTodolist={props.existTodolist} />
      <Statistic existTodolist={props.existTodolist} beforeStatic={beforeStatic} afterStatic={afterStatic} />
    </div>
  )
}

export default RightDashboard