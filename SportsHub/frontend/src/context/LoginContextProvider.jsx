import React,{useState,useEffect} from 'react'
import loginContext from './loginContext'
function LoginContextProvider({children}) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('login') === 'true';
  });
  const [userType, setUserType] = useState(() => {
    return localStorage.getItem('userType') || '';
  });

  useEffect(() => {
    localStorage.setItem("login", isLoggedIn);
    localStorage.setItem("userType", userType);
    console.log(isLoggedIn, userType);
  }, [isLoggedIn, userType]);

  return (
    <loginContext.Provider value={{ isLoggedIn, setIsLoggedIn, userType, setUserType }}>
      {children}
    </loginContext.Provider>
  )
}

export default LoginContextProvider
