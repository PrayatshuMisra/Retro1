import { NextResponse } from "next/server"
import { login } from "@/lib/auth"
import { simulateDelay } from "@/lib/api-utils"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.username || !body.password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 })
    }

    await simulateDelay(800)

    // Attempt login
    const result = await login(body.username, body.password)

    if (result.success) {
      return NextResponse.json({ user: result.user })
    } else {
      return NextResponse.json({ error: result.error }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}

