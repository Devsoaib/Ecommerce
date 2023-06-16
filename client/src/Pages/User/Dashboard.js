import React from 'react'
import Jumbotron from '../../Components/Cards/Jumbotron'
import UserMenu from '../../Components/Navs/UserMenu'
import { useAuth } from '../../Context/Auth'

function UserDashboard() {
  const [auth, setAuth] = useAuth()
  return (
    <div>
    <Jumbotron title={`Hello ${auth.user.name.toUpperCase()}`} subTitle= "User Dashboard"></Jumbotron>

    <div className="container-fluid mx-5 mt-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu></UserMenu>
          </div>
          <div className="col-md-9">
            <h1>User Information</h1>
            <h4>{`Name: ${auth?.user.name}`}</h4>
            <h4>{`Email: ${auth?.user.email}`}</h4>
            <h4>{`Address: ${auth?.user.address}`}</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard