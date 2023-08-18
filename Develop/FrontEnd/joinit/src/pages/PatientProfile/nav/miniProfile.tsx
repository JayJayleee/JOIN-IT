import React, { useState, useEffect } from 'react';
import './miniProfile.css';
import axios from 'axios';

interface propType {
  setGoToRegisterCareCode: (x: boolean) => void;
}

function MiniProfile({setGoToRegisterCareCode}: propType) {

  const [patientProfile, setPatientProfile] = useState({
    name: '',
    gender: '',
    birth: ''
  });

  useEffect(() => {

    const headers = {
      'context-Type' : 'apllication/json',
      'Authorization' : `Bearer ${localStorage.getItem('access-token')}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true'
    }

    const fetchData = async () => {
      try {
        const Result = await axios.get(`/api/patient/profile/${localStorage.getItem('userPk')}`, {headers})
        setPatientProfile({name: Result.data.name, gender: Result.data.gender === 'M' ? '남' : '여' , birth: Result.data.birth.substring(0,10)})
      } catch(err) {
        console.log(err)
      }
    }
    fetchData();
  }, [])

  return (
    <div className='miniProfile col'>
      <div className="PatientName">{patientProfile.name}</div>
      <div className='PatientDetail'>{patientProfile.gender} {patientProfile.birth}</div>
      <div className="Patientcarecode" onClick={e => setGoToRegisterCareCode(true)}>치료 번호 등록</div>
    </div>
  )
}

export default MiniProfile