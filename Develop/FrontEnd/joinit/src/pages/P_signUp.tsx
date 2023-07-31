import React, {useState} from 'react';
import P_signUpDetail from './P_signUp/P_signUpDetail';
import './P_signUp/P_signUp.css'


function PatientContent(props: any) {

  const [nameInput, setName] = useState('');
  const [idInput, setid] = useState('');
  const [EmailInput, setEmail] = useState('');
  const [phoneNumberInput, setPhoneNumber] = useState('');
  const [firstPw, setPassword] = useState('');
  const [secondPw, setCheckPassword] = useState('');

  const [privatechecked, setPrivateCheck] = useState(false);
  const [essentialchecked, setEssentialCheck] = useState(false);
  const [emailchecked, setEmailCheck] = useState(false);
  const [smschecked, setSmsCheck] = useState(false);


  let comment = ""
  
  if (firstPw.length !== 0) {
    if (firstPw === secondPw) {
      comment = "✔ 비밀번호가 일치합니다."
    } else {
      comment = "비밀번호가 일치하지 않습니다."
    }
  }

  const patientInputCheckHandler = () => {
    if (nameInput === '' || idInput === '' || EmailInput === '' || phoneNumberInput === '' || firstPw === '' || secondPw === '') {
      alert('필수 입력 칸은 전부 입력해주세요.')
      setName('');
      setid('');
      setEmail('');
      setPhoneNumber('');
      setPassword('');
      setCheckPassword('');
      return 
    } else if (!privatechecked) {
      alert('개인 정보 제공에 동의해주세요')
      return
    } else if (!essentialchecked) {
      alert('필수 약관에 동의해주세요')
      return
    } else {
      props.changeSignupPage()
    }
  }
  

  const firstSignup = <div className='col patient-signupPage-first'>
    <p style={{fontSize: '22px', fontWeight: 'bold', marginBottom: '20px'}}>환자 회원가입</p>
    <div className='col patient-signupPage-name'>
      <p>Name *</p>
      <label className='patient-signupPage-name-input'>
        <input type="text" placeholder='Full Name *' style={{fontSize:'17px'}} onChange={(e) => {setName(e.target.value)}}/>
      </label>
    </div>
    <div className='col patient-signupPage-id'>
      <p>ID *</p>
      <label className='patient-signupPage-id-input'>
        <input type="text" placeholder='Example123 *' style={{fontSize:'17px'}} onChange={(e) => {setid(e.target.value)}}/>
        <div className='patient-signupPage-id-check' onClick={() => {alert('id 중복검사 클릭!')}}>
          <p>중복 검사</p>
        </div>
      </label>
    </div>
    <div className='col patient-signupPage-email'>
      <p>Email *</p>
      <label className='patient-signupPage-email-input'>
        <input type="email" placeholder='example123@example.com *' style={{fontSize:'17px'}} onChange={(e) => {setEmail(e.target.value)}}/>
      </label>
    </div>
    <div className='col patient-signupPage-phone'>
      <p>Phone Number *</p>
      <label className='patient-signupPage-phone-input'>
        <input type="tel" placeholder='010 - 1234 - 5678 *' style={{fontSize:'17px'}} onChange={(e) => {setPhoneNumber(e.target.value)}}/>
        <div className='patient-signupPage-phone-check' onClick={() => {alert('phone 중복검사 클릭!')}}>
          <p>중복 검사</p>
        </div>
      </label>
    </div>
    <div className='col patient-signupPage-pw'>
      <p>Password *</p>
      <label className='patient-signupPage-pw-input'>
        <input type="password" onChange={(e) => {setPassword(e.target.value)}}/>
      </label>
    </div>
    <div className='col patient-signupPage-pw'>
      <p>Password Agian *</p>
      <label className={`patient-signupPage-pw-input ${firstPw === secondPw ? 'green' : 'red'}`}>
        <input type="password" onChange={(e) => {setCheckPassword(e.target.value)}}/>
      </label>
      <p style={{color: firstPw === secondPw ? 'green' : 'red', fontSize: '15px', marginTop: '10px'}}>{comment}</p>
    </div>
    <div className='col patient-signupPage-choosebtn'>
      <div className='row checklist-first'>
        <label className='checkboxInner'>
          <input type="checkbox" checked={privatechecked} name='privateOk' id='privateOk' onChange={() => {setPrivateCheck(!privatechecked)}}/>개인 정보 제공에 동의합니다.
        </label>
        <label className='checkboxInner'>
          <input type="checkbox" checked={smschecked} name='smsOk' id='smsOk' onChange={() => {setSmsCheck(!smschecked)}}/>SMS 수신여부
        </label>
      </div>
      <div className='row checklist-second'>
        <label className='checkboxInner'>
          <input type="checkbox" checked={essentialchecked} name='essentialterm' id='essentialterm' onChange={() => {setEssentialCheck(!essentialchecked)}}/>필수 약관에 동의합니다.
        </label>
        <label className='checkboxInner'>
          <input type="checkbox" checked={emailchecked} name="emailok" id="emailok" onChange={() => {setEmailCheck(!emailchecked)}}/>이메일 수신여부
        </label>
      </div>
    </div>
    <p style={{width: '100%', textAlign: 'right', color:'#0F5953', fontWeight:'bold'}}>*표시는 필수 입력 칸입니다.</p>
    <div className='patient-signupPage-submit-button' onClick={patientInputCheckHandler}>
      <div className='patient-signupPage-submit-button-inner' />
      <p>회원 가입 완료</p>
    </div>
  </div>

  return [ firstSignup, <P_signUpDetail /> ][props.nowPageState] 

}

function P_signUp() {

  const [nowPatientSignup, changeSignupPage] = useState(0);

  const changeSignupPageHandler = () => {
    changeSignupPage(1);
  }

  return (
    <div className='col patient-signupPage'>
      <img src="/Assets/Images/Logo.png" alt="Logo" className='patientLogoImg' />
      <PatientContent nowPageState={nowPatientSignup} changeSignupPage={changeSignupPageHandler} />
    </div>
  )
}

export default P_signUp;