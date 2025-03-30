"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"

export function MidiPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [position, setPosition] = useState({ x: 50, y: 50 }) // Initial position
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const buttonRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const savedPosition = localStorage.getItem("musicButtonPosition")
    if (savedPosition) {
      setPosition(JSON.parse(savedPosition))
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = "" // Prevent memory leak
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("musicButtonPosition", JSON.stringify(position))
  }, [position])

  const togglePlay = (event: React.MouseEvent | React.TouchEvent) => {
    event.stopPropagation() // Prevent drag from interfering with click

    if (!audioRef.current) {
      audioRef.current = new Audio("/mario.mp3") // Replace with actual file path
      audioRef.current.loop = true
    }

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch((e) => console.error("Error playing audio:", e))
    }

    setIsPlaying(!isPlaying)
  }

  const handleDragStart = (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault()

    const startX = "touches" in event ? event.touches[0].clientX - position.x : event.clientX - position.x
    const startY = "touches" in event ? event.touches[0].clientY - position.y : event.clientY - position.y

    const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
      const clientX = "touches" in moveEvent ? moveEvent.touches[0].clientX : moveEvent.clientX
      const clientY = "touches" in moveEvent ? moveEvent.touches[0].clientY : moveEvent.clientY
      setPosition({ x: clientX - startX, y: clientY - startY })
    }

    const handleEnd = () => {
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("mouseup", handleEnd)
      window.removeEventListener("touchmove", handleMove)
      window.removeEventListener("touchend", handleEnd)
    }

    window.addEventListener("mousemove", handleMove)
    window.addEventListener("mouseup", handleEnd)
    window.addEventListener("touchmove", handleMove)
    window.addEventListener("touchend", handleEnd)
  }

  return (
    <div
      ref={buttonRef}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
      style={{
        left: position.x,
        top: position.y,
        position: "absolute",
        cursor: "grab",
        zIndex: 1000,
      }}
      className="bg-black border-2 border-yellow-500 p-2 rounded-lg shadow-lg flex items-center space-x-2"
    >
      <Button
        onClick={togglePlay}
        className={`w-8 h-8 flex items-center justify-center rounded-full ${
          isPlaying ? "bg-red-500" : "bg-green-500"
        }`}
      >
        {isPlaying ? "■" : "▶"}
      </Button>
      <div className="text-white text-xs">{isPlaying ? "Mario Theme" : "Play Music"}</div>
    </div>
  )
}
