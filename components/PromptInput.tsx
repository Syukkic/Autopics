'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { IoMdDownload } from 'react-icons/io';

function PromptInput() {
  const [prompt, setPrompt] = useState('');
  const [imageURLs, setImageURLs] = useState<string[]>([]);

  type successResponse = {
    created: number;
    data: {
      b64_json: null | string;
      revised_prompt: string;
      url: string;
    }[];
  };

  type errorResponse = string;

  type responseType = {
    status: string;
    response: successResponse | errorResponse;
  };

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

      const data: responseType = await response.json();
      if (data.status === 'success') {
        const successData: successResponse = data.response as successResponse;
        const newImageURL = successData.data[0].url;
        setImageURLs([...imageURLs, newImageURL]);
        toast.success('Your AI Arts has been Generated!', {
          icon: '🥳',
        });

        setPrompt('');
      } else {
        const errorMessage: errorResponse = data.response as errorResponse;
        console.log(`successData: ${errorMessage}`);
        toast.error(errorMessage, { icon: '🙀' });
      }
    } catch (error) {
      console.error(`Error Submitting data: ${error}`);
    }
  };

  const downloadFile = async (imageURL: string, fileName: string) => {
    fetch(imageURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/image',
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;

        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
      });
  };

  return (
    <>
      <Toaster />
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
      <div className="container mx-auto px-2 py-2 lg:px-20 lg:pt-20">
        <div className="-m-1 flex flex-wrap md:-m-2">
          <div className="grid gap-4 grid-cols-4 grid-rows-4">
            {imageURLs.length > 0 && (
              <>
                {imageURLs.map((url, index) => (
                  <div key={index} className="relative hover:scale-[105%] transition-transform duration-200 ease-in-out">
                    <Image key={index} src={url} alt="" width={420} height={420} className="float-right" />
                    <div className="absolute inset-0 flex justify-center items-center bg-white opacity-0 hover:opacity-80 transition-opacity">
                      <p className="text-center font-light text-lg p-5">
                        <button onClick={() => downloadFile(url, `AI-Image-${index}.png`)}>
                          <IoMdDownload />
                        </button>
                      </p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PromptInput;
