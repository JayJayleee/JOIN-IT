import React, { useState } from 'react'
import './AD_login/AD_login.css'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthLogin from '../store/modules/auth';
import { PostLoginFtn } from '../utils/AxiosFunction'; 


function AdLogin() {
  // 페이지 이동을 위한 navigate 설정
  const navigate = useNavigate();
  // auth파일의 token 저장을 위한 action 실행을 위해 dispatch 설정
  const dispatch = useDispatch();
  // axios 요청 시 전달할 headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true'
  }
  // 입력 값을 저장할 state
  const [adId, setAdId] = useState('');
  const [adPassword, setAdPassword] = useState('');
  // 입력창 요소 불러오기
  const adminId = document.getElementById('Id')! as HTMLInputElement;
  const adminPw = document.getElementById('password')! as HTMLInputElement;

  // 아이디 입력 창에서 엔터 키 클릭 시 실행할 함수
  const adminIdInputHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    adminPw.focus();
  }

  /**로그인 버튼 클릭 혹은 비밀번호 입력 창에서 엔티 키 클릭 시 실행할 함수
   * 1. 아이디나 비밀번호가 입력되지 않은 경우 : 입력 요청 메세지 출력
   * 2. 다 입력된 경우 : 두 정보를 담아서 전달, 맞으면 cookie에 refresh Token 저장, localstorage에 userPk, access Token 저장
   */
  const adFormSubmitHandler = async (e: React.MouseEvent<HTMLDivElement,MouseEvent> | React.KeyboardEvent<HTMLInputElement>) => {
    if(!adId) {
      alert('ID를 입력해주세요.')
      adminId.focus();
    } else if (!adPassword) {
      alert('PASSWORD를 입력해주세요.')
      adminPw.focus();
    } else {

      try {

        const body = {
          adminId : adId,
          password : adPassword
        }

        const Result: any = await PostLoginFtn('admin/login', body, headers);
        if (axios.isAxiosError(Result)) {
          if (Result.response?.status === 400){
            alert('아이디와 비밀번호가 일치하지 않습니다.');
            setAdId('');
            setAdPassword('');
          } else {
            alert('로그인 실패');
            setAdId('');
            setAdPassword('');
          }
        } else {
          const ResultObject = Result.data;
          dispatch(AuthLogin.actions.Login(ResultObject))
          alert('로그인 성공')
          navigate('/Adboard')
        }
      } catch(err) {
        console.log(err)
      }
    }
  }

  return (
    <div className='col adloginPage'>
      <img src="/Assets/Images/Logo.png" alt="Logo" className='adLoginLogoImg'/>
      <div>
      <form className='AdloginForm' id="AdloginElem">
        <div className='AdidSection'>
          <p>ID</p>
          <input
           type="text" 
           name="Id"
           id='Id'
           placeholder='아이디를 입력해주세요.' 
           className='AdIdInput'
           value={adId}
           onKeyDown={(e) => {if(e.key === 'Enter') {adminIdInputHandler(e)}}}
           onChange={(event) => {setAdId(event.target.value)}}
           />
        </div>
        <div className='AdpasswordSection'>
          <p>Password</p>
          <input
           type="password" 
           name="password"
           id='password'
           placeholder='비밀번호를 입력해주세요.' 
           className='AdPasswordInput'
           value={adPassword}
           onKeyDown={(e) => {if(e.key === 'Enter') {adFormSubmitHandler(e)}}}
           onChange={(event) => {setAdPassword(event.target.value)}}
           />
        </div>
        <div className='AdloginButton' onClick={(e) => {adFormSubmitHandler(e)}} >
          <div className='AdloginButton-inner' />
          <p>로그인</p>
        </div>
      </form>
      </div>

    </div>
  )
}

export default AdLogin
