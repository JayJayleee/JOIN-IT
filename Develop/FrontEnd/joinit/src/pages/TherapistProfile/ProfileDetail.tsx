import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './ProfileDetail.css'

interface propType {
  userInfo: profileObject;
  setPagenum: (x: number) => void;
}

type profileObject = {
  [key: string] : string
}

function ProfileDetail({userInfo, setPagenum}: propType) {

  const navigate = useNavigate();

  const [phone, setPhone] = useState('')
  const [hospitalPhone, setHospitalPhone] = useState('')
  const [birthday, setBirthday] = useState('')


  useEffect(()=> {
    if (userInfo.name !== undefined) {
      const hp = userInfo.hospitalNumber.length === 9? `${userInfo.hospitalNumber.substring(0,2)} - ${userInfo.hospitalNumber.substring(2,5)} - ${userInfo.hospitalNumber.substring(5,9)}` :
       (userInfo.hospitalNumber.length === 10? (userInfo.hospitalNumber.substring(0,2) === "02"?  `${userInfo.hospitalNumber.substring(0,2)} - ${userInfo.hospitalNumber.substring(2,6)} - ${userInfo.hospitalNumber.substring(6,10)}` : `${userInfo.hospitalNumber.substring(0,3)} - ${userInfo.hospitalNumber.substring(3,6)} - ${userInfo.hospitalNumber.substring(6,10)}`) :
        `${userInfo.hospitalNumber.substring(0,3)} - ${userInfo.hospitalNumber.substring(3,7)} - ${userInfo.hospitalNumber.substring(7,11)}`)
      const b = userInfo.birth.substring(0,10).replaceAll('-', '/')
      const p = `${userInfo.phone.substring(0,3)} - ${userInfo.phone.substring(3,7)} - ${userInfo.phone.substring(7,11)}`

      setHospitalPhone(hp)
      setBirthday(b)
      setPhone(p)
    } 

  }, [userInfo])


  return (
    <div className='col therapist-profilebox'>
      <div className='col therapist-tprofile-header'>
        <div className='col therapist-tprofile-header-profileImg'>
          <img src="/Assets/Images/Therapist_default_image.png" alt="profile" className='therapist-profile-image'/>
          <p style={{fontWeight:"bold", fontSize: '2.5rem', marginTop: '2rem'}}>{userInfo.name}</p>
          <p style={{marginTop: '1rem'}}>{userInfo.introduce !== null? userInfo.introduce : `안녕하세요 저는 ${userInfo.name}입니다.`}</p>
        </div>
        <div className='therapist-password-change-box'>
          <div className='therapist-password-change-btn' onClick={() => {navigate("/ChangePw")}}>
            <p>비밀번호 수정</p>
          </div>
        </div>
      </div>
      <div className='col therapist-tprofile-content'>
        <div className='row therapist-tprofile-content-header'> 
          <p>치료사 정보</p>
          <div className='row therapist-update-btn' onClick={() => {setPagenum(1)}}>
            <img src="/Assets/Images/editContent.png" alt="pencil" />
            <p>정보 수정</p>
          </div>
        </div>
        <div className='col therapist-tprofile-content-body'>
          <div className='row therapist-profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.1rem', paddingLeft: '4rem'}}>이름</p>
            <div className="therapist-tprofile-real-content-box">
              <p>{userInfo.name}</p>
            </div>
          </div>
          <div className='row therapist-profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.1rem', paddingLeft: '4rem'}}>성별</p>
            <div className="therapist-tprofile-real-content-box">
              <p>{userInfo.gender === "M"? "남자" : "여자"}</p>
            </div>
          </div>
          <div className='row therapist-profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.1rem', paddingLeft: '4rem'}}>생년월일</p>
            <div className="therapist-tprofile-real-content-box">
              <p>{birthday}</p>
            </div>
          </div>
          <div className='row therapist-profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.1rem', paddingLeft: '4rem'}}>아이디</p>
            <div className="therapist-tprofile-real-content-box">
              <p>{userInfo.loginId}</p>
            </div>
          </div>
          <div className='row therapist-profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.1rem', paddingLeft: '4rem'}}>전화번호</p>
            <div className="therapist-tprofile-real-content-box">
              <p>{phone}</p>
            </div>
          </div>
          <div className='row therapist-profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.1rem', paddingLeft: '4rem'}}>소속 병원</p>
            <div className="therapist-tprofile-real-content-box">
              <p>{userInfo.hospitalName}</p>
            </div>
          </div>
          <div className='row therapist-profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.1rem', paddingLeft: '4rem'}}>소속 병원 전화번호</p>
            <div className="therapist-tprofile-real-content-box">
              <p>{hospitalPhone}</p>
            </div>
          </div>
          <div className='row therapist-profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.1rem', paddingLeft: '4rem'}}>이메일</p>
            <div className="therapist-tprofile-real-content-box">
              <p>{userInfo.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileDetail