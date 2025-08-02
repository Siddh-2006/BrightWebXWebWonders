import React,{useState,useEffect} from 'react'
import loginContext from './loginContext'
function LoginContextProvider({children}) {
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  useEffect(()=>{
    localStorage.setItem("login",isLoggedIn)
  },[isLoggedIn])
  return (
    <loginContext.Provider value={{
      isLoggedIn,
      setIsLoggedIn,
    }}>
      {children}
    </loginContext.Provider>
  )
}

export default LoginContextProvider
