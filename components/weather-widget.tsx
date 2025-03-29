"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"

interface WeatherData {
  location: string
  temperature: number
  condition: string
  humidity: number
  updated: string
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true)
      setError("")

      try {
        // In a real app, this would fetch from a real weather API
        // For now, we'll use our simulated API
        const response = await fetch("/api/weather")

        if (!response.ok) {
          throw new Error("Failed to fetch weather data")
        }

        const data = await response.json()
        setWeather(data)
      } catch (err) {
        console.error("Error fetching weather:", err)
        setError("Weather data unavailable")
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()

    // Refresh every 5 minutes
    const interval = setInterval(fetchWeather, 300000)
    return () => clearInterval(interval)
  }, [])

  const handleRefresh = () => {
    setLoading(true)
    fetch("/api/weather")
      .then((res) => res.json())
      .then((data) => {
        setWeather(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error refreshing weather:", err)
        setError("Weather data unavailable")
        setLoading(false)
      })
  }

  // Get weather icon based on condition
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return "☀️"
      case "cloudy":
        return "☁️"
      case "partly cloudy":
        return "⛅"
      case "rainy":
        return "🌧️"
      case "stormy":
        return "⛈️"
      case "windy":
        return "💨"
      default:
        return "🌤️"
    }
  }

  return (
    <Card className="border-2 border-yellow-500 p-3 bg-gradient-to-b from-blue-300 to-blue-100">
      <h3 className="font-bold text-center text-blue-800 underline mb-2">Weather Widget</h3>

      {loading ? (
        <div className="text-center py-2">
          <p className="animate-pulse">Loading weather data...</p>
        </div>
      ) : error ? (
        <div className="text-center py-2 text-red-600">
          <p>{error}</p>
          <button onClick={handleRefresh} className="text-blue-600 underline text-sm mt-1">
            Try Again
          </button>
        </div>
      ) : (
        weather && (
          <div className="text-center">
            <div className="text-4xl mb-1">{getWeatherIcon(weather.condition)}</div>
            <div className="text-2xl font-bold">{weather.temperature}°F</div>
            <div>{weather.condition}</div>
            <div className="text-sm mt-1">Humidity: {weather.humidity}%</div>
            <div className="text-sm">{weather.location}</div>
            <button onClick={handleRefresh} className="text-xs text-blue-600 underline mt-2 cursor-pointer">
              Refresh
            </button>
          </div>
        )
      )}
    </Card>
  )
}

