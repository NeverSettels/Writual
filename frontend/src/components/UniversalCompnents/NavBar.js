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
      <Link activeClassName="active" to="/">
        <img style={{ height: '10vh' }} src="/logo.PNG" alt="" />
      </Link>
      {console.log(context.state)}
      {context.state.user ? (
        <>
          <NavLink activeClassName="active" to={`/profile/${context.state.user._id}`}>
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
