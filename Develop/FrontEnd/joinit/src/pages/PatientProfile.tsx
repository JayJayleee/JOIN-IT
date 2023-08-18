import React, {useState, useEffect} from 'react';
import './PatientProfile/PatientProfile.css';
import Nav from '../Components/Nav/Nav'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import NavBar from './PatientProfile/navBar';
import ProfileDetail from './PatientProfile/ProfileDetail';
import ProfileUpdate from './PatientProfile/ProfileUpdate';
import CareCodeRegister from './careCodeRegister';


interface propType {
  userInfo: profileObject;
  pagenum: number;
  setPagenum: (x: number) => void;
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

function TapContent({userInfo, pagenum, setPagenum}: propType) {

  return [ <ProfileDetail userInfo={userInfo} setPagenum={setPagenum} />, <ProfileUpdate userInfo={userInfo} setPagenum={setPagenum} /> ][pagenum]
}


function PatientProfile() {
  const [GoToRegisterCareCode, setGoToRegisterCareCode] = useState(false);
  const [userInfo, setUserInfo] = useState<profileObject>({
    birth: "",
    email: "",
    etc: "",
    gender: "",
    height: 0,
    loginId: "",
    name: "",
    nickname: "",
    pastAccidentDetails: "",
    patientDiseaseList: [],
    phone: "",
    significant: "",
    userId: "",
    weight: 0,
  })
  const [pagenum, setPagenum] = useState<number>(0);

  const navigate = useNavigate();

  const eventChangeFtn = (x: number) => {
    navigate('/Pboard', {state: { selectTreatmentId: x},})
  }

  const CareCodeStateHandler = () => {
    setGoToRegisterCareCode(false);
  };

  useEffect(() => {

    const headers = {
      'context-Type' : 'apllication/json',
      'Authorization' : `Bearer ${localStorage.getItem('access-token')}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true'
    }

    const fetchData = async () => {

      try {
        const Result = await axios.get(`/api/patient/profile/${localStorage.getItem('userPk')}`, {headers})

        setUserInfo(Result.data)
      } catch(err) {
        console.log(err)
      }
    }
    fetchData();

  }, [])
  return (
    <React.Fragment>
      <Nav setGoToRegisterCareCode={setGoToRegisterCareCode} />
      <div className='col Pboard'>
        {
          GoToRegisterCareCode && <CareCodeRegister CareCodeRegister={CareCodeStateHandler} />
        }
        <div className='row PdashboardDivide'>
          <div className='PdashboardDivide_left'>
            <NavBar setGoToRegisterCareCode={setGoToRegisterCareCode} eventChangeFtn={eventChangeFtn} />
          </div>
          <div className='col Pprofile-dashboardDivide_right'>
            <TapContent userInfo={userInfo} pagenum={pagenum} setPagenum={setPagenum} />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default PatientProfile