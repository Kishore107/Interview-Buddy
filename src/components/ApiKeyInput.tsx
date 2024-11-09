import React, { useState } from 'react';
import { Key } from 'lucide-react';
import { useStore } from '../store/useStore';

export const ApiKeyInput = () => {
  const [input, setInput] = useState('');
  const setApiKey = useStore((state) => state.setApiKey);
  const apiKey = useStore((state) => state.apiKey);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApiKey(input);
  };

  if (apiKey) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
        <div className="flex items-center gap-3 mb-6">
          <Key className="w-6 h-6 text-indigo-600" />
          <h2 className="text-xl font-semibold">Enter Gemini API Key</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Your Gemini API Key"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Start Using App
          </button>
        </form>
      </div>
    </div>
  );
};