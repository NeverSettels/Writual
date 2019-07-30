import React, { useContext } from 'react'
import AuthService from '../../services/auth'
import { MyContext } from '../../context'
export default function Logout(props) {
  const context = useContext(MyContext)
  const authService = new AuthService()
  const handleLogout = props => {
    authService
      .logout()
      .then(response => {
        context.setUser({})
      })
      .catch(err => {
        console.log(err)
      })
  }
  return <span onClick={handleLogout}>Logout</span>
}
