import React, { useState } from 'react'
import loginContext from './loginContext'

function LoginContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');

  return (
    <loginContext.Provider value={{
      isLoggedIn,
      setIsLoggedIn,
      userType,
      setUserType
    }}>
      {children}
    </loginContext.Provider>
  )
}

export default LoginContextProvider
