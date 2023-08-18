import React from 'react'
import { Navigate, Outlet } from 'react-router'

function PublicRoute() {
  const accessToken = localStorage.getItem('access-token');

  return accessToken === null? <Outlet /> : <Navigate to="/" />
}

export default PublicRoute