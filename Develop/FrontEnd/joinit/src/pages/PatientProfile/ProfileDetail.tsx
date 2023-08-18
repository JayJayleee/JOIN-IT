import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './ProfileDetail.css'

interface propType {
  userInfo: profileObject;
  setPagenum: (x: number) => void;
}

type profileObject = {
  birth: string;
  email: string;
  etc: string;
  gender: string;
  height: number;
  loginId: string;
  name: string;
  nickname: string;
  pastAccidentDetails: string;
  patientDiseaseList: [];
  phone: string;
  significant: string;
  userId: string;
  weight: number;
}

type stringObj = {
  [key: string] : string;
}

function ProfileDetail({userInfo, setPagenum}: propType) {

  const navigate = useNavigate();

  const [phone, setPhone] = useState('')
  const [birthday, setBirthday] = useState('')

  const diseaseList: stringObj = {
    'DO1' : '고혈압',
    'DO2' : '간경화증',
    'DO3' : '뇌졸중',
    'DO4' : '당뇨',
    'DO5' : '백혈병',
    'DO6' : '심근경색',
    'DO7' : '심장판막증',
    'DO8' : '암',
    'DO9' : '에이즈',
    'D10' : '협심증',
  }


  useEffect(()=> {
    if (userInfo.name !== undefined) {
      const b = userInfo.birth? userInfo.birth.substring(0,10).replaceAll('-', '.') : ''
      const p = userInfo.phone? `${userInfo.phone.substring(0,3)} - ${userInfo.phone.substring(3,7)} - ${userInfo.phone.substring(7,11)}`: ''

      setBirthday(b)
      setPhone(p)
    } 
  }, [userInfo])


  return (
    <div className='col profilebox'>
      <div className='col tprofile-header'>
        <div className='col tprofile-header-profileImg'>
          <div className='profileImg-box-circle'>
             <p>{userInfo.name? userInfo.name.substring(0,1) : ''}</p>
          </div>
          <div className='row nicknameAndChangePwd'>
            <p style={{fontWeight:"bold", fontSize: '2.5rem', marginLeft: '45.8%'}}>{userInfo.nickname}</p>
            <div className='password-change-btn' onClick={() => {navigate("/ChangePw")}}>
              <p>비밀번호 수정</p>
            </div>
          </div>
        </div>
      </div>
      <div className='col tprofile-content'>
        <div className='row tprofile-content-header'> 
          <p>회원 기본 정보</p>
          <div className='row update-btn' onClick={() => {setPagenum(1)}}>
            <img src="/Assets/Images/editContent.png" alt="pencil" />
            <p>정보 수정</p>
          </div>
        </div>
        <div className='col tprofile-content-body'>
          <div className='row profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.1rem', paddingLeft: '4rem'}}>이름</p>
            <div className="tprofile-real-content-box">
              <p>{userInfo.name}</p>
            </div>
          </div>
          <div className='row profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.1rem', paddingLeft: '4rem'}}>아이디</p>
            <div className="tprofile-real-content-box">
              <p>{userInfo.loginId}</p>
            </div>
          </div>
          <div className='row profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.1rem', paddingLeft: '4rem'}}>이메일</p>
            <div className="tprofile-real-content-box">
              <p>{userInfo.email}</p>
            </div>
          </div>
          <div className='row profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.1rem', paddingLeft: '4rem'}}>전화번호</p>
            <div className="tprofile-real-content-box">
              <p>{phone}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='col tprofile-content'>
        <div className='row tprofile-content-header'> 
          <p>회원 추가 정보</p>
          <div className='row update-btn' onClick={() => {setPagenum(1)}}>
            <img src="/Assets/Images/editContent.png" alt="pencil" />
            <p>정보 수정</p>
          </div>
        </div>
        <div className='col tprofile-content-body'>
          <div className='row profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.1rem', paddingLeft: '4rem'}}>닉네임</p>
            <div className="tprofile-real-content-box">
              <p>{userInfo.name}</p>
            </div>
          </div>
          <div className='row profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.1rem', paddingLeft: '4rem'}}>생년월일</p>
            <div className="tprofile-real-content-box">
              <p>{birthday}</p>
            </div>
          </div>
          <div className='row profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.1rem', paddingLeft: '4rem'}}>성별</p>
            <div className="tprofile-real-content-box">
              <p>{userInfo.gender === "M"? "남자" : "여자"}</p>
            </div>
          </div>
          <div className='row profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.1rem', paddingLeft: '4rem'}}>키(cm)</p>
            <div className="tprofile-real-content-box">
              <p>{userInfo.height}</p>
            </div>
          </div>
          <div className='row profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.1rem', paddingLeft: '4rem'}}>몸무게(kg)</p>
            <div className="tprofile-real-content-box">
              <p>{userInfo.weight}</p>
            </div>
          </div>
          <div className='row profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.1rem', paddingLeft: '4rem'}}>보유 질환</p>
            <div className="tprofile-real-content-box-long">
              {userInfo.patientDiseaseList.length === 0? <p>보유 질환이 없습니다.</p>
               : userInfo.patientDiseaseList.map((el: any) => {
                return <p key={el.diseaseId}>{diseaseList[el.diseaseCode]}</p>
              })}
            </div>
          </div>
          <div className='row profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.1rem', paddingLeft: '4rem'}}>사고 이력</p>
            <div className="tprofile-real-content-box-long">
              <p>{userInfo.pastAccidentDetails}</p>
            </div>
          </div>
          <div className='row profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.1rem', paddingLeft: '4rem'}}>특이 사항</p>
            <div className="tprofile-real-content-box-long">
              <p>{userInfo.significant}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileDetail