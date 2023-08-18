import React, { useState } from 'react'
import './TherapistLogin.css'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthLogin from '../../store/modules/auth';
import { PostLoginFtn } from '../../utils/AxiosFunction'; 



function TherapistLogin() {

  // axios 요청 시 전달할 headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true'
  }
  // 입력 값을 저장할 state
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  // 입력창 요소 불러오기
  // 로그인 성공 시 이동할 navigate
  const navigate = useNavigate();
  // auth파일의 token 저장을 위한 action 실행을 위해 dispatch 설정
  const dispatch = useDispatch();


  /** 비밀번호 입력 창에서 엔터 키 입력 혹은 로그인 버튼 클릭 시 실행하는 함수
   * 
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
        userType: 'T'
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
          navigate('/Tboard')
        }
      } catch(err) {
        console.log(err)
      }
    }
  }

  return (
    <div className='col therapist-loginInput'>
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
           id='password'
           placeholder='비밀번호를 입력해주세요.' 
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

export default TherapistLogin