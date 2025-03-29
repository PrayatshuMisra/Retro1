import { NextResponse } from "next/server"

// In a real application, this would call an actual weather API
// For now, we'll simulate a weather API response
export async function GET() {
  try {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate random weather data
    const conditions = ["Sunny", "Cloudy", "Rainy", "Stormy", "Windy", "Partly Cloudy"]
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)]
    const randomTemp = Math.floor(Math.random() * 30) + 60 // 60-90°F

    // Return simulated weather data
    return NextResponse.json({
      location: "Cyberspace",
      temperature: randomTemp,
      condition: randomCondition,
      humidity: Math.floor(Math.random() * 50) + 30, // 30-80%
      updated: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 })
  }
}

