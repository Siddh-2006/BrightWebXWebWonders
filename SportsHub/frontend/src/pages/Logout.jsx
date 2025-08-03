import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { showCustomToast } from '../helper/CustomToast';
import axios from 'axios';
function Logout({setIsLoggedIn}) {
  const navigate=useNavigate();
  useEffect(()=>{
    const log_out= async ()=>{
      const res=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/logout`,{withCredentials:true})
      if(res.status==200){
        setIsLoggedIn(false);
        localStorage.clear();
        navigate("/login");
      }
      else{
        showCustomToast("error","check you network connection")
      }
    }
    log_out()
  })
  return (
    <div>
    </div>
  )
}

export default Logout
