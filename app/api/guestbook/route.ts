import { NextResponse } from "next/server"

// In a real application, this would connect to a database
// For now, we'll use an in-memory array to simulate a database
const guestbookEntries = [
  {
    id: "1",
    name: "Cristiano_Ronaldo_Siuuuu",
    message: "This site is really good! Keep it up! Siuuu!!!!",
    date: "4/20/1999",
    email: "mailto:raddude@aol.com",
    homepage: "http://geocities.com/raddude",
  },
  {
    id: "2",
    name: "Tony Stark",
    message: "Love the retro vibes! But I love my modern Jarvis.",
    date: "3/15/1999",
    email: "mailto:cybergirl@hotmail.com",
    homepage: "http://angelfire.com/cybergirl",
  },
  {
    id: "3",
    name: "MSD_7",
    message: "Awesome page! As quick as my skills behind the wickets :)",
    date: "2/28/1999",
    email: "mailto:websurfer@yahoo.com",
    homepage: "",
  },
  {
    id: "4",
    name: "Elon Musk",
    message: "Reminded me of my uni days. Wanna get hired and work for me!?",
    date: "8/12/1999",
    email: "mailto:cybergirl@hotmail.com",
    homepage: "http://angelfire.com/cybergirl",
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

