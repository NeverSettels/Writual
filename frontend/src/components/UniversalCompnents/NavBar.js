import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import Logout from '../AuthComponents/Logout'
import LoginForm from '../AuthComponents/LoginForm'
import SignUpForm from '../AuthComponents/SignUpForm'
import { MyContext } from '../../context'

export default function NavBar(props) {
  const context = useContext(MyContext)

  return (
    <nav className="nav-bar">
      <NavLink activeClassName="active" to="/">
        <span>Home</span>
      </NavLink>
      {context.state.isLogged ? (
        <>
          <NavLink activeClassName="active" to="/profile">
            <span>Profile</span>
          </NavLink>
          <NavLink activeClassName="active" to="/create">
            <span>Create</span>
          </NavLink>
          <Logout />
        </>
      ) : (
        <>
          <LoginForm />
          <SignUpForm />
        </>
      )}
    </nav>
  )
}
