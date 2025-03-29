"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"

export function MidiPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)

  useEffect(() => {
    // Clean up function to stop audio when component unmounts
    return () => {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop()
        oscillatorRef.current.disconnect()
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  const togglePlay = () => {
    if (isPlaying) {
      // Stop playing
      if (oscillatorRef.current) {
        oscillatorRef.current.stop()
        oscillatorRef.current.disconnect()
        oscillatorRef.current = null
      }
      setIsPlaying(false)
    } else {
      try {
        // Create audio context if it doesn't exist
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
        }

        // Create a gain node for volume control
        gainNodeRef.current = audioContextRef.current.createGain()
        gainNodeRef.current.gain.value = 0.1 // Set volume to 10%
        gainNodeRef.current.connect(audioContextRef.current.destination)

        // Create an oscillator (simple tone generator)
        oscillatorRef.current = audioContextRef.current.createOscillator()
        oscillatorRef.current.type = "sine"
        oscillatorRef.current.frequency.setValueAtTime(440, audioContextRef.current.currentTime) // A4 note

        // Connect oscillator to gain node and start playing
        oscillatorRef.current.connect(gainNodeRef.current)
        oscillatorRef.current.start()

        setIsPlaying(true)
      } catch (e) {
        console.error("Error playing audio:", e)
      }
    }
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
        <div className="text-white text-xs">{isPlaying ? "Now Playing: 90s_tune.mid" : "Play Background Music"}</div>
      </div>
    </div>
  )
}

