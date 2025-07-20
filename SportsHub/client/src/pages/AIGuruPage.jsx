// src/pages/AIGuruPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from '../components/ai-guru/ChatMessage'; // Adjust path
import UserBioForm from '../components/ai-guru/UserBioForm'; // Adjust path
import { getAIGuruResponse } from '../services/aiGuruService'; // Adjust path
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis'; // Adjust path

const MAX_GURU_MESSAGE_LENGTH = 400; // Characters before showing "Read More"

function AIGuruPage() {
  // State for user details
  const [userName, setUserName] = useState('Rahul');
  const [userAge, setUserAge] = useState('28');
  const [userSex, setUserSex] = useState('Male');
  const [userHeight, setUserHeight] = useState('175');
  const [userWeight, setWeight] = useState('70');
  const [preferredSport, setPreferredSport] = useState('Cricket');
  const [userLanguage, setUserLanguage] = useState('en-IN');
  const [otherBioDetails, setOtherBioDetails] = useState('Plays club cricket. Want to improve my bowling speed.');

  // State for chat
  const [chatMessages, setChatMessages] = useState([
    { role: 'guru', text: "Hello there! I'm AI Guru, your personal sports coach. Tell me, what's on your mind today? No question is too silly!" },
  ]);
  const [userQuestion, setUserQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [showBio, setShowBio] = useState(false); // State to toggle bio section visibility

  // Refs for scrolling
  const chatMessagesRef = useRef(null);

  // Hook for speech synthesis
  const { stopSpeech } = useSpeechSynthesis();

  // Scroll to bottom of chat messages whenever messages update
  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  // Handle initial bio section visibility based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowBio(true); // Always show on large screens
      } else {
        // Only change if it's currently showing and screen size is small
        if (showBio) {
          setShowBio(false);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call on mount

    return () => window.removeEventListener('resize', handleResize);
  }, [showBio]);

  const scrollToBottom = () => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  };

  const handleAskGuru = async () => {
    if (!userQuestion.trim()) return;

    const newUserMessage = { role: 'user', text: userQuestion };
    setChatMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setUserQuestion(''); // Clear input

    setLoading(true);
    stopSpeech(); // Stop any ongoing speech before sending a new question

    try {
      const userDetails = {
        userName, userAge, userSex, userHeight, userWeight, preferredSport, otherBioDetails
      };

      const guruResponseText = await getAIGuruResponse(
        chatMessages, // Send current chat messages for context
        userQuestion.trim(),
        userDetails,
        userLanguage
      );

      setChatMessages((prevMessages) => [
        ...prevMessages,
        { role: 'guru', text: guruResponseText },
      ]);
    } catch (error) {
      console.error("Error communicating with AI Guru:", error);
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { role: 'guru', text: "AI Guru is having trouble connecting right now. Please check your internet or try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleBio = () => {
    setShowBio((prev) => !prev);
  };

  return (
    <div className="container">
      <div className="header">
        AI Guru: Your Personal Sports Coach 🏏
      </div>
      <div className="content-area">
        {/* User Bio Input Section */}
        <div className={`bio-section ${!showBio ? 'hidden-bio-mobile' : ''}`}>
          <UserBioForm
            userName={userName} setUserName={setUserName}
            userAge={userAge} setUserAge={setUserAge}
            userSex={userSex} setUserSex={setUserSex}
            userHeight={userHeight} setUserHeight={setUserHeight}
            userWeight={userWeight} setWeight={setWeight}
            preferredSport={preferredSport} setPreferredSport={setPreferredSport}
            userLanguage={userLanguage} setUserLanguage={setUserLanguage}
            otherBioDetails={otherBioDetails} setOtherBioDetails={setOtherBioDetails}
          />
        </div>

        {/* Chat Section */}
        <div className="chat-section">
          <button id="toggleBioBtn" className="toggle-bio-btn w-full rounded-lg mb-4" onClick={handleToggleBio}>
            {showBio ? 'Hide User Details' : 'Show User Details'}
          </button>
          <h3 className="text-xl font-semibold mb-4 text-orange-400">Ask AI Guru Anything!</h3>
          <div className="chat-messages" ref={chatMessagesRef}>
            {chatMessages.map((msg, index) => (
              <ChatMessage key={index} message={msg} userLanguage={userLanguage} />
            ))}
          </div>
          <div className="input-group mt-auto">
            <label htmlFor="userQuestion" className="sr-only">Your Question:</label>
            <textarea
              id="userQuestion"
              rows="3"
              placeholder="Type your question here..."
              value={userQuestion}
              onChange={(e) => setUserQuestion(e.target.value)}
              onKeyPress={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAskGuru(); } }}
            />
          </div>
          <button id="askGuruBtn" className="w-full rounded-lg" onClick={handleAskGuru} disabled={loading}>
            {loading ? 'Thinking...' : 'Ask AI Guru'}
          </button>
          {loading && <div id="loadingIndicator" className="loading-indicator">AI Guru is thinking...</div>}
        </div>
      </div>
    </div>
  );
}

export default AIGuruPage;