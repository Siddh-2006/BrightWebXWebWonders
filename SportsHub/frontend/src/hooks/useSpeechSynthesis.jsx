import { useCallback, useRef } from 'react';

export const useSpeechSynthesis = () => {
  const utteranceRef = useRef(null);

  const stopSpeech = useCallback(() => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const speak = useCallback((text, lang, buttonElement) => {
    if (!window.speechSynthesis) {
      console.warn("Text-to-speech not supported");
      return;
    }

    stopSpeech();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang || 'en-IN';

    utterance.onstart = () => {
      if (buttonElement) {
        buttonElement.textContent = 'Stop';
      }
    };

    utterance.onend = () => {
      if (buttonElement) {
        buttonElement.textContent = 'Listen';
      }
    };

    utterance.onerror = () => {
      if (buttonElement) {
        buttonElement.textContent = 'Listen';
      }
    };

    window.speechSynthesis.speak(utterance);
    utteranceRef.current = utterance;
  }, [stopSpeech]);

  return { speak, stopSpeech };
};  