import React, {useState, useEffect} from 'react';
import './patientProfileDetail.css';
import CompleteCare from './pateintProfileDetail/completeCare';
import NotCompleteCare from './pateintProfileDetail/notCompleteCare';
import axios from 'axios';

interface propType {
  eventChangeFtn: (x: number) => void;
  givePatientId: string;
  setTreatId: (x: number) => void;
  setCompleteCareStatus: (x: boolean) => void;
  setNameAndJoint: (x: string) => void;
}

type patientProfile = {
  birth: string;
  etc: string;
  gender: string;
  height: number;
  name: string;
  pastAccidentDetails: string;
  patientDiseaseList: Object[];
  phone: string;
  treatmentList: Object[];
  weight: number;
  significant: string;
}

type stringObj = {
  [key: string] : string;
}


function PatientProfileDetail({eventChangeFtn, givePatientId, setTreatId, setCompleteCareStatus, setNameAndJoint}: propType) {
  const [patientProfileDetail, setPatientProfileDetail] = useState<patientProfile>({
    birth: '',
    etc: '',
    gender: '',
    height: 0,
    name: '',
    pastAccidentDetails: '',
    patientDiseaseList: [],
    phone: '',
    treatmentList: [],
    weight: 0,
    significant: '',
  });

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

  useEffect(() => {
    const headers = {
      'context-Type' : 'apllication/json',
      'Authorization' : `Bearer ${localStorage.getItem('access-token')}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true'
    }

    const fetchData = async () => {
      try {
        const Result = await axios.post(`/api/therapist/patient/detail/${localStorage.getItem('userPk')}`,{patientId: givePatientId}, {headers})
        setPatientProfileDetail(Result.data)
      } catch(err) {
        console.log(err)
      }
    }

    fetchData();
  }, [givePatientId])

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentList = (careList: Array<Object>) => {
    let currentPosts: object[] = [];
    if (careList === undefined) {
      return []
    } else {
      currentPosts = careList.slice(indexOfFirstPost, indexOfLastPost);
      return currentPosts
    }
  }
  let postLength = 0

  if (patientProfileDetail.treatmentList !== undefined) {
    postLength = patientProfileDetail.treatmentList.length
  } 

  let pageNumber = Math.ceil(postLength / postsPerPage);
  if (pageNumber === 0) {
    pageNumber = 1;
  }

  const pagination = <ul className="row pagination">
    <div
      className="pageBoxBtn"
      onClick={currentPage === 1? undefined : () => setCurrentPage(currentPage - 1)}
      style={{backgroundColor: currentPage === 1? '#5D6569' : '#dbf2f1'}}
      >
      <p className="page-link">
        {'<'}
      </p>
    </div>
    <div className="pageBoxPageNum">
      <p>{currentPage} / {pageNumber}</p>
    </div>
    <div
      className="pageBoxBtn"
      onClick={currentPage === pageNumber? undefined : () => setCurrentPage(currentPage + 1)}
      style={{backgroundColor: currentPage === pageNumber? '#5D6569' : '#dbf2f1'}}
    >
      <p className="page-link">
        {'>'}
      </p>
    </div>
  </ul>


  const AllCareList = <div className='col' style={{height: '25rem', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    {currentList(patientProfileDetail.treatmentList).map((care: any) => care.endTime === "null"? <NotCompleteCare care={care} eventChangeFtn={eventChangeFtn} key={care.treatmentId} setTreatId={setTreatId} setCompleteCareStatus={setCompleteCareStatus} setNameAndJoint={setNameAndJoint} /> 
    : <CompleteCare care={care} eventChangeFtn={eventChangeFtn} key={care.treatmentId} setTreatId={setTreatId} setCompleteCareStatus={setCompleteCareStatus} setNameAndJoint={setNameAndJoint} />)}
  </div>
  
  return ( 
    <div className='col therapist-patient-profile-box'>
      <React.Fragment>
        <div className='row therapist-patient-profile-title'>
          <p>환자 정보</p>
        </div>
        <div className='col therapist-patient-profile-default'>
          <div className='row therapist-patient-profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.1rem', paddingLeft: '4rem'}}>이름</p>
            <div className="therapist-patient-profile-real-content-box">
              <p>{patientProfileDetail.name}</p>
            </div>
          </div>
          <div className='row therapist-patient-profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.1rem', paddingLeft: '4rem'}}>성별</p>
            <div className="therapist-patient-profile-real-content-box">
              <p>{patientProfileDetail.gender === 'M'? '남자' : '여자'}</p>
            </div>
          </div>
          <div className='row therapist-patient-profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.1rem', paddingLeft: '4rem'}}>생년월일</p>
            <div className="therapist-patient-profile-real-content-box">
              <p>{patientProfileDetail.birth !== ''? `${patientProfileDetail.birth.substring(0,10).replaceAll('-', ' / ')}`: ''}</p>
            </div>
          </div>
          <div className='row therapist-patient-profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.1rem', paddingLeft: '4rem'}}>전화번호</p>
            <div className="therapist-patient-profile-real-content-box">
              <p>{patientProfileDetail.phone !== ''? `${patientProfileDetail.phone.substring(0,3)} - ${patientProfileDetail.phone.substring(3,7)} - ${patientProfileDetail.phone.substring(7,11)}` : ''}</p>
            </div>
          </div>
        </div>
      </React.Fragment>
      <React.Fragment>
        <div className='row therapist-patient-profile-title'>
          <p>환자 입력 정보</p>
        </div>
        <div className='col therapist-patient-profile-addition'>
          <div className='row therapist-patient-profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.1rem', paddingLeft: '4rem'}}>키(cm)</p>
            <div className="therapist-patient-profile-real-content-box">
              <p>{patientProfileDetail.height}</p>
            </div>
          </div>
          <div className='row therapist-patient-profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.1rem', paddingLeft: '4rem'}}>몸무게(kg)</p>
            <div className="therapist-patient-profile-real-content-box">
              <p>{patientProfileDetail.weight}</p>
            </div>
          </div>
          <div className='row therapist-patient-profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.1rem', paddingLeft: '4rem'}}>보유질환</p>
            <div className="row therapist-patient-profile-real-content-box">
              {patientProfileDetail.patientDiseaseList.length === 0? <p>보유 질환이 없습니다.</p>
               : patientProfileDetail.patientDiseaseList.map((el: any) => {
                return <p key={el.diseaseId}>{diseaseList[el.diseaseCode]}</p>
              })}
            </div>
          </div>
          <div className='row therapist-patient-profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.1rem', paddingLeft: '4rem'}}>사고경력</p>
            <div className="therapist-patient-profile-real-content-box">
              <p>{patientProfileDetail.pastAccidentDetails === ''? <p>사고경력이 없습니다.</p> : patientProfileDetail.pastAccidentDetails}</p>
            </div>
          </div>
          <div className='row therapist-patient-profile-content-line'>
            <p style={{fontWeight:"bold", fontSize: '2.1rem', paddingLeft: '4rem'}}>특이사항</p>
            <div className="therapist-patient-profile-real-content-box">
              <p>{patientProfileDetail.significant === ''? <p>특이사항이 없습니다.</p> : patientProfileDetail.significant}</p>
            </div>
          </div>
        </div>
      </React.Fragment>
      <React.Fragment>
        <div className='row therapist-patient-profile-care-title'>
          <p>전체 치료 목록</p>
          {pagination}
        </div>
        {AllCareList}
      </React.Fragment>
    </div>
  )
}

export default PatientProfileDetail