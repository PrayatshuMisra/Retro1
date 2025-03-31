"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AdminLoginForm } from "@/components/admin-login-form"
import AdminDashboard from "@/components/admin-dashboard"

interface AdminDashboardProps {
  onAction?: (action: string) => void
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const [actionMessage, setActionMessage] = useState<string | null>(null)
  const [showActionMessage, setShowActionMessage] = useState(false)

  useEffect(() => {
    const adminSession = localStorage.getItem("adminSession")
    if (adminSession === "true") {
      setIsLoggedIn(true)
    }
    setLoading(false)
  }, [])

  const handleLogin = () => {
    localStorage.setItem("adminSession", "true")
    setIsLoggedIn(true)
    handleAction("Admin login successful")
  }

  const handleLogout = () => {
    localStorage.removeItem("adminSession")
    setIsLoggedIn(false)
    handleAction("Admin logged out")
  }

  const handleAction = (action: string) => {
    setActionMessage(`Action performed: ${action}`)
    setShowActionMessage(true)
    setTimeout(() => setShowActionMessage(false), 3000)
  }

  return (
    <div className="min-h-screen bg-teal-300 text-purple-900">
      <header className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4 border-b-8 border-black text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-yellow-300 drop-shadow-[0.2rem_0.2rem_0px_#000]">
          RetroConnect
        </h1>
        <p className="text-white text-xl mt-2">Admin Dashboard</p>
      </header>

      <main className="container mx-auto p-4">
        <div className="bg-white border-4 border-purple-700 p-4 rounded-lg shadow-[0.5rem_0.5rem_0px_#000] mb-6">
          {showActionMessage && (
            <div className="bg-blue-100 border-2 border-blue-500 text-blue-700 p-3 rounded mb-4 animate-pulse">
              {actionMessage}
            </div>
          )}

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-purple-700 underline">
              {isLoggedIn ? "Admin Dashboard" : "Admin Login"}
            </h2>
            <div className="flex space-x-2">
              {isLoggedIn && (
                <Button
                  onClick={handleLogout}
                  className="bg-red-500 text-white font-bold py-1 px-4 border-2 border-red-900 rounded"
                >
                  Logout
                </Button>
              )}
              <Link href="/">
                <Button
                  onClick={() => handleAction("Returning to home page")}
                  className="bg-blue-500 text-white font-bold py-1 px-4 border-2 border-blue-900 rounded"
                >
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <p className="text-xl">Loading...</p>
            </div>
          ) : isLoggedIn ? (
            <AdminDashboard onAction={handleAction} />
          ) : (
            <AdminLoginForm onLogin={handleLogin} />
          )}
        </div>
      </main>

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