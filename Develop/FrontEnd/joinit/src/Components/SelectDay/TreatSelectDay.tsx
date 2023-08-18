import React, { useState, useEffect } from 'react';
import './TreatSelectDay.css';
import { format } from 'date-fns';
import Coaching from '../PrescriptionType/Coaching';
import CoachingComplete from '../PrescriptionType/CoachingComplete';
import CoachingNotComplete from '../PrescriptionType/CoachingNotComplete';
import Exercise from '../PrescriptionType/Exercise';
import ExerciseComplete from '../PrescriptionType/ExerciseComplete';
import ExerciseNotComplete from '../PrescriptionType/ExerciseNotComplete';
import Meeting from '../PrescriptionType/Meeting';


function TreatSelectDay(props: any) {

  const today = format(new Date(), 'yyyy.MM.dd')

  // 선택된 날짜를 저장할 state
  const [inputDate, setInputDate] = useState('');

  // 페이지네이션을 위한 state
  const [isEmptyArray, setEmptyArray] = useState(true);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);

  useEffect(() => {

    setInputDate(`${props.selectedDay.getFullYear()}.${props.selectedDay.getMonth() + 1 >= 10 ? `${props.selectedDay.getMonth() + 1}` 
    : `0${props.selectedDay.getMonth() + 1}`}.${props.selectedDay.getDate() >= 10? `${props.selectedDay.getDate()}` 
    : `0${props.selectedDay.getDate()}` }`)

    if (props.posts.length === 0) {
      setPosts([])
      setEmptyArray(true);
    } else {
      setPosts(props.posts)
      setEmptyArray(false);
    }

  }, [props.selectedDay, props.posts])


  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = (posts: Array<Object>) => {
    let currentPosts: object[] = [];
    if (posts === undefined) {
      return []
    } else {
      currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
      return currentPosts
    }
  }
  let postLength = 0

  if (posts !== undefined) {
    postLength = posts.length
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

  const prescriptionBox = <div className='col mini-prescription-box'>
    {currentPosts(posts).map((data: any) => {
      if (data.prescriptionCode === "대면") {
        return <Meeting data={data} inputDate={inputDate} key={data.prescriptionId} />
      } else if (data.prescriptionCode === "코칭") {
        if (data.isCompleted === 'Y') {
          return <CoachingComplete data={data} key={data.prescriptionId} />
        } else if (today !== data.prescriptionProcessTime.substring(0,10).replaceAll('-', '.')) {
          return <CoachingNotComplete data={data} key={data.prescriptionId} />
        } else {
          return <Coaching data={data} key={data.prescriptionId} />
        } 
      } else {
        if (data.isCompleted === 'Y') {
          return <ExerciseComplete data={data} key={data.prescriptionId} />
        } else if (today !== data.prescriptionProcessTime.substring(0,10).replaceAll('-', '.')) {
          return <ExerciseNotComplete data={data} key={data.prescriptionId} />
        } else {
          return <Exercise data={data} key={data.prescriptionId} />
        }
      }}
    )}
  </div>


  const innerHtmlStructure = <React.Fragment>
    <div className='selectday'>
        <p>{inputDate}</p>
      </div>
      <div className='row pre-pagination'>{pagination}</div>
      <div className='col prescriptionBox'>
        {isEmptyArray && <p className='empty-message'>이 날의 치료 일정이 없어요</p>}
        {!isEmptyArray && prescriptionBox}
      </div>
  </React.Fragment>

  return (
    <React.Fragment>
    <div className='col selectBox'>
      {!props.existTodolist? innerHtmlStructure : <p>아직 회원님을 위해 처방된 활동이 없어요.</p>}
    </div>
    </React.Fragment>
  )
}

export default TreatSelectDay;