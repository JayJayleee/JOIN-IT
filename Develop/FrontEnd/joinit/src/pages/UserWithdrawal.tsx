import React, { useState } from 'react';
import './AccountCommon/UserWithdrawal.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function UserWithdrawal() {

  const headers = {
    "Access-Control-Allow-Origin" : "*",
    "Context-Type" : "application/json",
    'Access-Control-Allow-Credentials': 'true'
  }

  const [userPassword, setUserPassword] = useState('');
  const [firstBtnActive, setFirstBtnActive] = useState(false);


  const comment = "✔ 인증이 완료되었습니다."

  const navigate = useNavigate();

  /** 비밀번호 인증하기 버튼 클릭 / 비밀번호 입력 창에서 엔터 키 입력 시 실행하는 함수 */
  const CheckIdAndPw = async (e: React.KeyboardEvent<HTMLInputElement>|React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (userPassword === "") {
      alert('비밀번호를 입력해주세요.')

    } else {
      try {
        // await axios.post('/api/user/check/password', {userId: localStorage.getItem('userId'), password : userPassword}, { headers: headers })
        setFirstBtnActive(true);
      } catch(err) {
        if ( axios.isAxiosError(err) ) {
          if (err.response?.status === 400) {
            alert('비밀번호가 일치하지 않습니다.')
            setUserPassword('');
          } else {
            alert('서버 에러로 인하여 조금 후에 시도해주세요.')
          }
        }
      }
    }
  }

  /** 회원 탈퇴하기 버튼 클릭 시 실행하는 함수 */
  const DeleteUserAccount = async () => {
    try {
      await axios.delete('/api/user/delete', { data: { userId: localStorage.getItem('userId') }, headers: headers })
      alert('계정이 삭제되었습니다.');
      navigate('/');
    } catch(err) {
      alert('서버 에러로 인하여 조금 후에 시도해주세요.')
    }
  }

  return <div className='col withdrawalPage'>
    <img src="/Assets/Images/Logo.png" alt="Logo" className='withdrawalLogoImg' title="메인 페이지로 이동" onClick={e => {navigate('/')}}/>
    <p style={{fontSize: '2.2rem', fontWeight: 'bold', marginBottom: '2rem'}}>탈퇴를 위해 비밀번호를 입력해주세요</p>
    <div className='col'>
      <div className='col withdrawal-password'>
        <p>비밀번호 *</p>
        <label className='withdrawal-password-input'>
          <input type="password" id="password" value={userPassword} style={{fontSize:'1.7rem'}} onKeyDown={(e) => {if (e.key === 'Enter') {CheckIdAndPw(e);}}} onChange={(el) => {setUserPassword(el.target.value)}} />
          <div className='withdrawal-password-check' onClick={(e) => {CheckIdAndPw(e)}}>
            <p>인증하기</p>
          </div>
        </label>
      </div>
      <p style={{fontSize: '1.7rem', color: '#0F5953'}}>{firstBtnActive && comment}</p>
      <div className={`withdrawal-submit-button ${firstBtnActive? '' : 'grey'}`} onClick={firstBtnActive? DeleteUserAccount : undefined }>
        <div className={`withdrawal-submit-button-inner ${firstBtnActive? '' : 'grey'}`} />
        <p>탈퇴하기</p>
      </div>
    </div>
  </div>
}

export default UserWithdrawal