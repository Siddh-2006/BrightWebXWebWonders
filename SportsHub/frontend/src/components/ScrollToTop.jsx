import { useLocation } from "react-router";
import { useEffect } from "react";

import React from 'react'

function ScrollToTop() {
const { pathname } = useLocation();
  useEffect(()=>{
    window.scrollTo(0,0);
  },[])
  return (
    <div>ScrollToTop</div>
  )
}

export default ScrollToTop;