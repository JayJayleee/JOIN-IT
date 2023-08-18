import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import './T_signUpDetail.css'
import axios from 'axios';

interface propsType {
  defineId: string;
}


function TSignUpDetail({defineId}: propsType) {
  // 페이지 링크 이동을 위한 navigate
  const movePage = useNavigate();
  // 입력 값을 저장하는 state
  const [hospitalName, setHospitalName] = useState('');
  const [hospitalPhoneNumber, setHospitalPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [licensePhoto, setLicensePhoto] = useState<File | null>(null);
  const [previewImg, setPreview] = useState<string | null>("");
  // axios 요청 시 header 정보(formdata 형태로 전달하기 위해 context-type을 변형, type = formdata 부분도 추가)
  const headers = {
    "Access-Control-Allow-Origin" : "*",
    "Context-Type" : "multipart/form-data",
  }


  // 면허사진 넣는 함수
  const saveLicensePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      const file = event.target.files[0];
      if (file) {
        setLicensePhoto(file);
      } else {
        setLicensePhoto(null);
      }
    }
  };

  useEffect(() => {
    if (licensePhoto) {
      const reader = new FileReader();
      reader.readAsDataURL(licensePhoto);
      reader.onloadend = () => {
        setPreview(reader.result as string);
      }
    } else {
      setPreview(null);
    } 
  }, [licensePhoto]);




  /** 회원가입 완료 클릭 시 실행하는 함수
   * 1. 입력되지 않은 필수 입력 값이 있을 경우 : 필수 칸 입력 요청 메시지 출력
   * 2. 다 된 경우 : 저장한 입력 값들을 formdata에 저장해서 axios로 전달
   */
  const SignUpAllCheckHandler = async (event: React.MouseEvent<HTMLElement>) => {

    if (hospitalName === '') {
      alert('병원명을 입력해주세요')

    } else if (hospitalPhoneNumber === '') {
      alert('병원 전화번호를 입력해주세요')

    } else if (gender === '') {
      alert('성별을 선택해주세요')

    } else if (birthDate === '') {
      alert('생일을 입력해주세요')

    } else if (licensePhoto === null) {
      alert('면허 사진을 등록해주세요.')

    } else {

      try {

        const body = new FormData();

        body.append('hospitalName', hospitalName);
        body.append('hospitalNumber', hospitalPhoneNumber);
        body.append('gender', gender);
        body.append('birth', birthDate);
        const json = JSON.stringify(licensePhoto)
        const blob = new Blob([json], { type: 'application/json' });
        body.append('licensePhoto', blob);


        await axios.post(`/api/therapist/profile/${defineId}`, body, { headers })
        alert('관리자의 승인 이후, 계정 이용이 가능합니다.');
        movePage('/login');
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 400) {
            alert('중복된 입력 값이 존재합니다.\n다시 입력해주세요.');
            setHospitalName('');
            setBirthDate('');
            setHospitalPhoneNumber('');
            setGender('');
            setLicensePhoto(null);
          } else {
            alert('서버 에러로 인해 조금 후에 시도해주세요.')
          }
        }
      }
    }
  }
  


  return (
    <div className='col therapist-signupPage-second'>
    <div className='row therapist-signupPage-divide'>
      <div className='col therapist-signupPage-hospital'>
        <p>병원명 *</p>
        <label className='therapist-signupPage-hospital-input'>
          <input type="text" placeholder='서울병원 *' id="hospital" value={hospitalName} style={{fontSize:'17px'}} onChange={(e) => {setHospitalName(e.target.value)}}/>
        </label>
      </div>
      <div className='col therapist-signupPage-hospitalPhone'>
        <p>병원 전화번호 *</p>
        <label className='therapist-signupPage-hospitalPhone-input'>
          <input type="tel" placeholder='01012345678 *' id='hospitalphone' value={hospitalPhoneNumber} style={{fontSize:'17px'}} onChange={(el) => {setHospitalPhoneNumber(el.currentTarget.value.replace(/[^0-9]/g, ''))}}/>
        </label>
      </div>
    </div>
    <div className='row therapist-signupPage-divide'>
      <div className='col therapist-signupPage-gender'>
        <p>성별 *</p>
        <select name="gender" id="gender" className="therapist-signupPage-gender-select" value={gender} onChange={(e) => {setGender(e.target.value)}}>
          <option>PLEASE Select</option>
          <option value="M">남성</option>
          <option value="W">여성</option>
        </select>
      </div>
      <div className='col therapist-signupPage-birthDate'>
        <p>생년월일 *</p>
        <label className='therapist-signupPage-birthDate-input'>
          <input type="date" placeholder='YYYY-MM-DD *' id='birthdate' min='1900-01-01' max='2099-12-31' style={{fontSize:'17px'}} value={birthDate} onChange={(e) => {setBirthDate(e.target.value)}}/>
        </label>
      </div>
    </div>
    <div className='col therapist-signupPage-divide-license'>
      <p>면허 사진 등록 *</p>
      <div className='col therapist-signupPage-license'>
        <div className='therapist-signupPage-license-preview' onClick={() => {}}>
          {previewImg && <img src={previewImg as string} alt="preview-Img" style={{width: '100%', height: '100%'}}/>}
          {!previewImg && <p style={{fontSize:'17px', fontWeight:'bold'}}>No Image</p>}
        </div>
        <label className='therapist-signupPage-license-input' htmlFor="licensePhoto">
          <div className='therapist-signupPage-submit-button-license'>
            <div className='therapist-signupPage-submit-button-license-inner' />
            <p>면허 사진 넣기</p>
          </div>
        </label>
        <input type="file" accept="image/*" className="license-inputbtn" id="licensePhoto" onChange={saveLicensePhoto} />
      </div>
    </div>
    <p style={{width: '100%', textAlign: 'right', color:'#0F5953', fontWeight:'bold'}}>*표시는 필수 입력 칸입니다.</p>
    <div className='therapist-signupPage-submit-button2' onClick={SignUpAllCheckHandler}>
      <div className='therapist-signupPage-submit-button2-inner' />
      <p>회원 가입 완료</p>
    </div>
  </div>
  )
}

export default TSignUpDetail