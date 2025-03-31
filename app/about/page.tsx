"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.message) {
      alert("Please fill out your name and message!")
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Show success message
      setSubmitSuccess(true)

      // Reset form
      setFormData({
        name: "",
        email: "",
        website: "",
        message: "",
      })

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 3000)
    } catch (error) {
      console.error("Error submitting guestbook entry:", error)
      alert("Failed to submit your message. Please try again!")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-teal-300 text-purple-900 font-['Comic_Sans_MS',_cursive]">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4 border-b-8 border-black text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-yellow-300 drop-shadow-[0.2rem_0.2rem_0px_#000]">
          PixelConnect
        </h1>
        <p className="text-white text-xl mt-2">About This Site</p>
      </header>

      {/* Main content */}
      <main className="container mx-auto p-4">
        <div className="bg-white border-4 border-purple-700 p-4 rounded-lg shadow-[0.5rem_0.5rem_0px_#000] mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-purple-700 underline">About PixelConnect</h2>
            <Link href="/">
              <Button className="bg-blue-500 text-white font-bold py-1 px-4 border-2 border-blue-900 rounded">
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3 flex justify-center">
              <img
                src="/img1.webp?height=300&width=300"
                alt="Retro computer"
                className="border-4 border-yellow-500 rounded-lg h-auto max-w-full"
              />
            </div>

            <div className="md:w-2/3">
              <h3 className="text-xl font-bold text-blue-700 mb-2">Welcome to my corner of the Web!</h3>
              <p className="mb-4">
                PixelConnect was created in 1999 (well, not really, but let's pretend!) as a place for internet
                enthusiasts to connect and share their love for all things digital. This website is a tribute to the
                early days of the internet, when websites were colorful, quirky, and full of personality!
              </p>
              <p className="mb-4">
                Back in the 90s, the internet was a wild frontier where anyone with a bit of HTML knowledge could create
                their own little space. Websites were filled with animated GIFs, visitor counters, guestbooks, and
                bright, clashing colors. It was a time of experimentation and fun!
              </p>
              <p>
                PixelConnect aims to capture that nostalgic feeling while incorporating modern web technologies behind
                the scenes. It's like stepping into a time machine, but with all the conveniences of today's internet!
              </p>

              <div className="mt-6 bg-yellow-200 border-2 border-yellow-600 p-3">
                <h4 className="font-bold">Site Features:</h4>
                <ul className="list-disc list-inside ml-4">
                  <li>Message Board for discussions</li>
                  <li>Personal Editable Profile Pages</li>
                  <li>Guestbook Entry</li>
                  <li>Weather Widget</li>
                  <li>Mario Theme Song to give the retro vibe</li>
                  <li>Visitor Counter</li>
                  <li>Photo Gallery</li>
                  <li>Popular 90s Retro Games</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t-2 border-gray-300 pt-6">
            <h3 className="text-xl font-bold text-green-700 mb-4">Technical Specifications</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-2 border-blue-500 p-3 rounded-lg bg-blue-100">
                <h4 className="font-bold text-blue-700 mb-2">Frontend Technologies:</h4>
                <ul className="list-disc list-inside ml-4">
                  <li>HTML 4.0 (just kidding, it's modern HTML!)</li>
                  <li>CSS (with Tailwind CSS for styling)</li>
                  <li>JavaScript (with React and Next.js)</li>
                  <li>Responsive design (works on modern devices)</li>
                  <li>TypeScript (for static typing and returning errors)</li>
                  <li>Gaming link (for retro gaming lovers)</li>
                  <li>Admin Rights and Actions</li>
                </ul>
              </div>

              <div className="border-2 border-green-500 p-3 rounded-lg bg-green-100">
                <h4 className="font-bold text-green-700 mb-2">Backend Technologies:</h4>
                <ul className="list-disc list-inside ml-4">
                  <li>Next.js API routes</li>
                  <li>Database for user profiles and posts</li>
                  <li>Database for managing users' profile updations</li>
                  <li>Weather API integration</li>
                  <li>User authentication system using password match etc.</li>
                  <li>Supabase database</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t-2 border-gray-300 pt-6">
            <h3 className="text-xl font-bold text-red-700 mb-4">Meet the Website Creator</h3>

            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="md:w-1/4">
                <img
                  src="/img2.jpg?height=200&width=200"
                  alt="Webmaster"
                  className="border-4 border-red-500 rounded-full h-auto max-w-full"
                />
              </div>

              <div className="md:w-3/4">
                <h4 className="font-bold text-xl mb-2">Prayatshu Misra</h4>
                <p className="italic mb-4">"Keeping the 90s web alive one GIF at a time!"</p>
                <p className="mb-4">
                  Hi there! I'm the creator of PixelConnect. I've been fascinated with the internet since I first heard
                  the sweet sound of a dial-up modem connecting to the World Wide Web. The 90s internet was a special
                  place, and I wanted to recreate that magic with modern tools.
                </p>
                <p>
                  When I'm not coding retro websites, I'm collecting vintage computers, playing classic video games, and
                  reminiscing about the good old days when downloading a single image took several minutes!
                </p>

                <div className="mt-4">
                  <Button className="bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold py-1 px-4 border-2 border-purple-900 rounded" onClick={() => window.location.href = 'mailto:prayatshumisra2005@gmail.com'}>
                    Contact Me
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Guestbook */}
        <div className="bg-white border-4 border-green-700 p-4 rounded-lg shadow-[0.5rem_0.5rem_0px_#000]">
          <h2 className="text-2xl font-bold text-green-700 mb-4 underline">Sign the Guestbook</h2>
          <p className="mb-4">
            Thanks for visiting PixelConnect! Please take a moment to sign the guestbook and let me know you were here!
          </p>

          <div className="bg-gray-200 border-2 border-gray-400 p-4 rounded">
            <h3 className="font-bold mb-2">Add your message:</h3>
            {submitSuccess ? (
              <div className="bg-green-100 border-2 border-green-500 text-green-700 p-3 rounded mb-4 animate-pulse">
                Thanks for signing the guestbook! Your message has been submitted.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
                <div>
                  <label className="block">Your Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-500 p-1 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block">Your Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-500 p-1 rounded"
                  />
                </div>
                <div>
                  <label className="block">Your Website:</label>
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-500 p-1 rounded"
                    placeholder="http://"
                  />
                </div>
                <div>
                  <label className="block">Your Message:</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-500 p-1 rounded h-20"
                    required
                  ></textarea>
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-red-500 to-red-700 text-white font-bold py-1 px-4 border-4 border-red-900 rounded-lg shadow-[0.25rem_0.25rem_0px_#000] hover:translate-y-1 transition-transform"
                >
                  {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
                </Button>
              </form>
            )}
          </div>
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
        <p className="mt-2 text-sm">
          Made with ❤️ by Prayatshu Misra (Team: ByteMe)
        </p>
      </footer>
    </div>
  )
}

