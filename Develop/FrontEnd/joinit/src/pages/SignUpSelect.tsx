import React from 'react'
import { useNavigate } from 'react-router-dom'
import './AccountCommon/SignUpSelect.css'

function SignUpSelect() {
  
  const moveSelectTypeSignupPage = useNavigate();

  const moveMainPage = () => {
    moveSelectTypeSignupPage('/')
  }

  const movePatientSignupPage  = () => {
    moveSelectTypeSignupPage('/SignUp/patient')
  }

  const moveTherapistSignupPage  = () => {
    moveSelectTypeSignupPage('/SignUp/therapist')
  }

  return (
    <div className='col selectPage'>
      <img src="/Assets/Images/Logo.png" alt="Logo" className='selectLogoImg' onClick={moveMainPage} title='메인 페이지로 이동하기'/>
      <div className='col signupSelectorboard'>
        <p>회원가입</p>
        <div className='row selectbuttongroup'>
          <div className='selectbtn' onClick={movePatientSignupPage}>
            <p>환자 회원가입</p>
          </div>
          <div className='selectbtn' onClick={moveTherapistSignupPage}>
            <p>치료사 회원가입</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpSelect