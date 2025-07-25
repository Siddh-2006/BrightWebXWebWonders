import React,{useState,useEffect} from 'react'
import loginContext from './loginContext'
function LoginContextProvider({children}) {
  const [isLoggedIn,setIsLoggedIn]=useState(() => {
    return localStorage.getItem('login') === 'true';
  });
  useEffect(()=>{
    localStorage.setItem("login",isLoggedIn);
    console.log(isLoggedIn)
  },[isLoggedIn])
  return (
    <loginContext.Provider value={{isLoggedIn,setIsLoggedIn}}>
        {children}
    </loginContext.Provider>
  )
}

export default LoginContextProvider
