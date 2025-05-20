'use client'
import React, { useEffect, useState } from 'react'

type Game = {
  id: number
  title: string
  genre: string
  publisher: string
  platform: string
  developer: string
  release_date: string
}

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([])
  const [genre, setGenre] = useState('')
  const [publisher, setPublisher] = useState('')

  // Fetch games from API with filters
  const fetchGames = async () => {
    let url = '/api/games'
    const params = new URLSearchParams()
    if (genre) params.append('genre', genre)
    if (publisher) params.append('publisher', publisher)
    if (params.toString()) url += `?${params.toString()}`
    const res = await fetch(url)
    const data = await res.json()
    setGames(data)
  }

  useEffect(() => {
    fetchGames()
  }, [genre, publisher])

  const uniqueGenres = Array.from(new Set(games.map(g => g.genre)))
  const uniquePublishers = Array.from(new Set(games.map(g => g.publisher)))

  return (
    <div>
      <h1>Games</h1>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <select value={genre} onChange={e => setGenre(e.target.value)}>
          <option value="">All Genres</option>
          {uniqueGenres.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
        <select value={publisher} onChange={e => setPublisher(e.target.value)}>
          <option value="">All Publishers</option>
          {uniquePublishers.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>
      <ul>
        {games.map(game => (
          <li key={game.id}>
            <b>{game.title}</b> | {game.genre} | {game.publisher} | {game.platform} | {game.release_date}
          </li>
        ))}
      </ul>
    </div>
  )
}