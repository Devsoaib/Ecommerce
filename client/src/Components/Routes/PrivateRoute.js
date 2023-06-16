import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../../Context/Auth'
import Loading from './Loading'

function PrivateRoute() {
    const [auth, setAuth] = useAuth()
    const [ok, setOk] = useState(false)
    useEffect(()=> {
        auth?.token ? setOk(true) : setOk(false)
    },[auth?.token])
  return (
    ok ? <Outlet></Outlet> : <Loading></Loading>
  )
}

export default PrivateRoute