'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default function LeafletMap() {
  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainerRef.current) return

    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView([29.753445093021266, -95.36004104989141], 10)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current)

      // Custom icon configuration
      const customIcon = L.icon({
        iconUrl: '/marker-icon.png',
        shadowUrl: '/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      })

      L.marker([29.5834801863353, -95.6488065312987], { icon: customIcon }).addTo(mapRef.current)
        .bindPopup('Our First Date Spot - Haraz')
        .openPopup()
      L.marker([29.75336126300428, -95.35992303270234], { icon: customIcon}).addTo(mapRef.current)
        .bindPopup('Our Trip to the Pumpkin Patch')
        .openPopup()
      L.marker([29.52005925718232, -95.81047194620369], { icon: customIcon}).addTo(mapRef.current)
        .bindPopup('The Fort Bend County Fair')
        .openPopup()
      L.marker([29.544063340051373, -95.02080925784922], { icon: customIcon}).addTo(mapRef.current)
        .bindPopup('Kemah Boardwalk, where the drinks most definitely got to me')
        .openPopup()
      L.marker([29.59337703165322, -95.62211249037821], { icon: customIcon}).addTo(mapRef.current)
        .bindPopup('Crumbl, our almost weekly trip')
        .openPopup()
      L.marker([29.73970201556449, -95.46545195969055], { icon: customIcon}).addTo(mapRef.current)
        .bindPopup('Nobu, the place I plan on taking you every year for our anniversary')
        .openPopup()
      L.marker([29.586604893182145, -95.64573827503698], { icon: customIcon}).addTo(mapRef.current)
        .bindPopup("Gyro Hut, a place that you told me about, and I'll never forget")
        .openPopup()
      L.marker([29.71806822309014, -95.40540904259949], { icon: customIcon}).addTo(mapRef.current)
        .bindPopup("Hoco night... I will never get over how beautiful you looked.")
        .openPopup()
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  return <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
}

