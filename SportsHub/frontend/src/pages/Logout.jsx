import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
function Logout({setIsLoggedIn}) {
  const navigate=useNavigate();
  useEffect(()=>{
    setIsLoggedIn(false);
    navigate("/login");

  })
  return (
    <div>
      
    </div>
  )
}

export default Logout
