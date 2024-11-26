'use client'

import { useState, useEffect } from 'react'

interface Song {
  title: string
  artist: string
  embedCode: string
}

const songOfTheDay: Song = {
  title: "Get You (feat. Kali Uchis)",
  artist: "Daniel Caesar",
  embedCode: "https://embed.music.apple.com/us/album/get-you-feat-kali-uchis/1265893523?i=1265893529"
}

export function MusicPlayer() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="bg-blue-100 p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-4 text-blue-600 font-playfair">Song of the Day</h3>
      <div className="space-y-2 mb-4">
        <p className="font-semibold text-pink-600">{songOfTheDay.title}</p>
        <p className="text-sm text-blue-500">{songOfTheDay.artist}</p>
      </div>
      {isLoaded && (
        <div className="relative pt-[56.25%]">
          <iframe 
            allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" 
            frameBorder="0" 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              maxWidth: '660px',
              margin: '0 auto',
              borderRadius: '10px',
            }}
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" 
            src={songOfTheDay.embedCode}
          ></iframe>
        </div>
      )}
    </div>
  )
}

