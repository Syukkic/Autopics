'use client';

import { useState } from 'react';

function PromptInput() {
  const [prompt, setPrompt] = useState('');

  return (
    <div className="m-10">
      <form className="flex flex-col lg:flex-row shadow-md shadow-slate-400/10 border rounded-md lg:divide-x">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt"
          className="flex-1 p-4 outline-none rounded-md "
        />
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
