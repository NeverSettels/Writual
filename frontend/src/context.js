import React, { createContext, useState, useEffect } from 'react'
import AuthService from './services/auth'
export const MyContext = createContext()

function MyProvider(props) {
  const [state, setState] = useState({
    user: {},
    isLogged: false
  })
  useEffect(() => {
    const authService = new AuthService()
    authService
      .profile()
      .then(res => setState({ user: res.data.user, isLogged: true }))
      .catch()
  }, [])


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
