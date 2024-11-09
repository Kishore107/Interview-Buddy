import { create } from 'zustand';

interface AppState {
  apiKey: string;
  setApiKey: (key: string) => void;
  isListening: boolean;
  setIsListening: (status: boolean) => void;
  transcript: string;
  setTranscript: (text: string) => void;
  aiResponse: string;
  setAiResponse: (text: string) => void;
}

export const useStore = create<AppState>((set) => ({
  apiKey: '',
  setApiKey: (key) => set({ apiKey: key }),
  isListening: false,
  setIsListening: (status) => set({ isListening: status }),
  transcript: '',
  setTranscript: (text) => set({ transcript: text }),
  aiResponse: '',
  setAiResponse: (text) => set({ aiResponse: text }),
}));