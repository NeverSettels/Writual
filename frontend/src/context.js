import React, { createContext, useState, useEffect } from 'react'
import AuthService from './services/auth'
export const MyContext = createContext()

function MyProvider(props) {
  useEffect(() => {
    const authService = new AuthService()
    authService
      .profile()
      .then(prevState => setState({ isLogged: true }))
      .catch()
  }, [])
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