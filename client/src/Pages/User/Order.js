import React from 'react'
import Jumbotron from '../../Components/Cards/Jumbotron'
import UserMenu from '../../Components/Navs/UserMenu'
import { useAuth } from '../../Context/Auth'

function Order() {
    const [auth, setAuth] = useAuth()
    
    return (
      <div>
          <Jumbotron
          title={`Hello ${auth.user.name.toUpperCase()}`}
          subTitle="User Dashboard"
        ></Jumbotron>
  
  <div className="container-fluid mx-5 mt-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu></UserMenu>
          </div>
          <div className="col-md-9">
            <h1>Orders</h1>
          </div>
        </div>
      </div>
      </div>
    )
}

export default Order