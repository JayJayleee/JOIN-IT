import React, { useState } from 'react'
import './AccountCommon/FindId.css'
import SearchResultId from './AccountCommon/SearchResultId';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


interface propsType {
  tabNum: number;
  userName: string;
  setUserName: (x: string) => void;
  userEmail: string;
  setUserEmail: (x: string) => void;
  userInputNum: string;
  setUserInputNum: (x: string) => void;
  SendMessage: (e: React.MouseEvent<HTMLDivElement, MouseEvent>|React.KeyboardEvent<HTMLInputElement>) => void;
  CheckAllInputDataHandler: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  userId: string;
  inputNumActive: boolean;
  CheckEmailAuthNum: (e: React.MouseEvent<HTMLDivElement, MouseEvent>|React.KeyboardEvent) => void;
  emailCheck: boolean;
  setInputNumActive: (x:boolean) => void;
  setEmailCheck: (x:boolean) => void;
}


function TabContent(
  {tabNum, userName, setUserName, userEmail, setUserEmail, userInputNum,
     setUserInputNum, SendMessage, CheckAllInputDataHandler, userId,
      inputNumActive, CheckEmailAuthNum, emailCheck, setInputNumActive, setEmailCheck }: propsType) {

  const navigate = useNavigate();

  const firstTab = <div className='col findidpage'>
    <img src="/Assets/Images/Logo.png" alt="Logo" className='findidLogoImg' title='로그인 페이지로 이동하기' onClick={(e) => {navigate('/login')}} />
    <p style={{fontSize: '2.2rem', fontWeight: 'bold', marginBottom: '2rem'}}>아이디 찾기</p>
    <div className='col'>
      <div className='col confirm-name'>
        <p>이름 *</p>
        <label className='confirm-name-input'>
          <input type="text" placeholder='조인잇 *' id="nameInput" value={userName} style={{fontSize:'1.7rem'}} onChange={(e) => {setInputNumActive(false); setUserName(e.target.value)}}/>
        </label>
      </div>
      <div className='col confirm-email'>
        <p>E-mail *</p>
        <label className='confirm-email-input'>
          <input type="text" placeholder='Example123@example.com *' id="emailInput" value={userEmail} style={{fontSize:'1.7rem'}} onKeyDown={inputNumActive? undefined : (e) => {if (e.key === 'Enter') {SendMessage(e);}}} onChange={(e) => {setInputNumActive(false); setUserEmail(e.target.value)}}/>
          <div className='confirm-email-check' style={{display: inputNumActive? 'none' : '' }} onClick={(e) => {SendMessage(e)}}>
            <p>이메일 인증</p>
          </div>
        </label>
      </div>
      <div className='col confirm-authNumInput' style={{display: !inputNumActive? 'none' : 'block'}}>
        <p>인증번호 입력 *</p>
        <label className='confirm-authNumInput-input'>
          <input type="text" id="AuthenEmailNum" value={userInputNum} onKeyDown={(e) => {if (e.key === 'Enter') {CheckEmailAuthNum(e);}}} onChange={(e) => {setEmailCheck(false); setUserInputNum(e.target.value)}}/>
          <div className='confirm-authNumInput-check' onClick={CheckEmailAuthNum}>
            <p>인증하기</p>
          </div>
        </label>
      </div>
      <div className={`confirm-submit-button ${(emailCheck && inputNumActive)? '' : 'grey'}`} onClick={(emailCheck && inputNumActive)? CheckAllInputDataHandler: undefined} style={{cursor: (emailCheck && inputNumActive)? 'pointer' : 'default'}}>
        <div className={`confirm-submit-button-inner ${(emailCheck && inputNumActive)? '' : 'grey'}`} />
        <p>아이디 확인하기</p>
      </div>
    </div>
  </div>
  
  return [ firstTab, <SearchResultId userName={userName} userId={userId}/> ][tabNum]

}



function FindId() {
  // axios header 정보
  const headers = {
    "Access-Control-Allow-Origin" : "*",
    "Context-Type" : "application/json",
  }
  // 컴포넌트 변경을 위한 state
  const [tabNum, setTabNum] = useState(0);
  // 결과로 받은 사용자의 id를 저장하기 위한 state
  const [userId, setUserId] = useState('');
  // 입력 값들을 저장하는 state
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userInputNum, setUserInputNum] = useState('');
  // 인증 번호 입력창 활성화 여부 저장하는 state
  const [inputNumActive, setInputNumActive] = useState(false);
  // 인증 번호 통과 여부를 저장하는 state
  const [emailCheck, setEmailCheck] = useState(false);
  // 입력창 id로 불러오기
  // const nameInputTag = document.getElementById('nameInput')! as HTMLInputElement;
  // const emailInputTag = document.getElementById('emailInput')! as HTMLInputElement;


  /** 이메일 인증 클릭 혹은 이메일 입력 창에서 엔터 키 입력 시 실행하는 함수
   * 1. 이름과 이메일이 db에 존재하며, 매치하는지를 확인
   * 2. 확인이 되면 이메일로 번호를 발송 후, 알람으로 발송 완료 메시지 출력
   * 3. 인증 번호 입력 창 활성화
   */
  const SendMessage = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>|React.KeyboardEvent) => {

    if (userName === "") {
      alert('이름을 입력해주세요')

    } else if (userEmail === "") {
      alert('이메일을 입력해주세요')

    } else {

      try {
        await axios.post('/api/user/create/email/cert/code', { name: userName, loginId : null, email: userEmail } ,{ headers })
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
        if (axios.isAxiosError(err)) {
          alert('인증 번호가 일치하지 않습니다.\n인증 번호를 다시 입력해주세요.');
          setUserInputNum('');
          setEmailCheck(false);
        } else {
          alert('서버 에러로 인하여 조금 후에 시도해주세요.')
        }
      }
    }
  }




  /** 아이디 확인하기 클릭 시 실행하는 함수
   * 1. 위에서 체크한 내용으로 해당 사용자의 아이디를 알려주는 함수
   */
  const CheckAllInputDataHandler = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
     try {
      const IdResult = await axios.post('/api/user/cert/id', { name: userName, email: userEmail, emailCheck }, { headers });
      setUserId(IdResult.data);
      setTabNum(1);
     } catch (err) {
      alert('아이디 찾기에 실패하였습니다.')
     }
  }

  return <TabContent
   tabNum={tabNum} 
   userName={userName} 
   userEmail={userEmail} 
   userInputNum={userInputNum} 
   SendMessage={SendMessage} 
   CheckAllInputDataHandler={CheckAllInputDataHandler} 
   setUserName={setUserName} 
   setUserEmail={setUserEmail} 
   setUserInputNum={setUserInputNum}
   userId={userId}
   inputNumActive={inputNumActive}
   CheckEmailAuthNum={CheckEmailAuthNum}
   emailCheck={emailCheck}
   setInputNumActive={setInputNumActive}
   setEmailCheck={setEmailCheck} />
}

export default FindId