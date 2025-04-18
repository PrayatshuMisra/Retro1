"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

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
  postContent?: string[]
}

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editedUser, setEditedUser] = useState<User | null>(null)
  const [newPost, setNewPost] = useState("")
  const [activeTab, setActiveTab] = useState("profile")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Add these state variables after the existing useState declarations
  const [showGuestbookForm, setShowGuestbookForm] = useState(false)
  const [guestbookMessage, setGuestbookMessage] = useState("")
  const [guestbookEntries, setGuestbookEntries] = useState([
    {
      id: "1",
      author: "WebMaster2000",
      date: "3/25/1999",
      message: "Cool profile page! Love the design!",
    },
    {
      id: "2",
      author: "PixelArtist",
      date: "3/20/1999",
      message: "Thanks for the friend request! Your site rocks!",
    },
  ])
  const [showPhotoUpload, setShowPhotoUpload] = useState(false)
  const [photos, setPhotos] = useState([
    { id: "1", url: "/comp.jpg?height=100&width=100", caption: "My Computer" },
    { id: "2", url: "/gaming.webp?height=100&width=100", caption: "Gaming Setup" },
    { id: "3", url: "/cds.jpg?height=100&width=100", caption: "CD Collection" },
  ])
  const [newPhotoCaption, setNewPhotoCaption] = useState("")
  const [newPhotoUrl, setNewPhotoUrl] = useState("")

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

  const handleEditProfile = () => {
    setEditedUser({ ...user!})
    setIsEditModalOpen(true)
  }

  const handleSaveProfile = () => {
    if (!editedUser) return

    // Update user in localStorage
    localStorage.setItem("user", JSON.stringify(editedUser))

    // Update state
    setUser(editedUser)
    setIsEditModalOpen(false)

    // Show success message
    alert("Profile updated successfully!")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (editedUser) {
      setEditedUser({ ...editedUser, [name]: value })
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !editedUser) return

    // Use FileReader to convert image to data URL
    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result && editedUser) {
        setEditedUser({ ...editedUser, avatar: event.target.result as string })
      }
    }
    reader.readAsDataURL(file)
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleAddPost = () => {
    if (!newPost.trim() || !user) return

    const updatedUser = { ...user }
    const posts = updatedUser.postContent || []
    updatedUser.postContent = [newPost, ...posts]
    updatedUser.posts = (updatedUser.posts || 0) + 1

    // Update user in localStorage
    localStorage.setItem("user", JSON.stringify(updatedUser))

    // Update state
    setUser(updatedUser)
    setNewPost("")

    // Show success message
    alert("Post added successfully!")
  }

  // Add these handler functions before the return statement
  const handleGuestbookSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!guestbookMessage.trim()) return

    const newEntry = {
      id: Date.now().toString(),
      author: "You",
      date: new Date().toLocaleDateString(),
      message: guestbookMessage,
    }

    setGuestbookEntries([newEntry, ...guestbookEntries])
    setGuestbookMessage("")
    setShowGuestbookForm(false)
  }

  const handlePhotoUpload = () => {
    if (!newPhotoCaption.trim() || !newPhotoUrl) {
      alert("Please upload a photo and add a caption!")
      return
    }

    const newPhoto = {
      id: Date.now().toString(),
      url: newPhotoUrl,
      caption: newPhotoCaption,
    }

    setPhotos([...photos, newPhoto])
    setNewPhotoCaption("")
    setNewPhotoUrl("")
    setShowPhotoUpload(false)
  }

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
    <div className="min-h-screen bg-teal-300 text-purple-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4 border-b-8 border-black text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-yellow-300 drop-shadow-[0.2rem_0.2rem_0px_#000]">
          PixelConnect
        </h1>
        <p className="text-white text-xl mt-2">My Profile Page</p>
      </header>

      {/* Main content */}
      <main className="container mx-auto p-4">
        <div className="bg-white border-4 border-purple-700 p-4 rounded-lg shadow-[0.5rem_0.5rem_0px_#000] mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-purple-700 underline">{user.username}'s Profile</h2>
            <div className="flex space-x-2">
              <Link href="/">
                <Button className="bg-blue-500 text-white font-bold py-1 px-4 border-2 border-blue-900 rounded">
                  Back to Home
                </Button>
              </Link>
              <Button
                onClick={() => {
                  localStorage.removeItem("user")
                  router.push("/login")
                }}
                className="bg-red-500 text-white font-bold py-1 px-4 border-2 border-red-900 rounded"
              >
                Log Out
              </Button>
            </div>
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
                  <img src="/mus.webp?height=20&width=20" alt="Star" className="h-5 w-5" />
                  <img src="/ntbk.jpg?height=20&width=20" alt="Star" className="h-5 w-5" />
                  <img src="/bur.webp?height=20&width=20" alt="Star" className="h-5 w-5" />
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
                <Button
                  onClick={handleEditProfile}
                  className="bg-gradient-to-r from-green-500 to-green-700 text-white font-bold py-1 px-4 border-2 border-green-900 rounded mt-4 w-full hover:translate-y-1 transition-transform"
                >
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
                  <li className="underline cursor-pointer"><a href="https://www.netflix.com/in/browse/genre/2691941">Nostalgic 90s movies Collection</a></li>
                  <li className="underline cursor-pointer"><a href="https://90kids.com/games/">Cool 90s Games Archive</a></li>
                  <li className="underline cursor-pointer"><a href="https://www.my90splaylist.com/">Best Music Collection</a></li>
                  <li className="underline cursor-pointer"><a href="https://www.w3.org/TR/html401/intro/intro.html">Resource to HTML 4</a></li>
                  </ul>
                </div>
              </div>

              {/* User Posts Section */}
              {user.postContent && user.postContent.length > 0 && (
                <div className="border-4 border-orange-500 p-4 rounded-lg bg-orange-100 mb-6">
                  <h3 className="text-xl font-bold text-orange-700 underline mb-2">My Posts</h3>
                  <div className="space-y-3">
                    {user.postContent.map((post, index) => (
                      <div key={index} className="bg-white border-2 border-gray-300 p-3 rounded">
                        <div className="flex justify-between">
                          <span className="font-bold text-blue-600">{user.username}</span>
                          <span className="text-sm text-gray-600">{new Date().toLocaleDateString()}</span>
                        </div>
                        <p className="mt-1">{post}</p>
                        <div className="flex items-center mt-2 text-sm text-gray-600">
                          <span className="cursor-pointer hover:text-blue-600">Like</span>
                          <span className="mx-2">•</span>
                          <span className="cursor-pointer hover:text-blue-600">Comment</span>
                          <span className="mx-2">•</span>
                          <span className="cursor-pointer hover:text-blue-600">Share</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Guestbook section */}
              <div className="border-4 border-green-500 p-4 rounded-lg bg-green-100 mb-6">
                <h3 className="text-xl font-bold text-green-700 underline mb-2">My Guestbook</h3>
                <div className="space-y-3">
                  {guestbookEntries.map((entry) => (
                    <div key={entry.id} className="bg-white border-2 border-gray-300 p-3 rounded">
                      <div className="flex justify-between">
                        <span className="font-bold text-blue-600 underline">{entry.author}</span>
                        <span className="text-sm text-gray-600">{entry.date}</span>
                      </div>
                      <p className="mt-1">{entry.message}</p>
                    </div>
                  ))}
                </div>

                {showGuestbookForm ? (
                  <div className="mt-4 bg-gray-200 border-2 border-gray-400 p-3 rounded">
                    <h4 className="font-bold mb-2">Sign the Guestbook:</h4>
                    <form onSubmit={handleGuestbookSubmit} className="space-y-2">
                      <div>
                        <label className="block">Your Message:</label>
                        <textarea
                          value={guestbookMessage}
                          onChange={(e) => setGuestbookMessage(e.target.value)}
                          className="w-full border-2 border-gray-500 p-1 rounded h-20"
                          required
                        ></textarea>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          type="submit"
                          className="bg-gradient-to-r from-green-500 to-green-700 text-white font-bold py-1 px-4 border-2 border-green-900 rounded"
                        >
                          Submit
                        </Button>
                        <Button
                          type="button"
                          onClick={() => setShowGuestbookForm(false)}
                          className="bg-gray-500 text-white font-bold py-1 px-4 border-2 border-gray-700 rounded"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="mt-4">
                    <Button
                      onClick={() => setShowGuestbookForm(true)}
                      className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-1 px-4 border-2 border-blue-900 rounded"
                    >
                      Sign Guestbook
                    </Button>
                  </div>
                )}
              </div>

              {/* Photo Gallery */}
              <div className="border-4 border-purple-500 p-4 rounded-lg bg-purple-100">
                <h3 className="text-xl font-bold text-purple-700 underline mb-2">My Photo Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {photos.map((photo) => (
                    <div key={photo.id} className="border-2 border-yellow-500 p-2 bg-white">
                      <img src={photo.url || "/placeholder.svg"} alt={photo.caption} className="w-full h-auto" />
                      <p className="text-center text-sm mt-1">{photo.caption}</p>
                    </div>
                  ))}
                </div>

                {showPhotoUpload ? (
                  <div className="mt-4 bg-gray-200 border-2 border-gray-400 p-3 rounded">
                    <h4 className="font-bold mb-2">Add a New Photo:</h4>
                    <div className="space-y-2">
                      <div>
                        <label className="block">Upload Photo:</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              const reader = new FileReader()
                              reader.onload = (event) => {
                                if (event.target?.result) {
                                  setNewPhotoUrl(event.target.result as string)
                                }
                              }
                              reader.readAsDataURL(file)
                            }
                          }}
                          className="w-full border-2 border-gray-500 p-1 rounded"
                          required
                        />
                      </div>
                      <div>
                        <label className="block">Photo Caption:</label>
                        <input
                          type="text"
                          value={newPhotoCaption}
                          onChange={(e) => setNewPhotoCaption(e.target.value)}
                          className="w-full border-2 border-gray-500 p-1 rounded"
                          required
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          onClick={handlePhotoUpload}
                          className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white font-bold py-1 px-4 border-2 border-yellow-900 rounded"
                        >
                          Add Photo
                        </Button>
                        <Button
                          onClick={() => {
                            setShowPhotoUpload(false)
                            setNewPhotoUrl("")
                          }}
                          className="bg-gray-500 text-white font-bold py-1 px-4 border-2 border-gray-700 rounded"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center mt-4">
                    <Button
                      onClick={() => setShowPhotoUpload(true)}
                      className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white font-bold py-1 px-4 border-2 border-yellow-900 rounded"
                    >
                      Add Photos
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Edit Profile Modal */}
          <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogContent className="bg-white border-4 border-purple-700 p-4 rounded-lg shadow-[0.5rem_0.5rem_0px_#000] max-w-3xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-purple-700 underline text-center">
                  Edit Your Profile
                </DialogTitle>
              </DialogHeader>

              {editedUser && (
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="profile" className="bg-blue-200 border-2 border-blue-500 font-bold">
                      Profile Info
                    </TabsTrigger>
                    <TabsTrigger value="photo" className="bg-green-200 border-2 border-green-500 font-bold">
                      Profile Photo
                    </TabsTrigger>
                    <TabsTrigger value="post" className="bg-red-200 border-2 border-red-500 font-bold">
                      Make a Post
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="profile" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="bio" className="font-bold">
                          About Me:
                        </Label>
                        <Textarea
                          id="bio"
                          name="bio"
                          value={editedUser.bio}
                          onChange={handleInputChange}
                          className="border-2 border-gray-500 p-2 rounded w-full h-32"
                        />
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="location" className="font-bold">
                            Location:
                          </Label>
                          <Input
                            id="location"
                            name="location"
                            value={editedUser.location}
                            onChange={handleInputChange}
                            className="border-2 border-gray-500 p-2 rounded w-full"
                          />
                        </div>

                        <div>
                          <Label htmlFor="interests" className="font-bold">
                            Interests:
                          </Label>
                          <Input
                            id="interests"
                            name="interests"
                            value={editedUser.interests}
                            onChange={handleInputChange}
                            className="border-2 border-gray-500 p-2 rounded w-full"
                          />
                        </div>

                        <div>
                          <Label htmlFor="status" className="font-bold">
                            Status:
                          </Label>
                          <select
                            id="status"
                            name="status"
                            value={editedUser.status}
                            onChange={handleInputChange as any}
                            className="border-2 border-gray-500 p-2 rounded w-full"
                          >
                            <option value="Online">Online</option>
                            <option value="Away">Away</option>
                            <option value="Busy">Busy</option>
                            <option value="Offline">Offline</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="photo" className="space-y-4">
                    <div className="flex flex-col items-center">
                      <div className="mb-4 relative">
                        <img
                          src={editedUser.avatar || "/placeholder.svg?height=200&width=200"}
                          alt="Profile avatar"
                          className="border-4 border-yellow-500 rounded-full h-48 w-48 object-cover"
                        />
                      </div>

                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                      />

                      <Button
                        onClick={triggerFileInput}
                        className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-2 px-4 border-4 border-blue-900 rounded-lg shadow-[0.25rem_0.25rem_0px_#000] hover:translate-y-1 transition-transform"
                      >
                        Upload New Photo
                      </Button>

                      <p className="text-sm text-gray-600 mt-2">
                        Click the button to upload a new profile photo. Supported formats: JPG, PNG, GIF.
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="post" className="space-y-4">
                    <div>
                      <Label htmlFor="newPost" className="font-bold">
                        Write a New Post:
                      </Label>
                      <Textarea
                        id="newPost"
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        className="border-2 border-gray-500 p-2 rounded w-full h-32"
                        placeholder="What's on your mind? Share it with the RetroConnect community!"
                      />
                    </div>

                    <Button
                      onClick={handleAddPost}
                      className="bg-gradient-to-r from-red-500 to-red-700 text-white font-bold py-2 px-4 border-4 border-red-900 rounded-lg shadow-[0.25rem_0.25rem_0px_#000] hover:translate-y-1 transition-transform"
                    >
                      Post to Your Profile
                    </Button>
                  </TabsContent>
                </Tabs>
              )}

              <DialogFooter className="flex justify-between mt-4 pt-4 border-t-2 border-gray-300">
                <Button
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-500 text-white font-bold py-2 px-4 border-2 border-gray-700 rounded"
                >
                  Cancel
                </Button>

                <Button
                  onClick={handleSaveProfile}
                  className="bg-gradient-to-r from-green-500 to-green-700 text-white font-bold py-2 px-4 border-4 border-green-900 rounded-lg shadow-[0.25rem_0.25rem_0px_#000] hover:translate-y-1 transition-transform"
                >
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4 border-t-8 border-black text-center text-white mt-8">
        <p>© 1999 PixelConnect - Best viewed with Netscape Navigator 4.0 or Internet Explorer 5.0</p>
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
        <p className="mt-2 text-sm">
          This page has been visited <span className="font-bold">1,337</span> times since March 1999
        </p>
      </footer>
    </div>
  )
}

