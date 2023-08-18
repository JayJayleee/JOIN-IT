import React from 'react'
import { Outlet, Navigate } from 'react-router'


function PrivateRoute() {
  const accessToken = localStorage.getItem('access-token')
  const userPk = localStorage.getItem('userPk');

  if (accessToken === null) {
    alert('로그인 후 이용 가능합니다.')
  } else if (userPk === "admin") {
    alert('관리자 계정으로는 접속이 불가능합니다.')
  }

  return accessToken !== null && userPk !== "admin"? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute