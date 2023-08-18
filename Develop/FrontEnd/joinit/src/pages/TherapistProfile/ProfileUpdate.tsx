import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './ProfileUpdate.css'
import axios from 'axios';


interface propType {
  userInfo: profileObject;
  setPagenum: (x: number) => void;
}

type profileObject = {
  [key: string] : string
}

function ProfileUpdate({userInfo, setPagenum}: propType) {

  const headers = {
    'context-Type' : 'apllication/json',
    'Authorization' : `Bearer ${localStorage.getItem('access-token')}`,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true'
  }

  const navigate = useNavigate();

  const [phone, setPhone] = useState('')
  const [hospitalPhone, setHospitalPhone] = useState('')
  const [birthday, setBirthday] = useState('')
  const [emailCheck, setEmailCheck] = useState(false);

  const [newContent, setNewContent] = useState({
    'name': userInfo.name,
    'introduce' : userInfo.introduce,
    'phone': userInfo.phone,
    'email': userInfo.email,
    'hospitalNumber': userInfo.hospitalNumber,
    'hospitalName': userInfo.hospitalName,
  })


  useEffect(()=> {
    if (userInfo.name !== undefined) {
      const hp = userInfo.hospitalNumber.length === 9? `${userInfo.hospitalNumber.substring(0,2)} - ${userInfo.hospitalNumber.substring(2,5)} - ${userInfo.hospitalNumber.substring(5,9)}` :
       (userInfo.hospitalNumber.length === 10? (userInfo.hospitalNumber.substring(0,2) === "02"?  `${userInfo.hospitalNumber.substring(0,2)} - ${userInfo.hospitalNumber.substring(2,6)} - ${userInfo.hospitalNumber.substring(6,10)}` : `${userInfo.hospitalNumber.substring(0,3)} - ${userInfo.hospitalNumber.substring(3,6)} - ${userInfo.hospitalNumber.substring(6,10)}`) :
        `${userInfo.hospitalNumber.substring(0,3)} - ${userInfo.hospitalNumber.substring(3,7)} - ${userInfo.hospitalNumber.substring(7,11)}`)
      const b = userInfo.birth.substring(0,10).replaceAll('-', '/')
      const p = `${userInfo.phone.substring(0,3)} - ${userInfo.phone.substring(3,7)} - ${userInfo.phone.substring(7,11)}`

      setHospitalPhone(hp)
      setBirthday(b)
      setPhone(p)
    } 

  }, [userInfo])




  // 이메일 인증 검사

  const SendMessage = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>|React.KeyboardEvent) => {
    if (newContent.email === userInfo.email) {
      alert('기존에 등록된 이메일은 중복검사하지 않습니다.')
    } else if (newContent.email === '') {
      alert('이메일을 입력해주세요')
    } else {
      try {
        await axios.post('/api/user/duplicate/email', { email: newContent.email } ,{ headers })
        alert('해당 이메일로 인증 번호가 전송되었습니다.')
        setEmailCheck(true);
  
      } catch (err) {
        console.log(err)
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 400) {
            alert('이미 등록된 이메일입니다.')
            setEmailCheck(false);
            setNewContent({...newContent, email: userInfo.email})
          } else {
            alert('서버 오류로 인하여 조금 후에 시도해주세요.')
          }
          return false
        } 
      }
    }
  }


  // 전화번호 인증 검사
  const [visible, setVisible] = useState(false);
  const [phoneAuthenticationNum, setPhoneAuthenticationNum] = useState('');
  const [AuthNumOk, setAuthNumOk] = useState("");

  const CheckAuthenInputDiv = <div className='row therapist-profile-content-line'>
    <p style={{fontWeight:"bold", fontSize: '2.4rem', paddingLeft: '4rem'}}>휴대폰 인증번호</p>
    <label className='therapist-tprofile-input-content-box'>
      <input type="text" id="pauthenInput"  value={phoneAuthenticationNum} className={`therapist-tprofile-update-content ${AuthNumOk === 'T'? 'green' : (AuthNumOk === "F"? "red": "")}`} style={{fontSize:'1.7rem'}} onChange={(el) => {setPhoneAuthenticationNum(el.currentTarget.value.replace(/[^0-9]/g, ''))}}/>
      <div className='therapist-tprofile-input-check' onClick={(e) => {CheckAuthenticationNumber(e)}}>
        <p>확인하기</p>
      </div>
    </label>
  </div>


  const phoneCheckHandler = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (newContent.phone === '') {
      alert('전화번호를 입력해주세요.')

    } else if (newContent.phone.length !== 11) {
      alert('올바르지 않은 전화번호입니다.')

    } else {
      try {
        await axios.post('/api/sms/create/phone/cert/code', { "phone" : newContent.phone }, { headers : headers })
        alert('인증번호를 발송했습니다.')
        setVisible(true);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 400) {
            alert('다른 전화번호를 입력해주세요');
            setNewContent({...newContent, phone: ''});
          } else {
            alert('서버 에러 발생으로 인해 조금 후 진행해주세요')
          }
        }
      }
    }
  }

  const CheckAuthenticationNumber = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (phoneAuthenticationNum === '') {
      alert('인증번호를 입력해주세요')
    } else {
      try {
        const CheckAuthNumData = await axios.post('/api/user/check/phone', { phone : newContent.phone, phoneCertCode : phoneAuthenticationNum }, { headers : headers })
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

  const ChangeTherapistProfile = async () => {
    if (newContent.phone !== userInfo.phone && AuthNumOk !== "T") {
      alert("전화번호 변경을 위해서는 인증이 필요합니다.")
      setNewContent({...newContent, phone: userInfo.phone});
    } else if (newContent.email !== userInfo.email && emailCheck !== true) {
      alert("이메일 변경을 위해서는 중복 검사가 필요합니다.")
      setNewContent({...newContent, email: userInfo.email});
    } else {
      try {
        await axios.put(`/api/therapist/profile/${localStorage.getItem('userPk')}`, {body: newContent}, {headers})
        window.location.reload()
      } catch(err) {
        console.log(err)
      }
    }
  }



  return (
    <div className='col therapist-profilebox-update'>
      <div className='col therapist-tprofile-header'>
        <div className='col therapist-tprofile-header-profileImg'>
          <img src="/Assets/Images/Therapist_default_image.png" alt="profile" className='therapist-profile-image'/>
          <p style={{fontWeight:"bold", fontSize: '2.5rem', marginTop: '1rem'}}>{userInfo.name}</p>
          <input type="text" placeholder={userInfo.introduce} value={newContent.introduce !== null? newContent.introduce : "" } onChange={e => setNewContent({...newContent, introduce: e.target.value})} className='tprofile-update-introduce'/>
        </div>
        <div className='therapist-password-change-box'>
          <div className='therapist-password-delete-btn' onClick={() => {navigate("/UserWithdrawal")}}>
            <p>회원 탈퇴</p>
          </div>
        </div>
      </div>
      <div className='col therapist-tprofile-content'>
        <div className='row therapist-tprofile-content-header'> 
          <p>치료사 정보 수정</p>
        </div>
        <div className='col therapist-tprofile-content-body'>
          <div className='row therapist-profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.4rem', paddingLeft: '4rem'}}>이름</p>
            <div className="therapist-tprofile-real-content-box">
              <p>{userInfo.name}</p>
            </div>
          </div>
          <div className='row therapist-profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.4rem', paddingLeft: '4rem'}}>성별</p>
            <div className="therapist-tprofile-real-content-box">
              <p>{userInfo.gender === "M"? "남자" : "여자"}</p>
            </div>
          </div>
          <div className='row therapist-profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.4rem', paddingLeft: '4rem'}}>생년월일</p>
            <div className="therapist-tprofile-real-content-box">
              <p>{birthday}</p>
            </div>
          </div>
          <div className='row therapist-profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.4rem', paddingLeft: '4rem'}}>아이디</p>
            <div className="therapist-tprofile-real-content-box">
              <p>{userInfo.loginId}</p>
            </div>
          </div>
          <div className='row therapist-profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.4rem', paddingLeft: '4rem'}}>전화번호</p>
            <label className='therapist-tprofile-input-content-box'>
              <input type="tel" placeholder={phone} value={newContent.phone !== null? newContent.phone : "" } onChange={(el) => setNewContent({...newContent, phone: el.currentTarget.value.replace(/[^0-9]/g, '')})} className='therapist-tprofile-update-content'/>
              <div className='therapist-tprofile-input-check' style={{display: visible? "none" : ""}} onClick={(e) => {phoneCheckHandler(e)}}>
                <p>번호 인증</p>
              </div>
            </label>
          </div>
          {visible? CheckAuthenInputDiv : <></>}
          <div className='row therapist-profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.4rem', paddingLeft: '4rem'}}>소속 병원</p>
            <div className='therapist-tprofile-input-content-box'>
              <input type="text" placeholder={userInfo.hospitalName} value={newContent.hospitalName !== null? newContent.hospitalName : "" } onChange={e => setNewContent({...newContent, hospitalName: e.target.value})} className='therapist-tprofile-update-content'/>
            </div>
          </div>
          <div className='row therapist-profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.4rem', paddingLeft: '4rem'}}>소속 병원 전화번호</p>
            <div className='therapist-tprofile-input-content-box'>
              <input type="tel" placeholder={hospitalPhone} value={newContent.hospitalNumber !== null? newContent.hospitalNumber : "" } onChange={(el) => setNewContent({...newContent, hospitalNumber: el.currentTarget.value.replace(/[^0-9]/g, '')})} className='therapist-tprofile-update-content'/>
            </div>
          </div>
          <div className='row therapist-profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.4rem', paddingLeft: '4rem'}}>이메일</p>
            <label className='therapist-tprofile-input-content-box'>
              <input type="tel" placeholder={userInfo.email} value={newContent.email !== null? newContent.email : "" } onChange={(el) => setNewContent({...newContent, email: el.target.value})} className='therapist-tprofile-update-content'/>
              <div className='therapist-tprofile-input-check' onClick={(e) => {SendMessage(e)}}>
                <p>중복검사</p>
              </div>
            </label>
          </div>
        </div>
      </div>
      <div className='col therapist-tprofile-footer'>
        <div className='col therapist-tprofile-submitBtn' onClick={() => {ChangeTherapistProfile()}}>
          <p>정보 수정 완료</p>
        </div>
      </div>
    </div>
  )
}

export default ProfileUpdate