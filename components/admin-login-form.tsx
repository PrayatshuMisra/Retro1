"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface AdminLoginFormProps {
  onLogin: () => void
}

export function AdminLoginForm({ onLogin }: AdminLoginFormProps) {
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
      // Check admin credentials
      if (formData.username === "admin" && formData.password === "admin123") {
        // Set admin session in localStorage
        localStorage.setItem("adminSession", "true")

        // Call the onLogin callback
        onLogin()
      } else {
        setError("Invalid admin credentials. Please try again.")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border-4 border-purple-700 p-6 rounded-lg shadow-[0.5rem_0.5rem_0px_#000] max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-purple-700 mb-4 underline text-center">Admin Login</h2>
      <div className="bg-yellow-200 border-2 border-yellow-600 p-3 mb-4">
        <p className="font-bold">⚠️ Restricted Area ⚠️</p>
        <p>This area is for site administrators only. Unauthorized access is prohibited.</p>
      </div>

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

        <Button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold py-2 px-4 border-4 border-purple-900 rounded-lg shadow-[0.25rem_0.25rem_0px_#000] hover:translate-y-1 transition-transform w-full"
        >
          {loading ? "Authenticating..." : "LOGIN TO ADMIN PANEL"}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">Forgot your admin credentials? Contact the system administrator.</p>
      </div>
    </Card>
  )
}

