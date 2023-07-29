import React from 'react';
import './miniProfile.css';


function MiniProfile() {
  const Therapist_profile = {
    img : "/Assets/Images/Therapist_image.png",
    name : "치료사",
    hospital : "꽤나 괜찮은 병원"
  }

  return (
    <div className='miniProfile col'>
      <img className="TherapistImage" src={Therapist_profile.img} alt="Therapist" />
      <div className="TherapistName">{Therapist_profile.name}</div>
      <div className="TherapistHospital">{Therapist_profile.hospital}</div>
    </div>
  )
}

export default MiniProfile