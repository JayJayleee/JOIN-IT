import React, {useState} from 'react';
import './P_signUpDetail.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface propsType {
  name: string;
  defineId: string;
}

type diseaseType = {
 [key: string]: string;
}

function PSignUpDetail({ name, defineId }: propsType) {
  // 회원 가입 완료 버튼 클릭 시 페이지 이동을 위한 함수
  const moveLoginPage = useNavigate();
  // input 창의 입력 값 관리 state
  const [patientHeight, setPatientHeight] = useState('');
  const [patientWeight, setPatientWeight] = useState('');
  const [patientGender, setPatientGender] = useState('');
  const [patientBirthDate, setPatientBirthDate] = useState('');
  const [patientNickname, setPatientNickname] = useState('');
  const [patientDisease, setPatientDisease] = useState<diseaseType>({
    "D01" : "",
    "D02" : "",
    "D03" : "",
    "D04" : "",
    "D05" : "",
    "D06" : "",
    "D07" : "",
    "D08" : "",
    "D09" : "",
    "D10" : "",
    "etc" : '',
  });
  const [patientAccident, setPatientAccident] = useState('');
  const [patientSpecial, setPatientSpecial] = useState('');
  const [etcCheck, ChangeEtcCheck] = useState(false);
  // 닉네임 중복 검사 상태를 저장하는 state
  const [CheckNickName, setCheckNickName] = useState('');
  // axios 요청 시 header 정보
  const headers = {
    "Access-Control-Allow-Origin" : "*",
    "Context-Type" : "application/json",
  }


  /** 닉네임 중복 검사 버튼 클릭 시 실행하는 함수 */
  const CheckNicknameBtnHandler = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

    try {
      await axios.post('/api/patient/profile/duplicate', {nickname : patientNickname}, { headers })
      alert('사용 가능한 닉네임입니다.')
      setCheckNickName('T');
    } catch (err) {
      console.log(err)
      alert('중복된 닉네임입니다.');
      setCheckNickName('F');
    }
  }

  /** 보유 질환 버튼 클릭 시 실행하는 함수
   ** 보유 질환 체크 박스 중 클릭된 박스의 이름과 현재 체크 상태를 인자로 받음
   *  
   * -> 보유 질환 선택을 관리하는 state의 해당 질환의 상태를 바꿈
   */
  const ChangeDiseasePorA = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, checked} = event.target;

    if (checked) {
      setPatientDisease({
          ...patientDisease,
          [name]: name,
      })
    } else {
      setPatientDisease({
        ...patientDisease,
        [name]: "",
    })
    }
  }


  /** 보유 질환 버튼 중 etc 클릭 시 실행하는 함수
   * 1. etc 버튼이 클릭되어 있지 않았을 경우, 버튼을 클릭하면 우측의 입력창의 disable 값이 false로 바뀌고 focus 효과
   * 2. etc 버튼이 클릭되어 있을 경우, 버튼을 클릭하면 우측의 입력창의 disable 값이 true로 바뀜
   */
  const CheckChangeBtnHandler = () => {

    const etcBtn = document.getElementById('etcInput')! as HTMLInputElement;

    if(etcCheck === false) {
      ChangeEtcCheck(true);
      etcBtn.disabled = false
      etcBtn.focus();
    } else {
      ChangeEtcCheck(false);
      etcBtn.disabled = true
    }
  }

  interface bodyType {
    nickname : string;
    height : number;
    weight : number;
    gender : string;
    birth : string;
    patientDiseaseList: string[],
    etc : string;
    pastAccidentDetails : string;
    significant : string;
  }


  /** 회원가입 완료 버튼 클릭 시 실행하는 함수,
   *  1. 필수 입력 칸이 비어있는 경우 알람 창이 뜬 후 모든 입력 창을 비움
   *  2. 필수 입력 칸이 차 있는 경우 로그인 페이지로 이동
   */
  const PatientSubmitChangeHandler = async () => {
    if (patientHeight === '' || patientWeight === '' || patientGender === '' || patientBirthDate === '' || patientNickname === '') {
      alert('필수 입력 칸은 전부 입력해주세요.')
      // setPatientHeight('');
      // setPatientWeight('');
      // setPatientGender('');
      // setPatientBirthDate('');
      // setPatientNickname('');
      // setPatientDisease({
      //   "D01" : "",
      //   "D02" : "",
      //   "D03" : "",
      //   "D04" : "",
      //   "D05" : "",
      //   "D06" : "",
      //   "D07" : "",
      //   "D08" : "",
      //   "D09" : "",
      //   "D10" : "",
      //   "etc" : '',
      // });
      // setPatientAccident('');
      // setPatientSpecial('');
      // ChangeEtcCheck(false);
      return
    } else {
      try {

        const body: bodyType = {
          nickname : patientNickname,
          height : Number(patientHeight),
          weight : Number(patientWeight),
          gender : patientGender, 
          birth : patientBirthDate,
          patientDiseaseList: [],
          etc : patientDisease.etc,
          pastAccidentDetails : patientAccident,
          significant : patientSpecial,
        }

        Object.keys(patientDisease).forEach((key: string) => {
          if (key === 'etc') {
          } else {
            if (patientDisease[key] !== '') {
              body.patientDiseaseList.push(key)
            }
          }
        })

        await axios.post(`/api/patient/profile/${defineId}`, body, { headers })
        alert('회원가입이 완료되었습니다.')
        moveLoginPage('/login');
      } catch (err) {
        console.log(err)
        alert('회원가입에 실패하였습니다.')
      }
    }
  }

  const WeightForbiddenFtn = (el: any) => {
    if (el.currentTarget.value.length > 3) {
      setPatientWeight(el.currentTarget.value.replace(/[^0-9]/g, '').slice(1,4))
    } else {
      setPatientWeight(el.currentTarget.value.replace(/[^0-9]/g, ''))
    }
  }


  const HeightForbiddenFtn = (el: any) => {
    if (el.currentTarget.value.length > 3) {
      setPatientHeight(el.currentTarget.value.replace(/[^0-9]/g, '').slice(1,4))
    } else {
      setPatientHeight(el.currentTarget.value.replace(/[^0-9]/g, ''))
    }
  }
  


  return (
    <div className='col patient-signupPage-second'>
    <p style={{fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem'}}>환영합니다, {name}님!</p>
    <div className='row patient-signupPage-divide'>
      <div className='col patient-signupPage-height'>
        <p>키 (cm) *</p>
        <label className='patient-signupPage-height-input'>
          <input type="text" placeholder='170 *' value={patientHeight} style={{fontSize:'1.7rem'}} onChange={(el) => {HeightForbiddenFtn(el)}}/>
        </label>
      </div>
      <div className='col patient-signupPage-weight'>
        <p>몸무게 (kg) *</p>
        <label className='patient-signupPage-weight-input'>
          <input type="text" placeholder='80 *' value={patientWeight} style={{fontSize:'1.7rem'}} onChange={(el) => {WeightForbiddenFtn(el)}}/>
        </label>
      </div>
    </div>
    <div className='row patient-signupPage-divide'>
      <div className='col patient-signupPage-gender'>
        <p>성별 *</p>
        <select name="gender" id="gender" className="patient-signupPage-gender-select" value={patientGender} onChange={(e) => {setPatientGender(e.target.value)}}>
          <option>PLEASE Select</option>
          <option value="M">남성</option>
          <option value="W">여성</option>
        </select>
      </div>
      <div className='col patient-signupPage-birthDate'>
        <p>생년월일 *</p>
        <label className='patient-signupPage-birthDate-input'>
          <input type="date" placeholder='YYYY-MM-DD *' min='1900-01-01' max='2099-12-31' style={{fontSize:'1.7rem'}} value={patientBirthDate} onChange={(e) => {setPatientBirthDate(e.target.value)}}/>
        </label>
      </div>
    </div>
    <div className='col patient-signupPage-nickname'>
      <p>닉네임 *</p>
      <label className='patient-signupPage-nickname-input'>
        <input type="text" placeholder='Example123 *' value={patientNickname} style={{fontSize:'1.7rem'}} className={`patientInput ${CheckNickName === "T"? 'green': (CheckNickName === "F"? 'red': '')}`} onChange={(e) => {setPatientNickname(e.target.value)}}/>
        <div className='patient-signupPage-nickname-check' onClick={(e) => {CheckNicknameBtnHandler(e)}}>
          <p>중복 검사</p>
        </div>
      </label>
    </div>
    <div className='col patient-signupPage-disease'>
      <p>보유 질환 *</p>
      <div className='row patient-signupPage-disease-checklist'>
        <div className='col patient-disease-checklist-inner'>
          <div className='row patient-disease-checkdiv'><label className='row patient-disease-checklabel'><input type="checkbox" className='patient-disease-checkbox' checked={patientDisease["D01"] === ""? false : true} name="D01" onChange={(e) => {ChangeDiseasePorA(e)}}/><p className='checkNameIn'>고혈압</p></label></div>
          <div className='row patient-disease-checkdiv'><label className='row patient-disease-checklabel'><input type="checkbox" className='patient-disease-checkbox' checked={patientDisease["D05"] === ""? false : true} name="D05" onChange={(e) => {ChangeDiseasePorA(e)}}/><p className='checkNameIn'>백혈병</p></label></div>
          <div className='row patient-disease-checkdiv'><label className='row patient-disease-checklabel'><input type="checkbox" className='patient-disease-checkbox' checked={patientDisease["D09"] === ""? false : true} name="D09" onChange={(e) => {ChangeDiseasePorA(e)}}/><p className='checkNameIn'>에이즈</p></label></div>
        </div>
        <div className='col patient-disease-checklist-inner'>
          <div className='row patient-disease-checkdiv'><label className='row patient-disease-checklabel'><input type="checkbox" className='patient-disease-checkbox' checked={patientDisease["D02"] === ""? false : true} name="D02" onChange={(e) => {ChangeDiseasePorA(e)}}/><p className='checkNameIn'>간경화증</p></label></div>
          <div className='row patient-disease-checkdiv'><label className='row patient-disease-checklabel'><input type="checkbox" className='patient-disease-checkbox' checked={patientDisease["D06"] === ""? false : true} name="D06" onChange={(e) => {ChangeDiseasePorA(e)}}/><p className='checkNameIn'>심근경색</p></label></div>
          <div className='row patient-disease-checkdiv'><label className='row patient-disease-checklabel'><input type="checkbox" className='patient-disease-checkbox' checked={patientDisease["D10"] === ""? false : true} name="D10" onChange={(e) => {ChangeDiseasePorA(e)}}/><p className='checkNameIn'>협심증</p></label></div>
        </div>
        <div className='col patient-disease-checklist-inner'>
          <div className='row patient-disease-checkdiv'><label className='row patient-disease-checklabel'><input type="checkbox" className='patient-disease-checkbox' checked={patientDisease["D03"] === ""? false : true} name="D03" onChange={(e) => {ChangeDiseasePorA(e)}}/><p className='checkNameIn'>뇌졸중</p></label></div>
          <div className='row patient-disease-checkdiv'><label className='row patient-disease-checklabel'><input type="checkbox" className='patient-disease-checkbox' checked={patientDisease["D07"] === ""? false : true} name="D07" onChange={(e) => {ChangeDiseasePorA(e)}}/><p className='checkNameIn'>심장판막증</p></label></div>
          <div className='row patient-disease-checkdiv' style={{zIndex: '2'}}>
            <label className='row patient-disease-checklabel'><input type="checkbox" className='patient-disease-checkbox' checked={etcCheck} onChange={CheckChangeBtnHandler} id='etcbtn'/><p className='checkNameIn'>etc</p></label>
            <input type="text" placeholder='병명을 입력해주세요' id='etcInput' disabled={true} className='patient-disease-etc-input' value={patientDisease.etc} onChange={(e) => setPatientDisease({...patientDisease, etc: e.target.value})}/></div>
        </div>
        <div className='col patient-disease-checklist-inner'>
          <div className='row patient-disease-checkdiv'><label className='row patient-disease-checklabel'><input type="checkbox" className='patient-disease-checkbox' checked={patientDisease["D04"] === ""? false : true}  name="D04" onChange={(e) => {ChangeDiseasePorA(e)}}/><p className='checkNameIn'>당뇨</p></label></div>
          <div className='row patient-disease-checkdiv'><label className='row patient-disease-checklabel'><input type="checkbox" className='patient-disease-checkbox' checked={patientDisease["D08"] === ""? false : true}  name="D08" onChange={(e) => {ChangeDiseasePorA(e)}}/><p className='checkNameIn'>암</p></label></div>
          <div style={{width: '140px', 'height': '26px'}}/>
        </div>
      </div>
    </div>
    <div className='col patient-signupPage-accident'>
      <p>사고 경력</p>
      <label className='patient-signupPage-accident-input'>
        <input type="text" value={patientAccident} style={{fontSize:'1.7rem'}} className="patientInput" onChange={(e) => {setPatientAccident(e.target.value)}}/>
      </label>
    </div>
    <div className='col patient-signupPage-special'>
      <p>특이 사항</p>
      <label className='patient-signupPage-special-input'>
        <input type="text" value={patientSpecial} style={{fontSize:'1.7rem'}} className="patientInput" onChange={(e) => {setPatientSpecial(e.target.value)}}/>
      </label>
    </div>
    <p style={{width: '100%', textAlign: 'right', color:'#0F5953', fontWeight:'bold'}}>*표시는 필수 입력 칸입니다.</p>
    <div className='patient-signupPage-submit-button2' onClick={PatientSubmitChangeHandler}>
      <div className='patient-signupPage-submit-button2-inner' />
      <p>회원 가입 완료</p>
    </div>
  </div>
  )
}

export default PSignUpDetail