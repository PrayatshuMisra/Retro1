import { NextResponse } from "next/server"
import { users } from "@/lib/auth"
import { simulateDelay } from "@/lib/api-utils"

// Get all users (excluding sensitive info)
export async function GET() {
  await simulateDelay()

  // Return users without passwords
  const safeUsers = users.map((user) => {
    const { password, ...safeUser } = user
    return safeUser
  })

  return NextResponse.json({ users: safeUsers })
}

// Create a new user
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.username || !body.password || !body.email) {
      return NextResponse.json({ error: "Username, password, and email are required" }, { status: 400 })
    }

    // Check if username already exists
    if (users.find((u) => u.username.toLowerCase() === body.username.toLowerCase())) {
      return NextResponse.json({ error: "Username already taken" }, { status: 400 })
    }

    await simulateDelay(1000)

    // Create new user
    const newUser = {
      id: (users.length + 1).toString(),
      username: body.username,
      password: body.password, // In a real app, this would be hashed
      email: body.email,
      joinDate: new Date().toLocaleDateString(),
      avatar: "/placeholder.svg?height=150&width=150",
      bio: body.bio || "Welcome to my profile!",
      location: body.location || "Cyberspace",
      interests: body.interests || "Web surfing",
      posts: 0,
      status: "Online",
    }

    // Add to users array
    users.push(newUser)

    // Return user without password
    const { password, ...safeUser } = newUser
    return NextResponse.json({ user: safeUser })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}

