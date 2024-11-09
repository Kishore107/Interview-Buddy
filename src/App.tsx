import React from 'react';
import { ApiKeyInput } from './components/ApiKeyInput';
import { VoiceTranscription } from './components/VoiceTranscription';
import { useStore } from './store/useStore';
import { Brain } from 'lucide-react';

function App() {
  const { transcript, aiResponse } = useStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <ApiKeyInput />
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center gap-3 mb-8">
          <Brain className="w-8 h-8 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-900">Interview Buddy</h1>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <VoiceTranscription />
            
            {transcript && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-sm font-medium text-gray-600 mb-2">Transcript:</h2>
                <p className="text-gray-900">{transcript}</p>
              </div>
            )}
          </div>

          {aiResponse && (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-sm font-medium text-gray-600 mb-2">AI Response:</h2>
              <div className="prose max-w-none">
                <p className="text-gray-900 whitespace-pre-wrap">{aiResponse}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;