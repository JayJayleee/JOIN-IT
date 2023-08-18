import React, { useState, useEffect } from 'react';
import './myCareList.css';
import CompleteCare from './myCareList/completeCare';
import NotCompleteCare from './myCareList/notCompleteCare';
import axios from 'axios';
import { Icon } from '@iconify-icon/react';

interface propType {
  eventChangeFtn: (x: number) => void;
  setTreatId: (x: number) => void;
  setCompleteCareStatus: (x: boolean) => void;
  setNameAndJoint: (x: string) => void;
}

function MyCareList({eventChangeFtn, setTreatId, setCompleteCareStatus, setNameAndJoint}: propType) {
  // axios 요청으로 받은 결과를 저장할 state
  const [careList, setCareList] = useState<[]>([]);
  // pagination을 위한 state
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  // 드롭다운 메뉴를 위한 state
  const [dropDownVisibility, setDropDownVisibility] = useState(false);
  const [selectMenu, setSelectMenu] = useState<String>('전체');
  const [visibilityAnimation, setVisibilityAnimation] = useState(false);

  useEffect(() => {

    const headers = {
      'context-Type' : 'apllication/json',
      'Authorization' : `Bearer ${localStorage.getItem('access-token')}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true'
    }

    let url = '';

    if (selectMenu === '진행중') {
      url = `/api/treatment/therapist/uncomplete/${localStorage.getItem('userPk')}`
    } else if (selectMenu === '완료') {
      url = `/api/treatment/therapist/complete/${localStorage.getItem('userPk')}`
    } else {
      url = `/api/treatment/therapist/${localStorage.getItem('userPk')}`;
    }
    

    const fetchData = async () => {
      try {
        const Result = await axios.get(url, {headers})

        setCareList(Result.data)
      } catch(err) {
        console.log(err)
      }
    }
    fetchData();
  }, [selectMenu])

  useEffect(() => {
    if (dropDownVisibility) {
      setVisibilityAnimation(true);
    } else {
      setTimeout(() => {
        setVisibilityAnimation(false);
      }, 400);
    }

  }, [dropDownVisibility])


  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentList = (careList: Array<Object>) => {
    let currentPosts: object[] = [];
    if (careList === undefined) {
      return []
    } else {
      currentPosts = careList.slice(indexOfFirstPost, indexOfLastPost);
      return currentPosts
    }
  }
  let postLength = 0

  if (careList !== undefined) {
    postLength = careList.length
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

  const AllCareList = <div className='col' style={{height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    {currentList(careList).map((care: any) => care.isCompleted === "N"? <NotCompleteCare care={care} eventChangeFtn={eventChangeFtn} key={care.treatmentId} setTreatId={setTreatId} setCompleteCareStatus={setCompleteCareStatus} setNameAndJoint={setNameAndJoint} /> : <CompleteCare care={care} eventChangeFtn={eventChangeFtn} key={care.treatmentId} setTreatId={setTreatId} setCompleteCareStatus={setCompleteCareStatus} setNameAndJoint={setNameAndJoint} />)}
  </div>


  const CareSelectDropdown = <div className={`components-dropdown ${dropDownVisibility? 'slide-fade-in-dropdown': 'slide-fade-out-dropdown'}`}>
    <ul>
      <div className='careselect-option' onClick={() => {setSelectMenu('전체')}}>
        <li>전체</li>
      </div>
      <div className='careselect-line'/>
      <div className='careselect-option' onClick={() => {setSelectMenu('진행중')}}>
        <li>진행중</li>
      </div>
      <div className='careselect-line' />
      <div className='careselect-option' onClick={() => {setSelectMenu('완료')}}>
        <li>완료</li>
      </div>
    </ul>
  </div>

  return (
    <div className='col carelistbox' onClick={() => {if (dropDownVisibility) {setDropDownVisibility(false)}}}>
      <div className='row carelist-header'>
        <div onClick={e => setDropDownVisibility(!dropDownVisibility)} className='row careselect-Dropdown'>
          <p className='careselect-name'>{selectMenu} {dropDownVisibility? <Icon icon="mdi-light:chevron-up"/> : <Icon icon="mdi-light:chevron-down"/>}</p>
        </div>
        { visibilityAnimation && CareSelectDropdown}
        <div className='row carelist-pagination'>{pagination}</div>
      </div>
      <div className='col carelist-content'>
        {careList.length === 0? <div className='col carelist-empty'><p>{selectMenu} 치료 목록이 없습니다.</p></div> : AllCareList}
      </div>
    </div>
  )
}

export default MyCareList