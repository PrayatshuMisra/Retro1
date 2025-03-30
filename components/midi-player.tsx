"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"

export function MidiPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = "" // Prevent memory leak
      }
    }
  }, [])

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/mario.mp3") // Replace with actual file path
      audioRef.current.loop = true // Loop the music
    }

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch((e) => console.error("Error playing audio:", e))
    }

    setIsPlaying(!isPlaying)
  }

  return (
    <div className="fixed bottom-4 right-4 z-10">
      <div className="bg-black border-2 border-yellow-500 p-2 rounded-lg shadow-lg flex items-center space-x-2">
        <Button
          onClick={togglePlay}
          className={`w-8 h-8 flex items-center justify-center rounded-full ${
            isPlaying ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {isPlaying ? "■" : "▶"}
        </Button>
        <div className="text-white text-xs">{isPlaying ? "Now Playing: Mario Theme" : "Play Background Music"}</div>
      </div>
    </div>
  )
}
