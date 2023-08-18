import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './ProfileUpdate.css'
import axios from 'axios';


interface propType {
  userInfo: profileObject;
  setPagenum: (x: number) => void;
}

type stringObj = {
  [key: string] : string;
}

type profileObject = {
  birth: string;
  email: string;
  etc: string;
  gender: string;
  height: number;
  loginId: string;
  name: string;
  nickname: string;
  pastAccidentDetails: string;
  patientDiseaseList: [];
  phone: string;
  significant: string;
  userId: string;
  weight: number;
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
  const [birthday, setBirthday] = useState('')
  const [emailCheck, setEmailCheck] = useState(false);
  const [CheckNickName, setCheckNickName] = useState('F');

  const [newContent, setNewContent] = useState({
    'phone': userInfo.phone,
    'email': userInfo.email,
    'nickname': userInfo.nickname,
    'height': userInfo.height,
    'weight': userInfo.weight,
    'patientDiseaseList': userInfo.patientDiseaseList,
    'pastAccidentDetails': userInfo.pastAccidentDetails,
    'etc': userInfo.etc,
  })

  const diseaseList: stringObj = {
    'DO1' : '고혈압',
    'DO2' : '간경화증',
    'DO3' : '뇌졸중',
    'DO4' : '당뇨',
    'DO5' : '백혈병',
    'DO6' : '심근경색',
    'DO7' : '심장판막증',
    'DO8' : '암',
    'DO9' : '에이즈',
    'D10' : '협심증',
  }


  useEffect(()=> {
    if (userInfo.name !== undefined) {
      
      const b = userInfo.birth.substring(0,10).replaceAll('-', '/')
      const p = `${userInfo.phone.substring(0,3)} - ${userInfo.phone.substring(3,7)} - ${userInfo.phone.substring(7,11)}`

      setBirthday(b)
      setPhone(p)
    } 

  }, [userInfo])


  // 닉네임 중복 검사

  const nicknameCheckFtn = async () => {
    if (newContent.nickname === userInfo.nickname) {
      alert('기존에 등록된 닉네임은 중복검사 하지 않습니다.')
      setCheckNickName('T');
    } else {
      try {
        await axios.post('/api/patient/profile/duplicate', {nickname : newContent.nickname}, { headers })
        alert('사용 가능한 닉네임입니다.')
        setCheckNickName('T');
      } catch(err) {
        if(axios.isAxiosError(err)) {
          if (err.response?.status === 400) {
            alert('중복된 닉네임입니다.\n다시 입력해주세요.')
          }
        }
        setCheckNickName('F');
      }
    }
  }




  // 이메일 인증 검사

  const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

  const SendMessage = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>|React.KeyboardEvent) => {
    if (newContent.email === userInfo.email) {
      alert('기존에 등록된 이메일은 중복검사하지 않습니다.')
    } else if (newContent.email === '') {
      alert('이메일을 입력해주세요')
    } else if (!emailRegEx.test(newContent.email)) {
      alert('유효하지 않은 이메일 형식입니다.\n이메일을 다시 입력해주세요.')
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

  const CheckAuthenInputDiv = <div className='row profile-content-line'>
    <p style={{fontWeight:"bold", fontSize: '2.4rem', paddingLeft: '4rem'}}>휴대폰 인증번호</p>
    <label className='tprofile-input-content-box'>
      <input type="text" id="pauthenInput"  value={phoneAuthenticationNum} className={`tprofile-update-content ${AuthNumOk === 'T'? 'green' : (AuthNumOk === "F"? "red": "")}`} style={{fontSize:'1.7rem'}} onChange={(el) => {setPhoneAuthenticationNum(el.currentTarget.value.replace(/[^0-9]/g, ''))}}/>
      <div className='tprofile-input-check' onClick={(e) => {CheckAuthenticationNumber(e)}}>
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
    } else if (newContent.nickname !== userInfo.nickname && CheckNickName === 'F') {
      alert('닉네임 변경을 위해서는 인증이 필요합니다.')
    } else {
      try {
        await axios.put(`/api/patient/profile/${localStorage.getItem('userPk')}`, {body: newContent}, {headers})
        window.location.reload()
      } catch(err) {
        console.log(err)
      }
    }
  }

  const WeightForbiddenFtn = (el: any) => {
    if (el.currentTarget.value.length > 3) {
      setNewContent({...newContent,weight: el.currentTarget.value.replace(/[^0-9]/g, '').slice(1,4)})
    } else {
      setNewContent({...newContent, weight: el.currentTarget.value.replace(/[^0-9]/g, '')})
    }
  }


  const HeightForbiddenFtn = (el: any) => {
    if (el.currentTarget.value.length > 3) {
      setNewContent({...newContent, height: el.currentTarget.value.replace(/[^0-9]/g, '').slice(1,4)})
    } else {
      setNewContent({...newContent, height: el.currentTarget.value.replace(/[^0-9]/g, '')})
    }
  }
  



  return (
    <div className='col profile-update-box'>
      <div className='col tprofile-header'>
        <div className='col tprofile-header-profileImg'>
          <div className='profileImg-box-circle'>
             <p>{userInfo.name? userInfo.name.substring(0,1) : ''}</p>
          </div>
          <div className='row nicknameAndChangePwd'>
            <p style={{fontWeight:"bold", fontSize: '2.5rem', marginLeft: '45.8%'}}>{userInfo.nickname}</p>
            <div className='password-delete-btn' onClick={() => {navigate("/UserWithdrawal")}}>
              <p>회원 탈퇴</p>
            </div>
          </div>
        </div>
      </div>
      <div className='col tprofile-content'>
        <div className='row tprofile-content-header'> 
          <p>환자 기본 정보 수정</p>
        </div>
        <div className='col tprofile-content-body'>
          <div className='row profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.4rem', paddingLeft: '4rem'}}>이름</p>
            <div className="tprofile-real-content-box">
              <p>{userInfo.name}</p>
            </div>
          </div>
          <div className='row profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.4rem', paddingLeft: '4rem'}}>아이디</p>
            <div className="tprofile-real-content-box">
              <p>{userInfo.loginId}</p>
            </div>
          </div>
          <div className='row profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.4rem', paddingLeft: '4rem'}}>이메일</p>
            <label className='tprofile-input-content-box'>
              <input type="text" placeholder={userInfo.email} value={newContent.email !== null? newContent.email : "" } onChange={(el) => {setEmailCheck(false); setNewContent({...newContent, email: el.target.value})}} className='tprofile-update-content'/>
              <div className='tprofile-input-check' onClick={(e) => {SendMessage(e)}}>
                <p>중복검사</p>
              </div>
            </label>
          </div>
          <div className='row profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.4rem', paddingLeft: '4rem'}}>전화번호</p>
            <label className='tprofile-input-content-box'>
              <input type="tel" placeholder={phone} value={newContent.phone !== null? newContent.phone : "" } onChange={(el) => {setPhoneAuthenticationNum(''); setNewContent({...newContent, phone: el.currentTarget.value.replace(/[^0-9]/g, '')})}} className='tprofile-update-content'/>
              <div className='tprofile-input-check' style={{display: visible? "none" : ""}} onClick={(e) => {phoneCheckHandler(e)}}>
                <p>번호 인증</p>
              </div>
            </label>
          </div>
          {visible? CheckAuthenInputDiv : <></>}
        </div>
      </div>
      <div className='col tprofile-content'>
        <div className='row tprofile-content-header'>
          <p>회원 추가 정보 수정</p>
        </div>
        <div className='col tprofile-content-body'>
          <div className='row profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.1rem', paddingLeft: '4rem'}}>닉네임</p>
            <label className='tprofile-input-content-box'>
              <input type="text" placeholder={userInfo.nickname} value={newContent.nickname !== null? newContent.nickname : "" } onChange={(el) => {setCheckNickName(''); setNewContent({...newContent, nickname: el.target.value})}} className='tprofile-update-content'/>
              <div className='tprofile-input-check' onClick={(e) => {SendMessage(e)}}>
                <p>중복검사</p>
              </div>
            </label>
          </div>
          <div className='row profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.1rem', paddingLeft: '4rem'}}>생년월일</p>
            <div className="tprofile-real-content-box">
              <p>{birthday}</p>
            </div>
          </div>
          <div className='row profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.1rem', paddingLeft: '4rem'}}>성별</p>
            <div className="tprofile-real-content-box">
              <p>{userInfo.gender === "M"? "남자" : "여자"}</p>
            </div>
          </div>
          <div className='row profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.1rem', paddingLeft: '4rem'}}>키(cm)</p>
            <div className='tprofile-input-content-box'>
              <input type="text" value={newContent.height !== null? newContent.height : "" } onChange={e => HeightForbiddenFtn(e)} className='therapist-tprofile-update-content'/>
            </div>
          </div>
          <div className='row profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.1rem', paddingLeft: '4rem'}}>몸무게(kg)</p>
            <div className='tprofile-input-content-box'>
              <input type="text" value={newContent.weight !== null? newContent.weight : "" } onChange={e => WeightForbiddenFtn(e)} className='therapist-tprofile-update-content'/>
            </div>
          </div>
          <div className='row profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.1rem', paddingLeft: '4rem'}}>보유 질환</p>
            <div className="tprofile-real-content-box-long">
              {userInfo.patientDiseaseList.length === 0? <p>보유 질환이 없습니다.</p>
               : userInfo.patientDiseaseList.map((el: any) => {
                return <p key={el.diseaseId}>{diseaseList[el.diseaseCode]}</p>
              })}
            </div>
          </div>
          <div className='row profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.1rem', paddingLeft: '4rem'}}>사고 이력</p>
            <div className='tprofile-input-content-box'>
              <input type="text" placeholder={userInfo.pastAccidentDetails} value={newContent.pastAccidentDetails !== null? newContent.pastAccidentDetails : "" } onChange={e => setNewContent({...newContent, pastAccidentDetails: e.target.value})} className='therapist-tprofile-update-content'/>
            </div>
          </div>
          <div className='row profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.1rem', paddingLeft: '4rem'}}>특이 사항</p>
            <div className='tprofile-input-content-box'>
              <input type="text" placeholder={userInfo.etc} value={newContent.etc !== null? newContent.etc : "" } onChange={e => setNewContent({...newContent, etc: e.target.value})} className='therapist-tprofile-update-content'/>
            </div>
          </div>
        </div>
      </div>
      <div className='col tprofile-footer'>
        <div className='col tprofile-submitBtn' onClick={() => {ChangeTherapistProfile()}}>
          <p>정보 수정 완료</p>
        </div>
      </div>
    </div>
  )
}

export default ProfileUpdate