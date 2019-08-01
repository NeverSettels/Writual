import React, { useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Logout from '../AuthComponents/Logout'
import LoginForm from '../AuthComponents/LoginForm'
import SignUpForm from '../AuthComponents/SignUpForm'
import { MyContext } from '../../context'

export default function NavBar(props) {
  const context = useContext(MyContext)

  return (
    <nav className="nav-bar">
      <NavLink to="/">
        <img style={{ height: '10vh' }} src="/logo.PNG" alt="" />
      </NavLink>
      {console.log(context.state)}
      {context.state.user && context.state.isLogged ? (
        <>
          <NavLink to={`/profile/${context.state.user._id}`}>
            <span>Profile</span>
          </NavLink>
          <NavLink to="/create">
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
