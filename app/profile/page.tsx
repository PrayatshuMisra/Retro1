"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface User {
  id: string
  username: string
  email: string
  joinDate: string
  avatar: string
  bio: string
  location: string
  interests: string
  posts: number
  status: string
}

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user")

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      // Redirect to login if not logged in
      router.push("/login")
    }

    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-teal-300 flex items-center justify-center">
        <div className="text-2xl font-bold text-purple-900">Loading profile...</div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-teal-300 text-purple-900 font-['Comic_Sans_MS',_cursive]">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4 border-b-8 border-black text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-yellow-300 drop-shadow-[0.2rem_0.2rem_0px_#000]">
          RetroConnect
        </h1>
        <p className="text-white text-xl mt-2">My Profile Page</p>
      </header>

      {/* Main content */}
      <main className="container mx-auto p-4">
        <div className="bg-white border-4 border-purple-700 p-4 rounded-lg shadow-[0.5rem_0.5rem_0px_#000] mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-purple-700 underline">{user.username}'s Profile</h2>
            <Link href="/">
              <Button className="bg-blue-500 text-white font-bold py-1 px-4 border-2 border-blue-900 rounded">
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile sidebar */}
            <div className="md:col-span-1">
              <div className="border-4 border-blue-500 p-4 rounded-lg bg-blue-100 text-center">
                <div className="mb-4">
                  <img
                    src={user.avatar || "/placeholder.svg?height=150&width=150"}
                    alt="Profile avatar"
                    className="mx-auto border-4 border-yellow-500 rounded-full h-36 w-36"
                  />
                </div>
                <h3 className="text-xl font-bold text-blue-800">{user.username}</h3>
                <p className="text-sm text-gray-600 mb-2">Member since: {user.joinDate}</p>
                <div className="flex justify-center space-x-2 mb-4">
                  <img src="/placeholder.svg?height=20&width=20" alt="Star" className="h-5 w-5" />
                  <img src="/placeholder.svg?height=20&width=20" alt="Star" className="h-5 w-5" />
                  <img src="/placeholder.svg?height=20&width=20" alt="Star" className="h-5 w-5" />
                </div>
                <div className="text-left space-y-2">
                  <div>
                    <span className="font-bold">Posts:</span> {user.posts}
                  </div>
                  <div>
                    <span className="font-bold">Status:</span> <span className="text-green-600">{user.status}</span>
                  </div>
                  <div>
                    <span className="font-bold">Location:</span> {user.location}
                  </div>
                  <div>
                    <span className="font-bold">Interests:</span> {user.interests}
                  </div>
                </div>
                <Button className="bg-gradient-to-r from-green-500 to-green-700 text-white font-bold py-1 px-4 border-2 border-green-900 rounded mt-4 w-full">
                  Edit Profile
                </Button>
              </div>
            </div>

            {/* Profile content */}
            <div className="md:col-span-2">
              {/* About Me section */}
              <div className="border-4 border-pink-500 p-4 rounded-lg bg-pink-100 mb-6">
                <h3 className="text-xl font-bold text-pink-700 underline mb-2">About Me</h3>
                <div className="bg-white border-2 border-gray-300 p-3 rounded">
                  <p className="mb-2">
                    {user.bio ||
                      "Hey there! I'm a total web enthusiast from the 90s! I love creating cool websites with flashy GIFs and bright colors!"}
                  </p>
                  <p>
                    When I'm not surfing the information superhighway, I'm playing Doom or listening to my favorite
                    tunes on my Walkman!
                  </p>
                </div>
                <div className="mt-4">
                  <h4 className="font-bold text-pink-700">My Favorite Links:</h4>
                  <ul className="list-disc list-inside ml-4 text-blue-600">
                    <li className="underline cursor-pointer">My Geocities Homepage</li>
                    <li className="underline cursor-pointer">Cool 90s Games Archive</li>
                    <li className="underline cursor-pointer">Best MIDI Music Collection</li>
                    <li className="underline cursor-pointer">Webmaster Resources</li>
                  </ul>
                </div>
              </div>

              {/* Guestbook section */}
              <div className="border-4 border-green-500 p-4 rounded-lg bg-green-100 mb-6">
                <h3 className="text-xl font-bold text-green-700 underline mb-2">My Guestbook</h3>
                <div className="space-y-3">
                  <div className="bg-white border-2 border-gray-300 p-3 rounded">
                    <div className="flex justify-between">
                      <span className="font-bold text-blue-600 underline">WebMaster2000</span>
                      <span className="text-sm text-gray-600">3/25/1999</span>
                    </div>
                    <p className="mt-1">Cool profile page! Love the design!</p>
                  </div>
                  <div className="bg-white border-2 border-gray-300 p-3 rounded">
                    <div className="flex justify-between">
                      <span className="font-bold text-blue-600 underline">PixelArtist</span>
                      <span className="text-sm text-gray-600">3/20/1999</span>
                    </div>
                    <p className="mt-1">Thanks for the friend request! Your site rocks!</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-1 px-4 border-2 border-blue-900 rounded">
                    Sign Guestbook
                  </Button>
                </div>
              </div>

              {/* Photo Gallery */}
              <div className="border-4 border-purple-500 p-4 rounded-lg bg-purple-100">
                <h3 className="text-xl font-bold text-purple-700 underline mb-2">My Photo Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="border-2 border-yellow-500 p-2 bg-white">
                    <img src="/placeholder.svg?height=100&width=100" alt="Gallery image 1" className="w-full h-auto" />
                    <p className="text-center text-sm mt-1">My Computer</p>
                  </div>
                  <div className="border-2 border-yellow-500 p-2 bg-white">
                    <img src="/placeholder.svg?height=100&width=100" alt="Gallery image 2" className="w-full h-auto" />
                    <p className="text-center text-sm mt-1">Gaming Setup</p>
                  </div>
                  <div className="border-2 border-yellow-500 p-2 bg-white">
                    <img src="/placeholder.svg?height=100&width=100" alt="Gallery image 3" className="w-full h-auto" />
                    <p className="text-center text-sm mt-1">CD Collection</p>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <Button className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white font-bold py-1 px-4 border-2 border-yellow-900 rounded">
                    Add Photos
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4 border-t-8 border-black text-center text-white mt-8">
        <p>© 1999 RetroConnect - Best viewed with Netscape Navigator 4.0 or Internet Explorer 5.0</p>
        <div className="flex justify-center space-x-4 mt-2">
          <img src="/placeholder.svg?height=40&width=40" alt="Netscape Now!" className="h-10" />
          <img src="/placeholder.svg?height=40&width=40" alt="Internet Explorer" className="h-10" />
          <img src="/placeholder.svg?height=40&width=40" alt="Made with HTML" className="h-10" />
        </div>
        <p className="mt-2 text-sm">
          This page has been visited <span className="font-bold">1,337</span> times since March 1999
        </p>
      </footer>
    </div>
  )
}

