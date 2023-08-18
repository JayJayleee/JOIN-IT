import React, {useState} from 'react';
import PSignUpDetail from './P_signUp/PSignUpDetail';
import axios from 'axios';
import './P_signUp/P_signUp.css'
import { useNavigate } from 'react-router-dom';


function PatientContent(props: any) {
  // 회원가입 입력칸 state 관리
  const [nameInput, setName] = useState('');
  const [idInput, setid] = useState("");
  const [EmailInput, setEmail] = useState('');
  const [phoneNumberInput, setPhoneNumber] = useState('');
  const [firstPw, setPassword] = useState('');
  const [secondPw, setCheckPassword] = useState('');
  // 회원가입 아래 선택창 state 관리
  const [privatechecked, setPrivateCheck] = useState(false);
  const [essentialchecked, setEssentialCheck] = useState(false);
  const [emailchecked, setEmailCheck] = useState(false);
  const [smschecked, setSmsCheck] = useState(false);
  // 회원가입 검사 및 가입 완료 버튼 클릭 시 전달할 header
  const headers = {
    "Access-Control-Allow-Origin" : "*",
    "Context-Type" : "application/json",
    'Access-Control-Allow-Credentials': 'true'
  }
  // 입력창 요소


  // 첫번째 비밀번호 입력 시 출력 문구
  let comment = ""
  
  if (firstPw.length !== 0) {
    if (firstPw === secondPw) {
      comment = "✔ 비밀번호가 일치합니다."
    } else {
      comment = "비밀번호가 일치하지 않습니다."
    }
  }


  // 아이디 중복 확인 검사
  const [checkPass, setCheckPass] = useState('');

  const idCheckHandler = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>|React.KeyboardEvent) => {
    if (idInput === '') {
      alert('아이디를 입력해주세요')
      
    } else {

      try {
        await axios.post('/api/user/duplicate', { loginId : idInput }, { headers : headers })
        alert('사용 가능한 아이디입니다.')
        setCheckPass('P');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 400) {
            alert('중복된 아이디입니다.\n아이디를 다시 입력해주세요.')
            setid('')
            setCheckPass('X');
          } else {
            alert('서버 에러로 인하여 조금 후에 시도해주세요.')
          }
        }
      }
    }
  }

    // 첫번째 비밀번호 입력 시 길이에 따라 문구 출력
    let firstPwComment = ""
    if (firstPw.length < 8) {
      firstPwComment = "최소 8자리 이상이여야 합니다."
    } else {
      firstPwComment = ""
    }
  
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


  // 전화번호 인증 검사
  const [visible, setVisible] = useState(false);
  const [phoneAuthenticationNum, setPhoneAuthenticationNum] = useState('');
  const [AuthNumOk, setAuthNumOk] = useState("");

  const CheckAuthenInputDiv = <div className='col patient-signupPage-authenticationNum'>
    <p>인증번호 *</p>
    <label className='patient-signupPage-authenticationNum-input'>
      <input type="text" id="pauthenInput" value={phoneAuthenticationNum} className={`authenti-Input ${AuthNumOk === 'T'? 'green' : (AuthNumOk === "F"? "red": "")}`} style={{fontSize:'1.7rem'}} onChange={(el) => {setAuthNumOk(""); setPhoneAuthenticationNum(el.currentTarget.value.replace(/[^0-9]/g, ''))}}/>
      <div className='patient-signupPage-authenticationNum-check' onClick={(e) => {CheckAuthenticationNumber(e)}}>
        <p>확인하기</p>
      </div>
    </label>
  </div>

  // const regex = /[^0-9]/g;

  const phoneCheckHandler = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (phoneNumberInput === '') {
      alert('전화번호를 입력해주세요.')

    } else if (phoneNumberInput.length !== 11) {
      alert('올바르지 않은 전화번호입니다.')
      setPhoneNumber('');

    } else {
      try {
        await axios.post('/api/sms/create/phone/cert/code', { "phone" : phoneNumberInput }, { headers : headers })
        alert('인증번호를 발송했습니다.')
        setVisible(true);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 400) {
            alert('다른 전화번호를 입력해주세요');
            setPhoneNumber('');
          } else {
            alert('서버 에러 발생으로 인해 조금 후 진행해주세요')
          }
        }
      }
    }
  }


  // 인증번호 확인 함수
  const CheckAuthenticationNumber = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (phoneAuthenticationNum === '') {
      alert('인증번호를 입력해주세요')
    } else {
      try {
        const CheckAuthNumData = await axios.post('/api/user/check/phone', { phone : phoneNumberInput, phoneCertCode : phoneAuthenticationNum }, { headers : headers })
        alert(CheckAuthNumData.data)
        setAuthNumOk("T")
      } catch (err) {
        if (axios.isAxiosError(err)) {
          alert(err.response?.data)
          setAuthNumOk("F")
          setPhoneAuthenticationNum('')
        }
      }
    }
  }

  const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;


  /**회원가입 완료 버튼 클릭 시 실행하는 함수
   * 1. 필수 입력 칸 중 하나라도 비어있는 경우 : 필수 칸 입력 요청 메시지 출력
   * 1-1. 이메일 유효성 검사에서 통과하지 못한 경우 : 이메일 재 입력 요청
   * 2. 개인 정보 제공 체크를 안한 경우 : 개인 정보 제공 체크 요청 메시지 출력
   * 3. 필수 약관 동의 체크를 안한 경우 : 필수 약관 동의 체크 요청 메시지 출력
   * 4. 아이디 중복 확인을 하지 않은 경우 : 아이디 중복 확인 요청 메시지 출력
   * 5. 전화 번호 인증을 하지 않은 경우 : 전화번호 인증 요청 메시지 출력
   * 6. 다 통과한 경우 : 입력 값들을 object에 담아서 axios로 전달, 성공 시 response로 온 데이터를 props로 전달
   *  */ 
  const patientInputCheckHandler = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (nameInput === '') {
      alert('이름을 입력해주세요.')

    } else if (idInput === '') {
      alert('아이디를 입력해주세요.')

    } else if (phoneNumberInput === '') {
      alert('전화번호를 입력해주세요.')

    } else if (EmailInput === '') {
      alert('이메일을 입력해주세요.')
    
    } else if (!emailRegEx.test(EmailInput)) {
      alert('유효하지 않은 이메일 형식입니다.\n이메일을 다시 입력해주세요.')
      setEmail('');
    
    } else if (firstPw === '') {
      alert('비밀번호를 입력해주세요.')

    } else if (secondPw === '') {
      alert('비밀번호를 재입력해주세요.')

    } else if (!privatechecked) { // 개인 정보 제공 체크를 안한 경우
      alert('개인 정보 제공에 동의해주세요')
      return false

    } else if (!essentialchecked) { // 필수 약관 동의 체크를 안한 경우
      alert('필수 약관에 동의해주세요')
      return false

    } else if ( checkPass === "" || checkPass === "X") { // 아이디 중복 확인을 하지 않은 경우 
      alert('아이디 중복 확인이 필요합니다.')
      return false

    } else if ( AuthNumOk === "" || AuthNumOk === "F" ) { // 전화 번호 인증을 하지 않은 경우 
      alert('전화번호 인증이 필요합니다.')
      return false

    } else {

      const body = {
        "name": nameInput,
        "loginId": idInput,
        "phone": phoneNumberInput,
        "email": EmailInput,
        "password": firstPw,
        "userTypeCode": "P",
        "emailAgree": "F",
        "smsAgree": "F"
      }
      if (emailchecked) {
        body['emailAgree']= "T"
      }

      if (smschecked) {
        body['smsAgree']= "T"
      }


      try {

        const ResultData = await axios.post('/api/user', body, { headers : headers })
        props.changeSignupPage(ResultData.data)
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 400) {
            alert('이미 가입한 이력이 있는 계정입니다.\n다시 입력해주세요.')
            setName('');
            setid('');
            setEmail('');
            setPhoneNumber('');            
            setPassword('');
            setCheckPassword('');
            setPrivateCheck(false);
            setEssentialCheck(false);
            setEmailCheck(false);
            setSmsCheck(false);
            setProgressValue(0);
            setVisible(false);
            setPhoneAuthenticationNum('');
            setAuthNumOk("");
            setCheckPass('');
          } else {
            alert('서버 에러로 인하여 조금 후에 시도해주세요.')
          }
        }
      }
    }
  }
  

  const firstSignup = <div className='col patient-signupPage-first'>
    <div className='col patient-signupPage-name'>
      <p>Name *</p>
      <label className='patient-signupPage-name-input'>
        <input type="text" id="pnameInput" placeholder='Full Name *'value={nameInput} style={{fontSize:'1.7rem'}} onChange={(e) => {setName(e.target.value)}}/>
      </label>
    </div>
    <div className='col patient-signupPage-id'>
      <p>ID *</p>
      <label className='patient-signupPage-id-input'>
        <input type="text" id="pidInput" placeholder='Example123 *' className={`idInputOln ${checkPass === 'P' ? 'green' : (checkPass === 'X' ? 'red' : '')}`} value={idInput} style={{fontSize:'1.7rem'}} onChange={(e) => {setCheckPass(''); setid(e.currentTarget.value.replace(/[^0-9a-zA-Z]/g, ''))}}/>
        <div className='patient-signupPage-id-check' onClick={(e) => {idCheckHandler(e)}}>
          <p>중복 검사</p>
        </div>
      </label>
    </div>
    <div className='col patient-signupPage-email'>
      <p>Email *</p>
      <label className='patient-signupPage-email-input'>
        <input type="email" id="pemailInput" placeholder='example123@example.com *' value={EmailInput} style={{fontSize:'1.7rem'}} onChange={(e) => {setEmail(e.target.value)}}/>
      </label>
    </div>
    <div className='col patient-signupPage-phone'>
      <p>Phone Number *</p>
      <label className='patient-signupPage-phone-input'>
        <input type="tel" id="pphoneNumberInput" placeholder='01012345678 *'value={phoneNumberInput} style={{fontSize:'1.7rem'}} onChange={(el) => {setPhoneNumber(el.currentTarget.value.replace(/[^0-9]/g, ''))}}/>
        <div className='patient-signupPage-phone-check' onClick={(e) => {phoneCheckHandler(e)}}>
          <p>번호 인증</p>
        </div>
      </label>
    </div>
    {visible? CheckAuthenInputDiv : <></>}
    <div className='col patient-signupPage-pw'>
      <p>Password *</p>
      <label className={`patient-signupPage-pw-input ${firstPw.length < 8? 'red': 'green'}`}>
        <input type="password" id="ppwInput" value={firstPw} onChange={(e) => {setPassword(e.target.value)}} onKeyUp={(e: any) => {CheckNewPassword(e.target.value)}}/>
      </label>
      <div className='row patient-signupPage-firstPw-comment'>
        <p style={{color: firstPw.length < 8? 'red' : ''}}>{firstPwComment}</p>
        <div className='row'>
          <p>비밀번호 안전도</p>
          <progress max="4" value={progressValue} id="meter"></progress>
        </div>
      </div>
    </div>
    <div className='col patient-signupPage-pw'>
      <p>Password Agian *</p>
      <label className={`patient-signupPage-pw-input ${firstPw === secondPw ? 'green' : 'red'}`}>
        <input type="password" id="ppwAgianInput" disabled={firstPw.length < 8? true: false} value={secondPw} onChange={(e) => {setCheckPassword(e.target.value)}}/>
      </label>
      <p style={{color: firstPw === secondPw ? 'green' : 'red', fontSize: '1.5rem', marginTop: '1rem'}}>{comment}</p>
    </div>
    <div className='col patient-signupPage-choosebtn'>
      <div className='row checklist-first'>
        <label className='checkboxInner'>
          <input type="checkbox" checked={privatechecked} name='privateOk' id='privateOk' onChange={() => {setPrivateCheck(!privatechecked)}}/>개인 정보 제공에 동의합니다.*
        </label>
        <label className='checkboxInner'>
          <input type="checkbox" checked={smschecked} name='smsOk' id='smsOk' onChange={() => {setSmsCheck(!smschecked)}}/>SMS 수신여부
        </label>
      </div>
      <div className='row checklist-second'>
        <label className='checkboxInner'>
          <input type="checkbox" checked={essentialchecked} name='essentialterm' id='essentialterm' onChange={() => {setEssentialCheck(!essentialchecked)}}/>필수 약관에 동의합니다.*
        </label>
        <label className='checkboxInner'>
          <input type="checkbox" checked={emailchecked} name="emailok" id="emailok" onChange={() => {setEmailCheck(!emailchecked)}}/>이메일 수신여부
        </label>
      </div>
    </div>
    <p style={{width: '57.6rem', textAlign: 'right', color:'#0F5953', fontWeight:'bold', fontSize: '1.4rem'}}>*표시는 필수 입력 칸입니다.</p>
    <div className='patient-signupPage-submit-button' onClick={(e) => patientInputCheckHandler(e)}>
      <div className='patient-signupPage-submit-button-inner' />
      <p>회원 가입 완료</p>
    </div>
  </div>

  return [ firstSignup, <PSignUpDetail name={nameInput} defineId={props.patientDefineId}/> ][props.nowPageState] 

}

function PSignUp() {

  const movePage = useNavigate();

  // 회원 가입 완료 시 컴포넌트 변경을 위한 state 및 함수
  const [nowPatientSignup, changeSignupPage] = useState(0);
  
  // 컴포넌트로 환자 id를 전달하기 위한 state 생성
  const [patientDefineId, setPatientDefineId] = useState("");

  const changeSignupPageHandler = (x: string) => {
    changeSignupPage(1);
    setPatientDefineId(x);
  }

  return (
    <div className='col patient-signupPage'>
      <img src="/Assets/Images/Logo.png" alt="Logo" className='patientLogoImg' title="로그인 페이지로 이동" onClick={() => {movePage('/login')}} />
      <PatientContent nowPageState={nowPatientSignup} changeSignupPage={changeSignupPageHandler} patientDefineId={patientDefineId} />
    </div>
  )
}

export default PSignUp;