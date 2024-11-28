'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Button } from "@/components/ui/button"

const LeafletMap = dynamic(() => import('./leaflet-map'), { 
  loading: () => <p>Loading map...</p>,
  ssr: false
})

interface MapLocation {
  id: string;
  name: string;
  description: string;
  media: string;
  coords: [number, number];
}

const mapLocations: MapLocation[] = [
  {
    id: 'haraz',
    name: 'Haraz',
    description: 'You recorded this video when we were driving around after Haraz',
    media: '/haraz.MOV',
    coords: [29.5834801863353, -95.6488065312987]
  },
  {
    id: 'pumpkin-patch',
    name: 'Our Trip to the Pumpkin Patch',
    description: 'You looked so beautiful on this day, hair, outfit, absolutely amazing.',
    media: '/pumpkin-patch.jpg',
    coords: [29.75336126300428, -95.35992303270234]
  },
  {
    id: 'fort-bend-fair',
    name: 'The Fort Bend County Fair',
    description: 'I had a lot of fun, although getting sick halfway through and not being able to win you your plushie was unfortunate. I will win you one next time we go. ',
    media: '/fair.jpeg',
    coords: [29.52005925718232, -95.81047194620369]
  },
  {
    id: 'kemah-boardwalk',
    name: 'Kemah Boardwalk',
    description: 'Where the drinks most definitely got to me, but you took care of me and I would not have rather spent this time with anyone else.',
    media: '/kemah.MOV',
    coords: [29.544063340051373, -95.02080925784922]
  },
  {
    id: 'crumbl',
    name: 'Crumbl',
    description: 'Our almost weekly trip for the most inconsistent cookie ratings ever. Sometimes they are amazing and other times they are not.',
    media: '/crumbl.jpg',
    coords: [29.59337703165322, -95.62211249037821]
  },
  {
    id: 'nobu',
    name: 'Nobu',
    description: 'The place I plan on taking you every year for our anniversary.',
    media: '/nobuu.jpg',
    coords: [29.73970201556449, -95.46545195969055]
  },
  {
    id: 'gyro-hut',
    name: 'Gyro Hut',
    description: 'A place that you told me about, and I\'ll never forget. Simple food, meaningful conversations.',
    media: '/gyro.MOV',
    coords: [29.586604893182145, -95.64573827503698]
  },
  {
    id: 'hoco-night',
    name: 'Hoco Night',
    description: 'I will never get over how beautiful you looked. While the afterparty may have had some complications, you made everything worth it.',
    media: '/hoco-night.jpg',
    coords: [29.71806822309014, -95.40540904259949]
  },
  {
    id: 'july4',
    name: 'July 4th',
    description: 'The prettiest fireworks with the prettiest girl.',
    media: '/july4th.jpg',
    coords: [29.569979716401203, -95.6573933976629]
  },
  {
    id: 'kwality',
    name: 'Kwality Ice Cream',
    description: 'Our go-to ice cream spot for our favorite coffee ice cream.',
    media: '/kwality.jpg',
    coords: [29.587287030606632, -95.64764607674249]
  }
]

export function LoveMap() {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null)
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set())

  const isVideo = (file: string) => {
    return file.toLowerCase().endsWith('.mov') || file.toLowerCase().endsWith('.mp4')
  }

  // Preload images
  useEffect(() => {
    mapLocations.forEach(location => {
      if (!isVideo(location.media) && !preloadedImages.has(location.media)) {
        const img = new window.Image()
        img.crossOrigin = "anonymous"
        img.src = location.media
        setPreloadedImages(prev => new Set(Array.from(prev).concat(location.media)))
      }
    })
  }, [preloadedImages])

  const handleLocationClick = (location: MapLocation) => {
    setSelectedLocation(location)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md overflow-hidden">
      <h2 className="text-2xl font-bold mb-4 text-pink-600 font-playfair">Our Love Map</h2>
      <p className="text-sm text-gray-600 mb-4">Click on a location to explore our special places!</p>
      <div className="flex gap-4">
        <div className="w-1/4 space-y-2">
          {mapLocations.map((location) => (
            <Button
              key={location.id}
              onClick={() => handleLocationClick(location)}
              className="w-full justify-start text-left"
              variant={selectedLocation?.id === location.id ? "secondary" : "outline"}
            >
              {location.name}
            </Button>
          ))}
        </div>
        <div className="w-1/2 h-[600px] rounded-xl overflow-hidden">
          <LeafletMap selectedLocation={selectedLocation} />
        </div>
        {selectedLocation && (
          <div className="w-1/4 bg-gradient-to-br from-pink-50 to-purple-50 p-4 rounded-xl shadow-lg flex flex-col h-[600px]">
            <h3 className="text-lg font-semibold mb-2 text-pink-600">{selectedLocation.name}</h3>
            <div className="rounded-lg overflow-hidden mb-2 flex-shrink-0">
              {isVideo(selectedLocation.media) ? (
                <video 
                  src={selectedLocation.media} 
                  className="w-full h-auto max-h-[300px] object-contain" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                />
              ) : (
                <Image
                  src={selectedLocation.media}
                  alt={selectedLocation.name}
                  width={200}
                  height={150}
                  className="w-full h-auto max-h-[300px] object-contain"
                  priority
                />
              )}
            </div>
            <div className="flex-grow overflow-auto mt-2">
              <p className="text-sm text-gray-600">
                {selectedLocation.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

