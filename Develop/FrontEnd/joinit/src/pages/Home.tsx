import React from 'react'
import "./Home/Home.css"
function Home() {
  return (
    <div>
        <div className='videodiv'>
          <video muted autoPlay loop>
            <source src="/Assets/Videos/main1.mp4" type="video/mp4" />
          </video>
        </div>
        <div className='main1div'>
        <img src="/Assets/Images/logo.png" alt='logo img' className='mainimg'/>
          <p className='mainInfo'>당신의 평생 헬스케어 파트너</p>
        </div>
    </div>
    
  )
}

export default Home