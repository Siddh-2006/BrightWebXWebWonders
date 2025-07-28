import React,{useState,useEffect} from 'react'
import loginContext from './loginContext'
function LoginContextProvider({children}) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check both login status and token existence
    const loginStatus = localStorage.getItem('login') === 'true';
    const token = localStorage.getItem('token');
    return loginStatus && token;
  });
  const [userType, setUserType] = useState(() => {
    return localStorage.getItem('userType') || '';
  });

  useEffect(() => {
    localStorage.setItem("login", isLoggedIn);
    localStorage.setItem("userType", userType);
    
    // Clear token when user logs out
    if (!isLoggedIn) {
      localStorage.removeItem("token");
    }
    
    console.log('LoginContext - Login status:', isLoggedIn, 'User type:', userType);
    console.log('LoginContext - Token exists:', localStorage.getItem('token') ? 'Yes' : 'No');
  }, [isLoggedIn, userType]);

  // Function to check if user is properly authenticated
  const checkAuthStatus = () => {
    const loginStatus = localStorage.getItem('login') === 'true';
    const token = localStorage.getItem('token');
    const isAuthenticated = loginStatus && token;
    
    if (isLoggedIn !== isAuthenticated) {
      setIsLoggedIn(isAuthenticated);
    }
    
    return isAuthenticated;
  };

  return (
    <loginContext.Provider value={{
      isLoggedIn,
      setIsLoggedIn,
      userType,
      setUserType,
      checkAuthStatus
    }}>
      {children}
    </loginContext.Provider>
  )
}

export default LoginContextProvider
