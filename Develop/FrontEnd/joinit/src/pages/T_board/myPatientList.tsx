import React, { useState, useEffect } from 'react';
import './myPatientList.css';
import axios from 'axios';
import CompleteCare from './myPatientList/completeCare';
import NotCompleteCare from './myPatientList/notCompleteCare';


interface propType {
  eventChangeFtn: (x: number) => void;
  setPatientId: (x: string) => void;
}


function MyPatientList({eventChangeFtn, setPatientId}: propType) {
  // axios로 받은 결과 값을 저장하기 위한 state
  const [patientList, setPatientList] = useState<[]>([]);
  // 페이지네이션을 위한 state
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  useEffect(() => {

    const headers = {
      'context-Type' : 'apllication/json',
      'Authorization' : `Bearer ${localStorage.getItem('access-token')}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true'
    }

    const fetchData = async () => {
      try {
        const Result = await axios.get(`/api/therapist/patient/${localStorage.getItem('userPk')}`, {headers})

        setPatientList(Result.data.data)
      } catch(err) {
        console.log(err)
      }
    }
    fetchData();
  }, [])

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = (patientList: Array<Object>) => {
    let currentPosts: object[] = [];
    if (patientList === undefined) {
      return []
    } else {
      currentPosts = patientList.slice(indexOfFirstPost, indexOfLastPost);
      return currentPosts
    }
  }
  let postLength = 0

  if (patientList !== undefined) {
    postLength = patientList.length
  } 

  let pageNumber = Math.ceil(postLength / postsPerPage);
  if (pageNumber === 0) {
    pageNumber = 1;
  }

  const pagination = <ul className="row pagination">
    <div
      className="pageBoxBtn"
      onClick={currentPage === 1? undefined : () => setCurrentPage(currentPage - 1)}
      style={{backgroundColor: currentPage === 1? '#5D6569' : '#dbf2f1'}}
      >
      <p className="page-link">
        {'<'}
      </p>
    </div>
    <div className="pageBoxPageNum">
      <p>{currentPage} / {pageNumber}</p>
    </div>
    <div
      className="pageBoxBtn"
      onClick={currentPage === pageNumber? undefined : () => setCurrentPage(currentPage + 1)}
      style={{backgroundColor: currentPage === pageNumber? '#5D6569' : '#dbf2f1'}}
    >
      <p className="page-link">
        {'>'}
      </p>
    </div>
  </ul>

  const AllPatientList = <div className='patient-content'>
    {currentPosts(patientList).map((patient: any) => patient.isCompleted === "N"? <NotCompleteCare patient={patient} eventChangeFtn={eventChangeFtn} key={patient.userId} setPatientId={setPatientId} /> : <CompleteCare patient={patient} eventChangeFtn={eventChangeFtn} key={patient.userId} setPatientId={setPatientId} />)}
  </div>

  return (
    <div className='col patientlistBox'>
      <div className='patient-title'>
        <p>나의 환자 목록</p>
      </div>
      <div className='row patientlist-pagination'>{pagination}</div>
      {patientList.length !== 0? AllPatientList : <div className='col patient-no-content'><p>아직 환자 목록이 없어요.</p><p>치료를 시작해보세요!</p></div>}
    </div>
  )
}

export default MyPatientList