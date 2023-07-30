import React, {useState} from 'react'
import './T_signUpDetail.css'

function T_signUpDetail() {

  const [hospitalName, setHospitalName] = useState('');
  const [hospitalPhoneNumber, setHospitalPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [licensePhoto, setLicensePhoto] = useState('');



  return (
    <div className='col therapist-signupPage-second'>
    <p style={{fontSize: '22px', fontWeight: 'bold', marginBottom: '20px'}}>치료사 회원가입</p>
    <div className='row'>
      <div className='col therapist-signupPage-hospital'>
        <p>병원명 *</p>
        <label className='therapist-signupPage-hospital-input'>
          <input type="text" placeholder='서울병원 *' style={{fontSize:'17px'}} onChange={(e) => {setHospitalName(e.target.value)}}/>
        </label>
      </div>
      <div className='col therapist-signupPage-hospitalPhone'>
        <p>병원 전화번호 *</p>
        <label className='therapist-signupPage-hospitalPhone-input'>
          <input type="tel" placeholder='010 - 1234 - 5678 *' style={{fontSize:'17px'}} onChange={(e) => {setHospitalPhoneNumber(e.target.value)}}/>
        </label>
      </div>
    </div>
    <div className='row'>
      <div className='col therapist-signupPage-gender'>
        <p>성별 *</p>
        <select name="gender" id="gender" onChange={(e) => {setGender(e.target.value)}}>
          <option>PLEASE Select</option>
          <option value="male">남성</option>
          <option value="female">여성</option>
        </select>
      </div>
      <div className='col therapist-signupPage-birthDate'>
        <p>생년월일 *</p>
        <label className='therapist-signupPage-birthDate-input'>
          <input type="dateate" placeholder='YYYY-MM-DD *' style={{fontSize:'17px'}} onChange={(e) => {setBirthDate(e.target.value)}}/>
        </label>
      </div>
    </div>
    <div className='col therapist-signupPage-license'>
      <p>면허 사진 등록*</p>
      <label className='therapist-signupPage-license-input'>
        <input type="file" accept="image/png, image/jpeg" onChange={(e) => {setLicensePhoto(e.target.value)}} />
      </label>
    </div>
    <p style={{width: '100%', textAlign: 'right', color:'#0F5953', fontWeight:'bold'}}>*표시는 필수 입력 칸입니다.</p>
    <div className='therapist-signupPage-submit-button'>
      <div className='therapist-signupPage-submit-button-inner' />
      <p>회원 가입 완료</p>
    </div>
  </div>
  )
}

export default T_signUpDetail