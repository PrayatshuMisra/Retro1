"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GuestbookEntry } from "@/components/guestbook-entry"
import { VisitorCounter } from "@/components/visitor-counter"
import { WeatherWidget } from "@/components/weather-widget"
import { HitCounter } from "@/components/hit-counter"
import { MidiPlayer } from "@/components/midi-player"

interface GuestbookEntryType {
  id: string
  name: string
  message: string
  date: string
  email?: string
  homepage?: string
}

export default function HomePage() {
  const [guestbookEntries, setGuestbookEntries] = useState<GuestbookEntryType[]>([
    {
      id: "1",
      name: "Cristiano_CR7",
      message: "This site is really good! Keep it up! Siuuuu!!!!",
      date: "4/20/1999",
      email: "mailto:prayatshumisra2005@gmail.com",
      homepage: "https://youtu.be/dQw4w9WgXcQ?si=LoXT3GAW86CrzIB2",
    },
    {
      id: "2",
      name: "Tony Stark",
      message: "Love the retro vibes! But I love my modern Jarvis!",
      date: "3/15/1999",
      email: "mailto:prayatshumisra2005@gmail.com",
      homepage: "https://youtu.be/dQw4w9WgXcQ?si=LoXT3GAW86CrzIB2",
    },
    {
      id: "3",
      name: "MSD_7",
      message: "Awesome page! As quick as my skills behind the wickets :)",
      date: "2/28/1999",
      email: "mailto:prayatshumisra2005@gmail.com",
      homepage: "https://youtu.be/dQw4w9WgXcQ?si=LoXT3GAW86CrzIB2",
    },
    {
      id: "4",
      name: "Elon Musk",
      message: "Reminded me of my uni days. Wanna get hired and work for me!?",
      date: "8/12/1999",
      email: "mailto:prayatshumisra2005@gmail.com",
      homepage: "https://youtu.be/dQw4w9WgXcQ?si=LoXT3GAW86CrzIB2",
    },
  ])

  const [newEntry, setNewEntry] = useState({
    name: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Load guestbook entries from API on initial load
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await fetch("/api/guestbook")
        if (response.ok) {
          const data = await response.json()
          if (data.entries && data.entries.length > 0) {
            setGuestbookEntries(data.entries)
          }
        }
      } catch (error) {
        console.error("Error fetching guestbook entries:", error)
      }
    }

    fetchEntries()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewEntry((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitGuestbook = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newEntry.name.trim() || !newEntry.message.trim()) {
      alert("Please fill out both name and message fields!")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/guestbook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEntry),
      })

      if (response.ok) {
        const data = await response.json()

        // Add the new entry to the list
        setGuestbookEntries((prev) => [data.entry, ...prev])

        // Clear the form
        setNewEntry({
          name: "",
          message: "",
        })

        alert("Thanks for signing the guestbook!")
      } else {
        alert("Failed to submit your guestbook entry. Please try again!")
      }
    } catch (error) {
      console.error("Error submitting guestbook entry:", error)
      alert("An error occurred. Please try again later!")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-teal-300 text-purple-900 font-['Comic_Sans_MS',_cursive] overflow-hidden">
      {/* Construction GIF Banner */}
      <div className="w-full bg-yellow-400 flex items-center justify-center p-2 border-b-4 border-yellow-600 marquee">
        <p className="text-red-600 font-bold text-lg animate-pulse">
          🚧 UNDER CONSTRUCTION 🚧 UNDER CONSTRUCTION 🚧 UNDER CONSTRUCTION 🚧
        </p>
      </div>

      {/* Header with animated text */}
      <header className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4 border-b-8 border-black text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-yellow-300 drop-shadow-[0.2rem_0.2rem_0px_#000] animate-bounce">
          RetroConnect
        </h1>
        <p className="text-white text-xl mt-2 rainbow-text">The coolest place on the World Wide Web!</p>
        <div className="mt-4 flex justify-center space-x-4">
          <VisitorCounter />
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white border-4 border-blue-700 p-4 rounded-lg shadow-[0.5rem_0.5rem_0px_#000]">
            <h2 className="text-2xl font-bold text-blue-700 mb-4 underline">Navigation</h2>
            <nav className="space-y-2">
              <div className="flex items-center">
                <img src="/home.png?height=20&width=20" alt="Home icon" className="mr-2 h-5 w-5" />
                <Link href="/" className="text-blue-600 hover:text-blue-800 underline">
                  Home Page
                </Link>
              </div>
              <div className="flex items-center">
                <img src="/message.webp?height=20&width=20" alt="Forum icon" className="mr-2 h-5 w-5" />
                <Link href="/forum" className="text-blue-600 hover:text-blue-800 underline">
                  Message Board
                </Link>
              </div>
              <div className="flex items-center">
                <img src="/mp.jpg?height=20&width=20" alt="Profile icon" className="mr-2 h-5 w-5" />
                <Link href="/profile" className="text-blue-600 hover:text-blue-800 underline">
                  My Profile
                </Link>
              </div>
              <div className="flex items-center">
                <img src="/aboutimg.png?height=20&width=20" alt="About icon" className="mr-2 h-5 w-5" />
                <Link href="/about" className="text-blue-600 hover:text-blue-800 underline">
                  About This Site
                </Link>
              </div>
              <div className="flex items-center">
                <img src="/ga.webp?height=20&width=20" alt="Games icon" className="mr-2 h-5 w-5" />
                <Link href="/games" className="text-blue-600 hover:text-blue-800 underline">
                  <span className="relative">
                    Retro Games
                    <span className="absolute -top-2 -right-10 bg-red-500 text-white text-xs px-1 rounded animate-pulse">
                      NEW!
                    </span>
                    <span className="absolute top-6 -right-32 text-black text-xs px-1 rounded">
                      (Games available only on Computers.)
                    </span>
                  </span>
                </Link>
              </div>
            </nav>



            <div className="mt-6">
              <WeatherWidget />
            </div>

            <div className="mt-6 border-t-2 border-gray-300 pt-4">
              <h3 className="font-bold text-center mb-2">Cool Links</h3>
              <ul className="list-disc list-inside text-blue-600">
                <li className="underline cursor-pointer"><a href="https://www.geocities.com" target="_blank" rel="noopener noreferrer">Geocities</a></li>
                <li className="underline cursor-pointer"><a href="https://sillydog.org/netscape/" target="_blank" rel="noopener noreferrer">Netscape</a></li>
                <li className="underline cursor-pointer"><a href="https://www.yahoo.com" target="_blank" rel="noopener noreferrer">Yahoo!</a></li>
                <li className="underline cursor-pointer"><a href="https://www.altavista.com" target="_blank" rel="noopener noreferrer">AltaVista</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="md:col-span-2">
          <div className="bg-white border-4 border-purple-700 p-4 rounded-lg shadow-[0.5rem_0.5rem_0px_#000]">
            <h2 className="text-2xl font-bold text-purple-700 mb-4 underline">Welcome to RetroConnect!</h2>
            <div className="flex justify-center mb-4">
              <img src="/retro_glitch.gif?height=200&width=400" alt="Welcome GIF" className="border-2 border-black" />
            </div>
            <p className="mb-4">
              👋 Hey there, web surfer! Welcome to RetroConnect, your new home on the information superhighway! This
              radical website is a blast from the past with all the modern bells and whistles.
            </p>
            <div className="bg-yellow-200 border-2 border-yellow-600 p-3 mb-4">
              <p className="font-bold blink">🔥 HOT NEWS 🔥</p>
              <p>RetroConnect just launched! Sign up now to reserve your cool username!</p>
            </div>
            <div className="flex justify-center space-x-4 mt-6">
              <Link href="/register">
                <Button className="bg-gradient-to-r from-green-500 to-green-700 text-white font-bold py-2 px-4 border-4 border-green-900 rounded-lg shadow-[0.25rem_0.25rem_0px_#000] hover:translate-y-1 transition-transform retro-button">
                  SIGN UP NOW!
                </Button>
              </Link>
              <Link href="/login">
                <Button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-2 px-4 border-4 border-blue-900 rounded-lg shadow-[0.25rem_0.25rem_0px_#000] hover:translate-y-1 transition-transform retro-button">
                  LOG IN
                </Button>
              </Link>
            </div>
          </div>

          {/* Guestbook section */}
          <div className="bg-white border-4 border-green-700 p-4 rounded-lg shadow-[0.5rem_0.5rem_0px_#000] mt-6">
            <h2 className="text-2xl font-bold text-green-700 mb-4 underline">Guestbook</h2>
            <p className="mb-4">Sign my guestbook to let me know you were here!</p>

            <div className="space-y-4 mb-6">
              {guestbookEntries.map((entry) => (
                <GuestbookEntry key={entry.id} name={entry.name} message={entry.message} date={entry.date} />
              ))}
            </div>

            <div className="bg-gray-200 border-2 border-gray-400 p-4 rounded">
              <h3 className="font-bold mb-2">Add your message:</h3>
              <form onSubmit={handleSubmitGuestbook} className="space-y-2">
                <div>
                  <label className="block">Your Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={newEntry.name}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-500 p-1 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block">Your Message:</label>
                  <textarea
                    name="message"
                    value={newEntry.message}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-500 p-1 rounded h-20"
                    required
                  ></textarea>
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-red-500 to-red-700 text-white font-bold py-1 px-4 border-4 border-red-900 rounded-lg shadow-[0.25rem_0.25rem_0px_#000] hover:translate-y-1 transition-transform retro-button"
                >
                  {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4 border-t-8 border-black text-center text-white mt-8">
      <p>© 1999 RetroConnect - Best viewed with Netscape Navigator 4.0 or Internet Explorer 5.0</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a 
            href="https://sillydog.org/netscape/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <img src="/netscape.png?height=40&width=40" alt="Netscape Now!" className="h-10" />
          </a>
          <a 
            href="https://www.microsoft.com/en-us/download/internet-explorer.aspx" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <img src="/exp.png?height=40&width=40" alt="Internet Explorer" className="h-10" />
          </a>
          <a 
            href="https://www.w3.org/html/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <img src="/htm.gif?height=40&width=40" alt="Made with HTML" className="h-10" />
          </a>
        </div>
        <HitCounter />
      </footer>

      <MidiPlayer />
    </div>
  )
}

