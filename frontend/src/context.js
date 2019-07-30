import React, { createContext, useState } from 'react'
import AuthService from './services/auth'
export const MyContext = createContext()

function MyProvider(props) {
  const authService = new AuthService()
  const [state, setState] = useState({
    user: {},
    isLogged: false
  })

  const setUser = user => {
    setState(prevState => ({
      ...prevState,
      user,
      isLogged: !prevState.isLogged
    }))
  }
  authService
    .profile()
    .then(prevState => setState({ isLogged: true }))
    .catch()
  return (
    <MyContext.Provider
      value={{
        state,
        setUser
      }}
    >
      {props.children}
    </MyContext.Provider>
  )
}

export default MyProvider
