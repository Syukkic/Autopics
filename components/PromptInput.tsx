'use client';

import React, { useState } from 'react';

function PromptInput() {
  const [prompt, setPrompt] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Submitting prompt: ${prompt}`);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit data');
      }
      const data = await response.json();
      console.log(`API response ${JSON.stringify(data)}`);
      setPrompt('');
    } catch (error) {
      console.error(`Error Submitting data: ${error}`);
    }
  };
  return (
    <div className="m-10">
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row shadow-md shadow-slate-400/10 border rounded-md lg:divide-x">
        <textarea value={prompt} onChange={handleInputChange} placeholder="Enter your prompt" className="flex-1 p-4 outline-none rounded-md " />
        <button
          type="submit"
          className={`p-4 font-bold ${prompt ? 'bg-green-700 text-white transition-colors duration-200' : 'text-gray-300 cursor-not-allowed'}`}
          disabled={!prompt}
        >
          Generate
        </button>
      </form>
    </div>
  );
}

export default PromptInput;
