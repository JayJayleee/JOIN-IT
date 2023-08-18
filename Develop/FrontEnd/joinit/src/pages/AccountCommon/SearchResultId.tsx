import React from 'react'
import { useNavigate } from 'react-router-dom'
import './SearchResultId.css'

interface propType {
  userName: string;
  userId: string;
}

function SearchResultId({userName, userId}: propType) {

  const movePage = useNavigate();

  const moveToLogin = () => {
    movePage('/login')
  }

  const moveToChangePw = () => {
    movePage('/changepw')
  }

  return (
    <div className='col findresultpage'>
      <img src="/Assets/Images/Logo.png" alt="Logo" className='findresultLogoImg' />
      <p style={{fontSize: '22px', fontWeight: 'bold', marginBottom: '20px'}}>아이디 찾기</p>
      <div className='col findresultcontent'>
        <div className='row findresulttext'>
          <p style={{color: '#0F5953', fontSize: '30px'}}>{userName} </p>
          <p> 님의 아이디는</p>
        </div>
        <p style={{fontSize: '70px', fontWeight: 'bold', color: '#0F5953'}}>{userId}</p>
        <p>입니다.</p>
      </div>
      <div className='row resultselectbtn'>
        <div className='resultbtn' onClick={moveToLogin}><p>로그인하기</p></div>
        <div className='resultbtn' onClick={moveToChangePw}><p>비밀번호 찾기</p></div>
      </div>
    </div>
  )
}

export default SearchResultId