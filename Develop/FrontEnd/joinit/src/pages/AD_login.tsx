import React, {useState} from 'react'
import './AD_login/AD_login.css'

function AD_login() {

  const [adId, setAdId] = useState('');
  const [adPassword, setAdPassword] = useState('');

  const adFormSubmitHandler = () => {
    if(!adId) {
      alert('ID를 입력해주세요.')
      setAdId('');
      setAdPassword('');
      return 
    } else if (!adPassword) {
      alert('PASSWORD를 입력해주세요.')
      setAdId('');
      setAdPassword('');
      return 
    } else {
      alert('id : ' + adId + ' password : ' + adPassword)
      setAdId('');
      setAdPassword('');
      return 
    }
  }

  return (
    <div className='col adloginPage'>
      <img src="/Assets/Images/Logo.png" alt="Logo" className='adLoginLogoImg'/>
      <div>
      <form className='AdloginForm' id="AdloginElem">
        <div className='AdidSection'>
          <p>ID</p>
          <input
           type="text" 
           name="Id" 
           placeholder='아이디를 입력해주세요.' 
           className='AdIdInput'
           value={adId}
           onChange={(event) => {setAdId(event.target.value)}}
           />
        </div>
        <div className='AdpasswordSection'>
          <p>Password</p>
          <input
           type="password" 
           name="password" 
           placeholder='비밀번호를 입력해주세요.' 
           className='AdPasswordInput'
           value={adPassword}
           onChange={(event) => {setAdPassword(event.target.value)}}
           />
        </div>
        <div className='AdloginButton' onClick={() => {adFormSubmitHandler()}} >
          <div className='AdloginButton-inner' />
          <p>로그인</p>
        </div>
      </form>
      </div>

    </div>
  )
}

export default AD_login