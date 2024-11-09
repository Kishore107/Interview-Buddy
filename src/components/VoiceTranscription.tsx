import React, { useEffect, useCallback } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { useStore } from '../store/useStore';
import { getGeminiResponse } from '../utils/gemini';

export const VoiceTranscription = () => {
  const { isListening, setIsListening, transcript, setTranscript, setAiResponse, apiKey } = useStore();

  const processVoiceInput = useCallback(async (text: string) => {
    try {
      const response = await getGeminiResponse(text, apiKey);
      setAiResponse(response);
    } catch (error) {
      console.error('Error getting AI response:', error);
    }
  }, [apiKey, setAiResponse]);

  useEffect(() => {
    let recognition: SpeechRecognition | null = null;

    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        
        setTranscript(transcript);
        
        // Process complete sentences
        if (event.results[event.results.length - 1].isFinal) {
          processVoiceInput(transcript);
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    }

    if (isListening && recognition) {
      recognition.start();
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [isListening, setTranscript, processVoiceInput, setIsListening]);

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTranscript('');
      setAiResponse('');
    }
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={toggleListening}
        className={`p-4 rounded-full transition-all ${
          isListening 
            ? 'bg-red-100 text-red-600 hover:bg-red-200' 
            : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
        }`}
      >
        {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
      </button>
      <span className="text-sm text-gray-600">
        {isListening ? 'Tap to stop' : 'Tap to start'}
      </span>
    </div>
  );
};