'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

const LeafletMap = dynamic(
  () => import('./leaflet-map'),
  { 
    loading: () => <p>Loading map...</p>,
    ssr: false
  }
)

export function LoveMap() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-pink-600 font-playfair">Our Love Map</h2>
      <div className="h-[400px] rounded-lg overflow-hidden">
        <LeafletMap />
      </div>
    </div>
  )
}

