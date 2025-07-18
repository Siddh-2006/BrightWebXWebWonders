import React, { useState, useRef } from 'react';
import { parseMarkdown } from '../../utils/markdownParser'; 
import { useSpeechSynthesis } from '../../hooks/useSpeechSynthesis'; 

const MAX_GURU_MESSAGE_LENGTH = 400; 

function ChatMessage({ message, userLanguage }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { speak, stopSpeech } = useSpeechSynthesis();
  const listenButtonRef = useRef(null);

  const originalText = message.text;
  const isTruncated = originalText.length > MAX_GURU_MESSAGE_LENGTH;

  const displayContent = isTruncated && !isExpanded
    ? originalText.substring(0, MAX_GURU_MESSAGE_LENGTH).lastIndexOf(' ') !== -1
      ? originalText.substring(0, originalText.substring(0, MAX_GURU_MESSAGE_LENGTH).lastIndexOf(' ')) + '...'
      : originalText.substring(0, MAX_GURU_MESSAGE_LENGTH) + '...'
    : originalText;

  const handleListenClick = () => {
    speak(originalText, userLanguage, listenButtonRef.current);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`message ${message.role === 'user' ? 'user-message' : 'guru-message'}`}>
      {message.role === 'guru' ? (
        <>
          <span dangerouslySetInnerHTML={{ __html: parseMarkdown(displayContent) }} />
          {isTruncated && (
            <button onClick={toggleExpand} className="read-more-btn">
              {isExpanded ? 'Show Less' : 'Read More'}
            </button>
          )}
          {window.speechSynthesis && ( 
            <button
              ref={listenButtonRef}
              className="listen-btn"
              onClick={handleListenClick}
            >
              Listen
            </button>
          )}
        </>
      ) : (
        message.text
      )}
    </div>
  );
}

export default ChatMessage;