import React, { useState } from 'react'
import './AccountCommon/ChangePw.css'
import NewPwInput from './AccountCommon/NewPwInput';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface propsType {
  tabNum: number;
  userId: string;
  setUserId: (x: string) => void;
  userEmail: string;
  setUserEmail: (x: string) => void;
  userInputNum: string;
  setUserInputNum: (x: string) => void;
  SendMessage: (e: React.MouseEvent<HTMLDivElement, MouseEvent>|React.KeyboardEvent) => void;
  CheckAllInputDataHandler: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  inputNumActive: boolean;
  CheckEmailAuthNum: (e: React.MouseEvent<HTMLDivElement, MouseEvent>|React.KeyboardEvent) => void;
  emailCheck: boolean;
  setEmailCheck: (x: boolean) => void;
  setInputNumActive: (x: boolean) => void;
}


function TabContent(
  {tabNum, userId, setUserId, userEmail, setUserEmail, 
    userInputNum, setUserInputNum, SendMessage, CheckAllInputDataHandler, inputNumActive, 
    CheckEmailAuthNum, emailCheck, setEmailCheck, setInputNumActive }: propsType) {
  
  const navigate = useNavigate();

  const firstTab = <div className='col changepwpage'>
    <img src="/Assets/Images/Logo.png" alt="Logo" className='changepwLogoImg' title='로그인 페이지로 이동하기' onClick={(e) => {navigate('/login')}}/>
    <p style={{fontSize: '2.2rem', fontWeight: 'bold', marginBottom: '2rem'}}>개인정보 확인</p>
    <div className='col'>
      <div className='col changepw-id'>
        <p>ID *</p>
        <label className='changepw-id-input'>
          <input type="text" placeholder='example123 *' id="userid" value={userId} style={{fontSize:'1.7rem'}} onChange={(e) => {setInputNumActive(false); setUserId(e.target.value)}}/>
        </label>
      </div>
      <div className='col changepw-email'>
        <p>E-mail *</p>
        <label className='changepw-email-input'>
          <input type="text" placeholder='Example123@example.com *' id='useremail' value={userEmail} style={{fontSize:'1.7rem'}} onKeyDown={inputNumActive? undefined : (e) => {if(e.key === 'Enter') {SendMessage(e);}}} onChange={(e) => {setInputNumActive(false); setUserEmail(e.target.value)}}/>
          <div className='changepw-email-check' style={{display: inputNumActive? 'none' : '' }} onClick={(e) => {SendMessage(e)}}>
            <p>이메일 인증</p>
          </div>
        </label>
      </div>
      <div className='col changepw-authNumInput' style={{display: !inputNumActive? 'none' : 'block'}}>
        <p>인증번호 입력 *</p>
        <label className='changepw-authNumInput-input'>
          <input type="text" id="AuthenEmailNum" value={userInputNum} onKeyDown={(e) => {if (e.key==='Enter') {CheckEmailAuthNum(e)}}} onChange={(e) => {setEmailCheck(false); setUserInputNum(e.target.value)}}/>
          <div className='changepw-authNumInput-check' style={{display: emailCheck? 'none' : ''}} onClick={CheckEmailAuthNum}>
            <p>인증하기</p>
          </div>
        </label>
      </div>
      <div className={`changepw-submit-button ${(emailCheck && inputNumActive)? '' : 'grey'}`} onClick={(emailCheck && inputNumActive)? CheckAllInputDataHandler: undefined} style={{cursor: (emailCheck && inputNumActive)? 'pointer' : 'default'}}>
        <div className={`changepw-submit-button-inner ${(emailCheck && inputNumActive)? '' : 'grey'}`} />
        <p>비밀번호 변경하기</p>
      </div>
    </div>
  </div>
  
  return [ firstTab, <NewPwInput loginId={userId} /> ][tabNum]

}

function ChangePw() {

  // axios header 정보
  const headers = {
    "Access-Control-Allow-Origin" : "*",
    "Context-Type" : "application/json",
  }
  // 컴포넌트 변경을 위한 state
  const [tabNum, setTabNum] = useState(0);
  // 입력 값들을 저장하는 state
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userInputNum, setUserInputNum] = useState('');
  // 인증 번호 입력창 활성화 여부 저장하는 state
  const [inputNumActive, setInputNumActive] = useState(false);
  // 인증 번호 통과 여부를 저장하는 state
  const [emailCheck, setEmailCheck] = useState(false);




  /** 이메일 인증 클릭 시 실행하는 함수
   * 1. 이름과 이메일이 db에 존재하며, 매치하는지를 확인
   * 2. 확인이 되면 이메일로 번호를 발송 후, 알람으로 발송 완료 메시지 출력
   * 3. 인증 번호 입력 창 활성화
   */
  const SendMessage = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>|React.KeyboardEvent) => {

    if (userId === "") {
      alert('아이디를 입력해주세요.')

    } else if (userEmail === "") {
      alert('이메일을 입력해주세요.')

    } else {
      try {
        await axios.post('/api/user/create/email/cert/code', { name: null, loginId : userId, email: userEmail } ,{ headers })
        alert('해당 이메일로 인증 번호가 전송되었습니다.')
        setInputNumActive(true);

      } catch (err) {

        alert('일치하는 데이터가 없습니다.')
        setInputNumActive(false);
        setUserInputNum('');
        return false
      }
    }
  }

    /** 인증 번호 확인 클릭 시 실행하는 함수 
   * 1. 입력된 인증 번호가 백에서 전달한 인증 번호와의 일치 여부 판별
   * 2. 일치하지 않으면 재입력 메시지 출력
   * 3. 일치하면 아이디 확인하기 버튼 활성화
  */
    const CheckEmailAuthNum =  async (e: React.MouseEvent<HTMLDivElement, MouseEvent>|React.KeyboardEvent) => {
      if (userInputNum === '') {
        alert('인증 번호를 입력해주세요.');
      } else {
        try {
          await axios.post('/api/user/check/email', { email: userEmail, emailCertCode: userInputNum });
          alert('인증 번호가 확인되었습니다.');
          setEmailCheck(true);
        } catch (err) {
          alert('인증 번호가 일치하지 않습니다.\n인증 번호를 다시 입력해주세요.');
          setEmailCheck(false);
          setUserInputNum('');
        }
      }
    }


  /** 비밀번호 수정하기 클릭 시 실행하는 함수
   * 1. emailCheck가 true 가 될 때 클릭 이벤트가 생성
   * 2. 클릭 시 비밀번호 수정 페이지로 컴포넌트 전환
   */
  const CheckAllInputDataHandler =  (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setTabNum(1);
  }

  return <TabContent
   tabNum={tabNum} 
   userId={userId} 
   userEmail={userEmail} 
   userInputNum={userInputNum} 
   SendMessage={SendMessage} 
   CheckAllInputDataHandler={CheckAllInputDataHandler} 
   setUserId={setUserId} 
   setUserEmail={setUserEmail} 
   setUserInputNum={setUserInputNum}
   inputNumActive={inputNumActive}
   CheckEmailAuthNum={CheckEmailAuthNum}
   emailCheck={emailCheck}
   setEmailCheck={setEmailCheck}
   setInputNumActive={setInputNumActive} />
}

export default ChangePw