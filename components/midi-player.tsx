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

  const togglePlay = (event: React.MouseEvent) => {
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

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault()
    const startX = event.clientX - position.x
    const startY = event.clientY - position.y

    const handleMouseMove = (moveEvent: MouseEvent) => {
      setPosition({ x: moveEvent.clientX - startX, y: moveEvent.clientY - startY })
    }

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)
  }

  return (
    <div
      ref={buttonRef}
      onMouseDown={handleMouseDown}
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
