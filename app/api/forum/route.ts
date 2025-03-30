import { NextResponse } from "next/server"

// In a real application, this would connect to a database
// For now, we'll use an in-memory array to simulate a database
const forumPosts = [
  {
    id: "1",
    title: "Welcome to RetroConnect!",
    author: "Prayatshu Misra",
    date: "3/28/1999",
    content:
      "Hello everyone! Welcome to RetroConnect, the coolest place on the web! Feel free to introduce yourselves and start posting!",
    category: "General Discussion",
    replies: 5,
    views: 42,
  },
  {
    id: "2",
    title: "Who's excited for the Y2K bug?",
    author: "TitaniumReborn",
    date: "3/27/1999",
    content:
      "So what do you all think will happen when the year 2000 hits? Will all computers stop working? I'm stocking up on canned food just in case!",
    category: "Tech Talk",
    replies: 12,
    views: 78,
  },
  {
    id: "3",
    title: "Just beat Doom on Nightmare difficulty!",
    author: "FragMaster",
    date: "3/26/1999",
    content:
      "Finally did it! Took me weeks but I managed to beat Doom on the hardest difficulty. Anyone else accomplished this feat?",
    category: "Retro Gaming",
    replies: 8,
    views: 36,
  },
  {
    id: "4",
    title: "Best Netscape plugins?",
    author: "SurfDude",
    date: "3/25/1999",
    content:
      "I'm looking for some cool Netscape Navigator plugins to enhance my browsing experience. Any recommendations?",
    category: "Tech Talk",
    replies: 3,
    views: 21,
  },
]

export async function GET() {
  // Return all forum posts
  return NextResponse.json({ posts: forumPosts })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.title || !body.author || !body.content || !body.category) {
      return NextResponse.json({ error: "Title, author, content, and category are required" }, { status: 400 })
    }

    // Create a new post
    const newPost = {
      id: Date.now().toString(),
      title: body.title,
      author: body.author,
      date: new Date().toLocaleDateString(),
      content: body.content,
      category: body.category,
      replies: 0,
      views: 1,
    }

    // Add to our "database"
    forumPosts.unshift(newPost)

    // Return the new post
    return NextResponse.json({ post: newPost })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create forum post" }, { status: 500 })
  }
}

