'use client'

import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'

const song = {
  title: "Get You (feat. Kali Uchis)",
  artist: "Daniel Caesar",
  src: "/path-to-your-audio-file.mp3",  // Replace with the actual path to your MP3 file
  startTime: 0  // Set this to the desired start time in seconds
}

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.currentTime = song.startTime
      audio.volume = 0.2  // Set initial volume to 20%
      audio.play().catch(error => console.log("Autoplay prevented:", error))
      setIsPlaying(true)

      const handleEnded = () => {
        audio.currentTime = song.startTime
        audio.play()
      }

      audio.addEventListener('ended', handleEnded)

      return () => {
        audio.removeEventListener('ended', handleEnded)
      }
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (audio) {
      if (isPlaying) {
        audio.pause()
      } else {
        audio.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg flex items-center space-x-2">
        <button onClick={togglePlay} className="text-pink-500 hover:text-pink-600 transition-colors">
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <div className="text-sm">
          <p className="font-semibold text-pink-600">{song.title}</p>
          <p className="text-blue-500">{song.artist}</p>
        </div>
      </div>
      <audio 
        ref={audioRef}
        src={song.src}
        loop
      />
    </div>
  )
}

