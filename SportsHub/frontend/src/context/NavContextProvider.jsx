import React, { useState, useContext } from 'react';
import navContext from './navContext';

function NavContextProvider({ children }) {
  const [activeTab, setActiveTab] = useState('player');

  const value = {
    activeTab,
    setActiveTab,
  };

  return (
    <navContext.Provider value={value}>
      {children}
    </navContext.Provider>
  );
}

// Custom hook for using the nav context
export const useNavContext = () => {
  const context = useContext(navContext);
  if (context === undefined) {
    throw new Error('useNavContext must be used within a NavContextProvider');
  }
  return context;
};

export default NavContextProvider;
