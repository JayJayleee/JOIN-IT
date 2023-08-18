import React, {useState, useEffect} from 'react'
import './TherapistProfile/TherapistProfile.css'
import Navbar from './TherapistProfile/nav'
import Nav from '../Components/Nav/Nav'
import ProfileDetail from './TherapistProfile/ProfileDetail'
import ProfileUpdate from './TherapistProfile/ProfileUpdate'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

interface propType {
  userInfo: profileObject;
  pagenum: number;
  setPagenum: (x: number) => void;
}

type profileObject = {
  [key: string] : string
}

function TapContent({userInfo, pagenum, setPagenum}: propType) {

  return [ <ProfileDetail userInfo={userInfo} setPagenum={setPagenum} />, <ProfileUpdate userInfo={userInfo} setPagenum={setPagenum} /> ][pagenum]
}


function TherapistProfile() {
  const [userInfo, setUserInfo] = useState<profileObject>({})
  const [pagenum, setPagenum] = useState<number>(0);

  const navigate = useNavigate();

  const eventChangeFtn = (x: number) => {
    navigate('/Tboard', {state: { pagenumber: x},})
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
        const Result = await axios.get(`/api/therapist/profile/${localStorage.getItem('userPk')}`, {headers})
        setUserInfo(Result.data)
      } catch(err) {
        console.log(err)
      }
    }
    fetchData();

  }, [])

  return (
    <React.Fragment>
      <Nav />
      <div className='col board'>
        <div className='row uppertitle'>
          <p className='welcomeMsg'>오늘도 좋은 하루 보내세요, <span className='therapistName'>{userInfo.name}</span> 치료사님!</p>
          <div className="tboardbutton-2" onClick={(e)=> {navigate('/carecreate')}}>
            <div className="tboardeff-2"></div>
            <p> 치료 시작하기 </p>
          </div>
        </div>
        <div className='row dashboardDivide'>
          <div className='dashboardDivide_left'>
            <Navbar eventChangeFtn={eventChangeFtn} />
          </div>
          <div className='tprofile-dashboardDivide_right'>
            <TapContent userInfo={userInfo} pagenum={pagenum} setPagenum={setPagenum} />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default TherapistProfile