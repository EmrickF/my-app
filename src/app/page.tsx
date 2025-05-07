"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

export default function Page() {
  const { data: session } = authClient.useSession()
  const [clicks, setClicks] = useState(0)
  const [totalClicks, setTotalClicks] = useState(0)
  const [canSave, setCanSave] = useState(false)
  const [updateClicks, setUpdateClicks] = useState(0) // State for custom update input
  const router = useRouter()

  useEffect(() => {
    if (!session?.user?.id) return

    fetch(`/api/score?userId=${session.user.id}`)
      .then((response) => response.json())
      .then((data) => {
        const total = data.reduce((sum, record) => sum + record.clicks, 0)
        setTotalClicks(total)
      })
      .catch((error) => console.error('Error fetching user clicks:', error))
  }, [session?.user?.id])

  const handleSave = () => {
    if (!session?.user?.id) {
      console.error('No user ID found')
      return
    }

    fetch('/api/score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ clicks, sessionId: session.user.id }),
    })
      .then((response) => response.json())
      .then(() => {
        setTotalClicks((prev) => prev + clicks)
        setClicks(0)
        setCanSave(false)
        console.log('Saved successfully')
      })
      .catch((error) => console.error('Error saving clicks:', error))
  }

  const handleUpdateClicks = () => {
    if (!session?.user?.id) {
      console.error('No user ID found')
      return
    }

    fetch('/api/score', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ clicks: updateClicks, sessionId: session.user.id }),
    })
      .then((response) => response.json())
      .then(() => {
        setTotalClicks(updateClicks)
        console.log('Clicks updated successfully')
      })
      .catch((error) => console.error('Error updating clicks:', error))
  }

  const handleDeleteClicks = () => {
    if (!session?.user?.id) {
      console.error('No user ID found')
      return
    }

    fetch('/api/score', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionId: session.user.id }),
    })
      .then((response) => response.json())
      .then(() => {
        setTotalClicks(0)
        setClicks(0)
        console.log('Clicks deleted successfully')
      })
      .catch((error) => console.error('Error deleting clicks:', error))
  }

  const handleClick = () => {
    setClicks((prev) => prev + 1)
    setCanSave(true)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        {session?.user?.name && (
          <div className="text-lg font-bold bg-gray-700 px-4 py-2 rounded">
            Logged in as: {session.user.name}
          </div>
        )}
        {session?.user?.id && (
          <button
            onClick={() => authClient.signOut()}
            className="px-4 py-2 bg-red-500 rounded hover:bg-red-400 text-white font-bold"
          >
            Logout
          </button>
        )}
      </div>
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
        <button
          onClick={handleClick}
          className="px-10 py-10 bg-teal-500 rounded hover:bg-teal-400 text-white mb-4 font-bold"
        >
          CLICK ME BRO
        </button>
        <p className="text-lg font-bold">Clicks: {clicks}</p>
        <p className="text-lg font-bold">Total Clicks: {totalClicks}</p>
      </div>
      <div className="mt-10">
        <button
          onClick={handleSave}
          disabled={!canSave}
          className={`px-4 py-2 rounded text-white font-bold ${
            canSave ? 'bg-blue-500 hover:bg-blue-400' : 'bg-gray-500 cursor-not-allowed'
          }`}
        >
          Save Clicks
        </button>
      </div>
      <div className="mt-10 flex items-center gap-4">
        <input
          type="number"
          value={updateClicks}
          onChange={(e) => setUpdateClicks(Number(e.target.value))}
          className="px-4 py-2 rounded bg-gray-700 text-white"
          placeholder="Enter new clicks"
        />
        <button
          onClick={handleUpdateClicks}
          className="px-4 py-2 bg-yellow-500 rounded hover:bg-yellow-400 text-white font-bold"
        >
          Update Clicks
        </button>
      </div>
      {session?.user?.id && (
        <div className="absolute bottom-16 left-4">
          <button
            onClick={handleDeleteClicks}
            className="px-4 py-2 bg-red-500 rounded hover:bg-red-400 text-white font-bold"
          >
            Delete Clicks
          </button>
        </div>
      )}
    </div>
  )
}