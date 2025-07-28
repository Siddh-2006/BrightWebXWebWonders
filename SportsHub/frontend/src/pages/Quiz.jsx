import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import QuizSection from '../components/QuizSection';

const Quiz = ({ isDarkMode }) => {
  const location = useLocation();
  const [selectedSport, setSelectedSport] = useState('');

  useEffect(() => {
    // Get selected sport from navigation state
    if (location.state?.selectedSport) {
      setSelectedSport(location.state.selectedSport);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen pt-20">
      <QuizSection isDarkMode={isDarkMode} preSelectedSport={selectedSport} />
    </div>
  );
};

export default Quiz;