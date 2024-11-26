'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react'

const playlist = [
  { title: "Our Song", artist: "Artist Name", src: "/path-to-song1.mp3" },
  { title: "First Dance", artist: "Artist Name", src: "/path-to-song2.mp3" },
  { title: "Road Trip Anthem", artist: "Artist Name", src: "/path-to-song3.mp3" },
]

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause()
    } else {
      audioRef.current?.play()
    }
    setIsPlaying(!isPlaying)
  }

  const playNext = () => {
    setCurrentTrack((prevTrack) => (prevTrack + 1) % playlist.length)
  }

  const playPrevious = () => {
    setCurrentTrack((prevTrack) => (prevTrack - 1 + playlist.length) % playlist.length)
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = playlist[currentTrack].src
      if (isPlaying) {
        audioRef.current.play()
      }
    }
  }, [currentTrack])

  return (
    <div className="bg-blue-100 p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-4 text-blue-600 font-playfair">Our Playlist</h3>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-pink-600 font-semibold">{playlist[currentTrack].title}</p>
          <p className="text-blue-500">{playlist[currentTrack].artist}</p>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={playPrevious} className="text-pink-500 hover:text-pink-600">
            <SkipBack size={24} />
          </button>
          <button onClick={togglePlay} className="text-pink-500 hover:text-pink-600">
            {isPlaying ? <Pause size={32} /> : <Play size={32} />}
          </button>
          <button onClick={playNext} className="text-pink-500 hover:text-pink-600">
            <SkipForward size={24} />
          </button>
        </div>
      </div>
      <audio ref={audioRef} onEnded={playNext} />
    </div>
  )
}

