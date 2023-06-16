import React from 'react'
import { Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

function UserMenu() {
  return (
    <div>
  
  <Nav className="flex-column">
    <NavLink className="nav-link" to="/dashboard/user">Dashboard</NavLink>
    <NavLink className="nav-link" to="/dashboard/user/profile">Profile</NavLink>
    <NavLink className="nav-link" to="/dashboard/user/order">Orders</NavLink>
  </Nav>
</div>
  )
}

export default UserMenu