"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function LoginForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: "",
    password: "",
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
    setLoading(true)

    try {
      // Call the login API endpoint
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        // Store user info in localStorage for demo purposes
        // In a real app, you'd use a proper auth solution
        localStorage.setItem("user", JSON.stringify(data.user))

        // Redirect to profile page
        router.push("/profile")
      } else {
        setError(data.error || "Invalid username or password. Try CoolUser99/password123")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border-4 border-blue-700 p-6 rounded-lg shadow-[0.5rem_0.5rem_0px_#000] max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-4 underline text-center">Login to PixelConnect</h2>

      {error && <div className="bg-red-100 border-2 border-red-500 text-red-700 p-3 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-bold mb-1">Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
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

        <div className="flex justify-between items-center">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2 h-4 w-4" />
            <span>Remember me</span>
          </label>

          <a href="#" className="text-blue-600 underline">
            Forgot password?
          </a>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-green-500 to-green-700 text-white font-bold py-2 px-4 border-4 border-green-900 rounded-lg shadow-[0.25rem_0.25rem_0px_#000] hover:translate-y-1 transition-transform w-full"
        >
          {loading ? "Logging in..." : "LOGIN"}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p>Don't have an account?</p>
        <a href="/register" className="text-blue-600 underline font-bold">
          Sign up now!
        </a>
      </div>

      <div className="mt-6 border-t-2 border-gray-300 pt-4 text-center">
        <p className="text-sm text-gray-600">By logging in, you agree to our totally radical terms of service.</p>
      </div>
    </Card>
  )
}

