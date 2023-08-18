import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './NewPwInput.css'
import axios from 'axios';

interface propType {
  loginId: string
}

function NewPwInput({loginId}: propType) {

  // axios header 정보
  const headers = {
    "Access-Control-Allow-Origin" : "*",
    "Context-Type" : "application/json",
  }

  const [firstPw, setFirstPw] = useState('');
  const [secondPw, setCheckPassword] = useState('');


  // 첫번째 비밀번호 입력 시 길이에 따라 문구 출력
  let firstPwComment = ""
  if (firstPw.length < 8) {
    firstPwComment = "비밀번호는 최소 8자리 이상이여야 합니다."
  } else {}

  // 첫번째 비밀번호의 안전도 검사 함수

  const [progressValue, setProgressValue] = useState(0);

  const strengthBar = document.getElementById('meter')! as HTMLElement;

  const CheckNewPassword = (e: any) => {
    let strength = 0
    const regexes = [
      /[0-9]/,
      /[a-z]/,
      /[A-Z]/,
      /[~!@#$%^&*()_+|<>?:{}]/,
    ]

    if (e.length >= 8) {
      regexes.forEach((regex, index) => {
        strength += e.match(regex) ? 1 : 0
      })

      setProgressValue(strength)
    
      switch(strength) {
          case 1:
          strengthBar.style.setProperty("--c", "red")
          break
          case 2:
          case 3:
          strengthBar.style.setProperty("--c", "orange")
          break
          case 4:
          strengthBar.style.setProperty("--c", "green")
          break
      }
    } else {
      setProgressValue(0)
    }
  }


  // 두번째 비밀번호와 첫번째 비밀번호 일치 여부 확인 후 문구 출력
  let comment = ""
  
  if (firstPw.length !== 0) {
    if (firstPw === secondPw) {
      comment = "✔ 비밀번호가 일치합니다."
    } else {
      comment = "비밀번호가 일치하지 않습니다."
    }
  }

  // 비밀번호 변경 완료 버튼 클릭 시 실행하는 함수
  const movePage = useNavigate();

  const ChangePwHandler = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    try {
      await axios.put('/api/user/password', { loginId, password : firstPw }, { headers })
      alert('비밀번호 변경이 완료되었습니다.');
      movePage('/login');
    } catch(err) {
      console.log(err)
      alert('비밀번호 변경에 실패하였습니다.')
    }
  }

  return (
  <div className='col newinputpwpage'>
    <img src="/Assets/Images/Logo.png" alt="Logo" className='newinputpwLogoImg' />
    <p style={{fontSize: '2.2rem', fontWeight: 'bold', marginBottom: '2rem'}}>비밀번호 수정</p>
    <div className='col'>
      <div className='col changepw-firstPw'>
        <p>새로운 비밀번호 *</p>
        <label className={`changepw-firstPw-input ${firstPw.length < 8? 'red': 'green'}`}>
          <input type="password" value={firstPw} style={{fontSize:'1.7rem'}} onChange={(e) => {setFirstPw(e.target.value)}} onKeyUp={(e: any) => {CheckNewPassword(e.target.value)}}/>
        </label>
        <div className='row changepw-firstPw-comment'>
          <p style={{color: firstPw.length < 8? 'red' : ''}}>{firstPwComment}</p>
          <div className='row'>
            <p>비밀번호 안전도</p>
            <progress max="4" value={progressValue} id="meter"></progress>
          </div>
        </div>
      </div>
      <div className='col changepw-secondPw'>
        <p>비밀번호 재 입력 *</p>
        <label className={`changepw-secondPw-input ${firstPw === secondPw ? 'green' : 'red'}`}>
          <input type="password"  value={secondPw} disabled={firstPw.length < 8? true: false} style={{fontSize:'1.7rem'}} onChange={(e) => {setCheckPassword(e.target.value)}}/>
        </label>
        <p style={{color: firstPw === secondPw ? 'green' : 'red', fontSize: '1.5rem', marginTop: '1rem'}}>{comment}</p>
      </div>
      <div className='newinputpw-submit-button' style={{backgroundColor: (firstPw !== '' && firstPw === secondPw)? '#58867a' : '#858585', cursor: (firstPw !== '' && firstPw === secondPw)? 'pointer' : 'default'}}
      onClick={firstPw === secondPw? (e) => {ChangePwHandler(e)} : undefined}>
        <div className='newinputpw-submit-button-inner' style={{backgroundColor: (firstPw !== '' && firstPw === secondPw)? '#0F5953' : '#858585'}}/>
        <p>비밀번호 변경 완료</p>
      </div>
    </div>
  </div>
  )
}

export default NewPwInput