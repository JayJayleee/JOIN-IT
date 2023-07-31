import React, { useState } from 'react'
import './PatientLogin.css'
import axios from 'axios';


function PatientLogin() {

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');


  const formSubmitHandler = () => {
    if(!id) {
      alert('ID를 입력해주세요.')
      setId('');
      setPassword('');
      return 
    } else if (!password) {
      alert('PASSWORD를 입력해주세요.')
      setId('');
      setPassword('');
      return 
    } else {
      alert('id : ' + id + ' password : ' + password)
      setId('');
      setPassword('');
      return 
    }
  }

  return (
    <div className='col patient-loginInput'>
      <form className='loginForm' id="loginElem">
        <div className='idSection'>
          <p>ID</p>
          <input
           type="text" 
           name="Id" 
           placeholder='아이디를 입력해주세요.' 
           className='IdInput'
           value={id}
           onChange={(event) => {setId(event.target.value)}}
           />
        </div>
        <div className='passwordSection'>
          <p>Password</p>
          <input
           type="password" 
           name="password" 
           placeholder='비밀번호를 입력해주세요.' 
           className='PasswordInput'
           value={password}
           onChange={(event) => {setPassword(event.target.value)}}
           />
        </div>
        <div className='loginButton' onClick={() => {formSubmitHandler()}} >
          <div className='loginButton-inner' />
          <p>로그인</p>
        </div>
      </form>
      <div className='row social-Login'>
        <div className='social-Login-inner' title='naver로 로그인 하기' onClick={() => {alert('naver 로그인 창')}}>
          <img src="/Assets/Images/naver_logo.png" alt="naver" className='socialLogo'/>
        </div>
        <div className='social-Login-inner' title='google로 로그인 하기' onClick={() => {alert('google 로그인 창')}}>
          <img src="/Assets/Images/google_logo.png" alt="naver" className='socialLogo' />
        </div>
        <div className='social-Login-inner' title='kakao로 로그인 하기' onClick={() => {alert('kakao 로그인 창')}}>
          <img src="/Assets/Images/kakao_logo.png" alt="naver" className='socialLogo' />
        </div>
      </div>
    </div>
  )
}

export default PatientLogin