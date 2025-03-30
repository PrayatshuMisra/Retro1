import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ForumThread } from "@/components/forum-thread"

// This would normally fetch from an API or database
// For demo purposes, we'll hardcode a thread
const getThread = (id: string) => {
  return {
    id,
    title: "Welcome to RetroConnect!",
    author: "Prayatshu Misra",
    date: "3/28/1999",
    content:
      "Hello everyone! Welcome to RetroConnect, the coolest place on the web! Feel free to introduce yourselves and start posting! I've created this forum as a place for all of us 90s web enthusiasts to connect and share our love for the early internet. What was your first computer? What websites do you remember visiting back in the day?",
    category: "General Discussion",
    replies: [
      {
        id: "1",
        author: "TitaniumReborn",
        date: "3/28/1999",
        content:
          "Hey there! Great to be here! My first computer was a Packard Bell with Windows 95. I spent hours on GeoCities and playing Minesweeper!",
        avatar: "/placeholder.svg?height=50&width=50",
      },
      {
        id: "2",
        author: "CyberSeeker",
        date: "3/29/1999",
        content:
          "This forum looks awesome! I remember when the internet made that dial-up sound and my mom would yell at me for tying up the phone line. Good times!",
        avatar: "/placeholder.svg?height=50&width=50",
      },
      {
        id: "3",
        author: "FragMaster",
        date: "3/29/1999",
        content:
          "Checking in! I was all about Netscape Navigator and AltaVista search engine back in the day. Anyone remember the dancing baby GIF?",
        avatar: "/placeholder.svg?height=50&width=50",
      },
    ],
  }
}

export default function ThreadPage({ params }: { params: { id: string } }) {
  const thread = getThread(params.id)

  return (
    <div className="min-h-screen bg-teal-300 text-purple-900 font-['Comic_Sans_MS',_cursive]">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4 border-b-8 border-black text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-yellow-300 drop-shadow-[0.2rem_0.2rem_0px_#000]">
          RetroConnect
        </h1>
        <p className="text-white text-xl mt-2">Message Board</p>
      </header>

      {/* Main content */}
      <main className="container mx-auto p-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Link href="/forum">
            <Button className="bg-blue-500 text-white font-bold py-1 px-4 border-2 border-blue-900 rounded">
              Back to Forums
            </Button>
          </Link>

          <div className="text-sm">
            <span className="text-gray-600">You are here:</span>
            <Link href="/" className="text-blue-600 underline mx-1">
              Home
            </Link>{" "}
            &gt;
            <Link href="/forum" className="text-blue-600 underline mx-1">
              Forums
            </Link>{" "}
            &gt;
            <span className="font-bold mx-1">{thread.title}</span>
          </div>
        </div>

        <ForumThread
          id={thread.id}
          title={thread.title}
          author={thread.author}
          date={thread.date}
          content={thread.content}
          category={thread.category}
          replies={thread.replies}
        />
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4 border-t-8 border-black text-center text-white mt-8">
        <p>© 1999 RetroConnect - Best viewed with Netscape Navigator 4.0 or Internet Explorer 5.0</p>
        <div className="flex justify-center space-x-4 mt-2">
          <img src="/placeholder.svg?height=40&width=40" alt="Netscape Now!" className="h-10" />
          <img src="/placeholder.svg?height=40&width=40" alt="Internet Explorer" className="h-10" />
          <img src="/placeholder.svg?height=40&width=40" alt="Made with HTML" className="h-10" />
        </div>
      </footer>
    </div>
  )
}

