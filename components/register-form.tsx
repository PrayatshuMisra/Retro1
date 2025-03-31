"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function RegisterForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!")
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long!")
      return
    }

    setLoading(true)

    try {
      // Get existing users from localStorage
      const storedUsers = localStorage.getItem("registeredUsers")
      const existingUsers = storedUsers ? JSON.parse(storedUsers) : []

      // Check if username already exists
      if (existingUsers.some((user: any) => user.username.toLowerCase() === formData.username.toLowerCase())) {
        setError("Username already taken!")
        setLoading(false)
        return
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        username: formData.username,
        email: formData.email,
        password: formData.password,
        joinDate: new Date().toLocaleDateString(),
        avatar: "/placeholder.svg?height=150&width=150",
        bio: "Welcome to my profile!",
        location: "Cyberspace",
        interests: "Web surfing",
        posts: 0,
        status: "Online",
      }

      // Add to users array and save to localStorage
      existingUsers.push(newUser)
      localStorage.setItem("registeredUsers", JSON.stringify(existingUsers))

      // Store current user info in localStorage
      const { password, ...safeUser } = newUser
      localStorage.setItem("user", JSON.stringify(safeUser))

      // Also try the API call as a fallback
      try {
        await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
        })
      } catch (apiError) {
        console.error("API registration failed, but local registration succeeded", apiError)
      }

      // Redirect to profile page
      router.push("/profile")
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border-4 border-green-700 p-6 rounded-lg shadow-[0.5rem_0.5rem_0px_#000] max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-green-700 mb-4 underline text-center">Join RetroConnect!</h2>

      {error && <div className="bg-red-100 border-2 border-red-500 text-red-700 p-3 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-bold mb-1">Choose a Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border-2 border-gray-500 p-2 rounded"
            required
          />
          <p className="text-xs text-gray-600 mt-1">Letters, numbers, and underscores only. No spaces.</p>
        </div>

        <div>
          <label className="block font-bold mb-1">Email Address:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border-2 border-gray-500 p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-bold mb-1">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border-2 border-gray-500 p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-bold mb-1">Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border-2 border-gray-500 p-2 rounded"
            required
          />
        </div>

        <div className="flex items-center">
          <input type="checkbox" className="mr-2 h-4 w-4" required />
          <span>
            I agree to the{" "}
            <a href="#" className="text-blue-600 underline">
              Terms of Service
            </a>
          </span>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold py-2 px-4 border-4 border-purple-900 rounded-lg shadow-[0.25rem_0.25rem_0px_#000] hover:translate-y-1 transition-transform w-full"
        >
          {loading ? "Creating Account..." : "CREATE MY ACCOUNT!"}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p>Already have an account?</p>
        <a href="/login" className="text-blue-600 underline font-bold">
          Log in here!
        </a>
      </div>

      <div className="mt-6 border-t-2 border-gray-300 pt-4">
        <h3 className="font-bold text-center mb-2">Why Join RetroConnect?</h3>
        <ul className="list-disc list-inside">
          <li>Connect with other 90s web enthusiasts</li>
          <li>Create your own customizable profile page</li>
          <li>Participate in our active message boards</li>
          <li>Share your favorite retro websites and games</li>
        </ul>
      </div>
    </Card>
  )
}