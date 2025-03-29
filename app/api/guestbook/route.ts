import { NextResponse } from "next/server"

// In a real application, this would connect to a database
// For now, we'll use an in-memory array to simulate a database
const guestbookEntries = [
  {
    id: "1",
    name: "RadDude1995",
    message: "This site is totally tubular! Keep up the good work!",
    date: "4/20/1999",
    email: "raddude@aol.com",
    homepage: "http://geocities.com/raddude",
  },
  {
    id: "2",
    name: "CyberGirl2000",
    message: "Love the retro vibes! Reminds me of my first website on GeoCities!",
    date: "3/15/1999",
    email: "cybergirl@hotmail.com",
    homepage: "http://angelfire.com/cybergirl",
  },
  {
    id: "3",
    name: "WebSurfer42",
    message: "Awesome page! Added you to my bookmarks!",
    date: "2/28/1999",
    email: "websurfer@yahoo.com",
    homepage: "",
  },
]

export async function GET() {
  // Return all guestbook entries
  return NextResponse.json({ entries: guestbookEntries })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.message) {
      return NextResponse.json({ error: "Name and message are required" }, { status: 400 })
    }

    // Create a new entry
    const newEntry = {
      id: Date.now().toString(),
      name: body.name,
      message: body.message,
      date: new Date().toLocaleDateString(),
      email: body.email || "",
      homepage: body.homepage || "",
    }

    // Add to our "database"
    guestbookEntries.unshift(newEntry)

    // Return the new entry
    return NextResponse.json({ entry: newEntry })
  } catch (error) {
    return NextResponse.json({ error: "Failed to add guestbook entry" }, { status: 500 })
  }
}

