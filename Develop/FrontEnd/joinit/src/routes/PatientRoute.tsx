import React from 'react'
import { Outlet, Navigate } from 'react-router'


function PatientRoute() {
  const accessToken = localStorage.getItem('access-token')
  const userPk = localStorage.getItem('userPk');
  const userType = localStorage.getItem('userType');

  if (accessToken === null) {
    alert('로그인 후 이용 가능합니다.')
  } else if (userPk === "admin") {
    alert('관리자 계정으로는 접속이 불가능합니다.')
  } else if (userType === "T") {
    alert("치료사 계정으로는 접속이 불가능합니다.")
  }

  return accessToken !== null && userPk !== "admin" && userType !== "T"? <Outlet /> : <Navigate to="/login" />;
}

export default PatientRoute