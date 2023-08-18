import React, { useState } from 'react'
import './PatientLogin.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AuthLogin from '../../store/modules/auth';
import { PostLoginFtn } from '../../utils/AxiosFunction'; 


function PatientLogin() {

  // axios 요청 시 전달할 headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true'
  }
  // auth파일의 token 저장을 위한 action 실행을 위해 dispatch 설정
  const dispatch = useDispatch();
  // 입력 값을 저장할 state
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  // 입력창 요소 불러오기
  // 로그인 성공 시 이동할 navigate
  const navigate = useNavigate();



  /** 비밀번호 입력 창에서 엔터를 누르거나 로그인 버튼 클릭 시 실행하는 함수
   * 1. 아이디가 입력되지 않은 경우 : 아이디 입력 요청 메세지 출력
   * 2. 비밀번호가 입력되지 않은 경우 : 비밀번호 입력 요청 메세지 출력
   * 3. 전부 입력된 경우 : 아이디 & 비밀번호 & 환자 타입을 담아서 로그인 요청
   * 
   * -> 요청 성공 시 : 환자 대시보드로 이동
   * 
   * -> 요청 실패 시 : 아이디와 비밀번호 재입력 요청 메세지 출력 
   */
  const formSubmitHandler = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>|React.KeyboardEvent<HTMLInputElement>) => {
    if(!id) {
      alert('ID를 입력해주세요.')

    } else if (!password) {
      alert('PASSWORD를 입력해주세요.')

    } else {

      const body = {
        loginId: id,
        password,
        userType: 'P'
      };
      try {
        const Result: any = await PostLoginFtn('user/login', body, headers);
        if (axios.isAxiosError(Result)) {
          if (Result.response?.status === 400){
            alert(Result.response.data.error);
            setId('');
            setPassword('');
          } else {
            alert('서버 오류로 인하여 조금 후에 시도해주세요.');
          }
        } else {
          const ResultObject = Result.data;
          dispatch(AuthLogin.actions.Login(ResultObject))
          localStorage.setItem('userType', body.userType);
          navigate('/Pboard')
        }
      } catch(err) {
        console.log(err)
      }
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
           id='Id'
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
           id='Password'
           className='PasswordInput'
           value={password}
           onKeyDown={(e) => {if(e.key === 'Enter') {formSubmitHandler(e)}}}
           onChange={(event) => {setPassword(event.target.value)}}
           />
        </div>
        <div className='loginButton' onClick={(e) => {formSubmitHandler(e)}} >
          <div className='loginButton-inner' />
          <p>로그인</p>
        </div>
      </form>
    </div>
  )
}

export default PatientLogin