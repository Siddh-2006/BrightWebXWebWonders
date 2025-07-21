import React,{useState} from 'react'
import navContext from './navContext'

function NavContextProvider({children}) {
  const [activeTab,setActiveTab]=useState("player");
  return (
    
    <navContext.Provider value={{activeTab,setActiveTab}}>
        {children}
    </navContext.Provider>
  )
}

export default NavContextProvider
