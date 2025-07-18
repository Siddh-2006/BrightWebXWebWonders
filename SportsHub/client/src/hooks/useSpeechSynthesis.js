import { useState, useRef, useCallback } from 'react';

export const useSpeechSynthesis = () => {
  const currentUtteranceRef = useRef(null);
  const currentListenButtonRef = useRef(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const stopSpeech = useCallback(() => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    if (currentListenButtonRef.current) {
      currentListenButtonRef.current.textContent = 'Listen';
      currentListenButtonRef.current.classList.remove('speaking');
      currentListenButtonRef.current = null;
    }
    currentUtteranceRef.current = null;
    setIsSpeaking(false);
  }, []);

  const speak = useCallback((text, lang, buttonElement) => {
    if (!window.speechSynthesis) {
      console.warn("Text-to-speech not supported in this browser.");
      return;
    }

    stopSpeech();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang || 'en-IN';

    utterance.onstart = () => {
      if (buttonElement) {
        buttonElement.textContent = 'Stop';
        buttonElement.classList.add('speaking');
        currentListenButtonRef.current = buttonElement;
      }
      setIsSpeaking(true);
    };
    utterance.onend = () => {
      if (buttonElement) {
        buttonElement.textContent = 'Listen';
        buttonElement.classList.remove('speaking');
        currentListenButtonRef.current = null;
      }
      currentUtteranceRef.current = null;
      setIsSpeaking(false);
    };
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error);
      if (buttonElement) {
        buttonElement.textContent = 'Listen';
        buttonElement.classList.remove('speaking');
        currentListenButtonRef.current = null;
      }
      currentUtteranceRef.current = null;
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
    currentUtteranceRef.current = utterance;
  }, [stopSpeech]);

  return { speak, stopSpeech, isSpeaking };
};