'use client'

import React, { useRef, useEffect } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface Location {
  id: string
  coords: [number, number]
  name: string
}

const locations: Location[] = [
  { id: 'haraz', coords: [29.5834801863353, -95.6488065312987], name: 'Our First Date Spot - Haraz' },
  { id: 'pumpkin-patch', coords: [29.75336126300428, -95.35992303270234], name: 'Our Trip to the Pumpkin Patch' },
  { id: 'fort-bend-fair', coords: [29.52005925718232, -95.81047194620369], name: 'The Fort Bend County Fair' },
  { id: 'kemah-boardwalk', coords: [29.544063340051373, -95.02080925784922], name: 'Kemah Boardwalk' },
  { id: 'crumbl', coords: [29.59337703165322, -95.62211249037821], name: 'Crumbl' },
  { id: 'nobu', coords: [29.73970201556449, -95.46545195969055], name: 'Nobu' },
  { id: 'gyro-hut', coords: [29.586604893182145, -95.64573827503698], name: 'Gyro Hut' },
  { id: 'hoco-night', coords: [29.71806822309014, -95.40540904259949], name: 'Hoco night' },
  { id: 'july4', coords : [29.569979716401203, -95.6573933976629], name: 'July 4th' },
  { id: 'kwality', coords: [29.587287030606632, -95.64764607674249], name: 'Kwality Ice Cream'}
]

const DEFAULT_CENTER: [number, number] = [29.7604, -95.3698]
const DEFAULT_ZOOM = 9

const defaultIcon = L.divIcon({
  className: 'custom-div-icon',
  html: "<div style='background-color:#c30b82;' class='marker-pin'></div>",
  iconSize: [30, 42],
  iconAnchor: [15, 42]
})

const selectedIcon = L.divIcon({
  className: 'custom-div-icon',
  html: "<div style='background-color:#00ff00;' class='marker-pin'></div><div class='marker-outline'></div>",
  iconSize: [40, 56],
  iconAnchor: [20, 56]
})

interface LeafletMapProps {
  selectedLocation: Location | null;
}

const LeafletMap: React.FC<LeafletMapProps> = ({ selectedLocation }) => {
  const mapRef = useRef<L.Map | null>(null)
  const markersRef = useRef<{ [key: string]: L.Marker }>({})

  useEffect(() => {
    if (typeof window === 'undefined') return

    if (!mapRef.current) {
      mapRef.current = L.map('map', {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        zoomControl: false
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current)


      locations.forEach(location => {
        const marker = L.marker(location.coords, { icon: defaultIcon })
          .addTo(mapRef.current!)
        markersRef.current[location.id] = marker
      })

      L.control.zoom({
        position: 'bottomright'
      }).addTo(mapRef.current)
    }

    // Update markers based on selected location
    Object.entries(markersRef.current).forEach(([id, marker]) => {
      if (selectedLocation && id === selectedLocation.id) {
        marker.setIcon(selectedIcon)
        marker.setZIndexOffset(1000)
      } else {
        marker.setIcon(defaultIcon)
        marker.setZIndexOffset(0)
      }
    })

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [selectedLocation])

  useEffect(() => {
    const styleElement = document.createElement('style')
    const style = `
      .marker-pin {
        width: 30px;
        height: 30px;
        border-radius: 50% 50% 50% 0;
        background: #c30b82;
        position: absolute;
        transform: rotate(-45deg);
        left: 50%;
        top: 50%;
        margin: -15px 0 0 -15px;
      }

      .marker-pin::after {
        content: '';
        width: 24px;
        height: 24px;
        margin: 3px 0 0 3px;
        background: #fff;
        position: absolute;
        border-radius: 50%;
      }

      .custom-div-icon {
        background: none;
        border: none;
      }

      .marker-outline {
        position: absolute;
        width: 40px;
        height: 40px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        left: 50%;
        top: 50%;
        margin: -20px 0 0 -20px;
        border: 4px solid #00ff00;
      }
    `
    styleElement.textContent = style
    document.head.appendChild(styleElement)
    return () => {
      document.head.removeChild(styleElement)
    }
  }, [])

  return <div id="map" style={{ width: '100%', height: '100%' }} />
}

export default LeafletMap

