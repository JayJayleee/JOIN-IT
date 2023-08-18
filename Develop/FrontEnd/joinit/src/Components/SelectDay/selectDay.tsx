import React, { useState, useEffect } from 'react';
import './selectDay.css';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

function SelectDay(props: any) {

  const navigate = useNavigate();
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


  const FirstBtnFtn = (data: any) => {
    if (today === inputDate) {
      if (data.isCompleted === 'N') {
        navigate(`/therapist/coaching/${data.prescriptionId}`);
      } else {
        navigate(`/CoachDetailPage/${data.prescriptionId}`)
      }
    } else {
      navigate(`/CoachDetailPage/${data.prescriptionId}`)
    }
  } 


  const prescriptionBox = <div className='col mini-prescription-box'>
    {currentPosts(posts).map((data: any) => (
      <div className='row prescription-box-detail' key={data.prescriptionId} style={{backgroundColor: (today !== inputDate)? '#858585' : '#58867a'}}>
        <div className='prescription-box-detail-image'>
          <img src="/Assets/Images/patient_image.png" alt="patient" style={{width: '4rem', height: '4rem'}}/>
        </div>
        <div className='col prescription-box-detail-text'>
          <div className='row prescription-box-detail-text-title'>
            <p style={{fontWeight: 'bold', fontSize: '20px'}}>{data.patientName} - {data.prescriptionCode}</p>
            <p>{data.prescriptionProcessTime.substring(2,10).replaceAll('-', '.')} {data.prescriptionProcessTime.substring(11,16)}</p>
          </div>
          <div className='prescription-box-detail-text-description' style={{display: data.prescriptionCode === "대면"? 'none' : 'flex', justifyContent: 'flex-end'}}>
            <div className='prescription-box-detail-button' style={{backgroundColor: today === inputDate? '#0F5953' : '#383838'}} onClick={(e) => FirstBtnFtn(data)}>
              {(today === inputDate)? (data.isCompleted === 'N'? <p>시작하기</p> : <p>자세히보기</p>) : <p>자세히보기</p>}
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>

  return (
    <React.Fragment>
    <div className='col origin-selectBox'>
      <div className='selectday'>
        <p>{inputDate}</p>

      </div>
      <div className='row pre-pagination'>{pagination}</div>
      <div className='col prescriptionBox'>
        {isEmptyArray && <p className='empty-message'>이 날의 치료 일정이 없어요</p>}
        {!isEmptyArray && prescriptionBox}
      </div>
    </div>
    </React.Fragment>
  )
}

export default SelectDay;