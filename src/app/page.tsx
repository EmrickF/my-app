"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export default function Page() {
  const {data : session} = authClient.useSession(); 
  const [clicks, setClicks] = useState(0);
  const router = useRouter();
  const handlesave = () => {
    if (!session?.user?.id) {
      console.error('no user ID found');
      return;
    }
  
    fetch('/api/score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ clicks, sessionId: session.user.id }),
    })
      .then((response) => response.json())
      .then((data) => console.log('Saved successfully:', data))
      .catch((error) => console.error('Error saving clicks:', error));
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={() => router.push('/login')}
          className="px-4 py-4 bg-white text-gray-800 rounded hover:bg-gray-200 font-bold"
        >
          LOGIN
        </button>
        <button
          onClick={() => router.push('/signup')}
          className="px-4 py-4 bg-white text-gray-800 rounded hover:bg-gray-200 font-bold"
        >
          SIGNUP
        </button>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-bold mb-4 text-center">
          CLICK HIM BRO WHAT ARE YOU DOING!!!1!1!
        </h1>
        <div className="text-4xl mb-2 animate-bounce">⬇️</div>
        <button
          onClick={() => setClicks(clicks + 1)}
          className="px-10 py-10 bg-teal-500 rounded hover:bg-teal-400 text-white mb-4 font-bold font-size-xL"
        >
          CLICK ME BRO
        </button>
        <p className="text-lg font-bold font-size-xL">Clicks: {clicks}</p>
      </div>
      <div className="mt-10">
        <button
          onClick={handlesave}
          className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-400 text-white font-bold"
        >
          Save Clicks
        </button>
      </div>
    </div>
  );
}