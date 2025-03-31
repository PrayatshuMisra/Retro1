import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ForumPost } from "@/components/forum-post"

export default function ForumPage() {
  return (
    <div className="min-h-screen bg-teal-300 text-purple-900 font-['Comic_Sans_MS',_cursive]">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4 border-b-8 border-black text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-yellow-300 drop-shadow-[0.2rem_0.2rem_0px_#000]">
          PixelConnect
        </h1>
        <p className="text-white text-xl mt-2">Message Board</p>
      </header>

      {/* Main content */}
      <main className="container mx-auto p-4">
        <div className="bg-white border-4 border-purple-700 p-4 rounded-lg shadow-[0.5rem_0.5rem_0px_#000] mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-purple-700 underline">PixelConnect Forums</h2>
            <Link href="/">
              <Button className="bg-blue-500 text-white font-bold py-1 px-4 border-2 border-blue-900 rounded">
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="bg-yellow-200 border-2 border-yellow-600 p-3 mb-4">
            <p className="font-bold">📢 Forum Rules:</p>
            <p>Be excellent to each other! No flaming, spamming, or off-topic posts.</p>
          </div>

          <div className="flex justify-end mb-4">
          <Link href="/forum/create">
            <Button className="bg-gradient-to-r from-green-500 to-green-700 text-white font-bold py-2 px-4 border-4 border-green-900 rounded-lg shadow-[0.25rem_0.25rem_0px_#000] hover:translate-y-1 transition-transform">
              New Thread
            </Button>
          </Link>
          </div>

          {/* Forum Categories */}
          <div className="space-y-4">
            <div className="border-2 border-blue-500 rounded-lg overflow-hidden">
              <div className="bg-blue-500 text-white font-bold p-2">General Discussion</div>
              <div className="p-3 bg-blue-100">
                <p>Talk about anything related to PixelConnect!</p>
                <div className="text-sm text-gray-600 mt-1">15 threads • 42 replies • Last post: 2 hours ago</div>
              </div>
            </div>




            <div className="border-2 border-green-500 rounded-lg overflow-hidden">
              <div className="bg-green-500 text-white font-bold p-2">Tech Talk</div>
              <div className="p-3 bg-green-100">
                <p>Discuss the latest in 90s technology!</p>
                <div className="text-sm text-gray-600 mt-1">8 threads • 23 replies • Last post: 5 hours ago</div>
              </div>
            </div>

            <div className="border-2 border-red-500 rounded-lg overflow-hidden">
              <div className="bg-red-500 text-white font-bold p-2">Retro Gaming</div>
              <div className="p-3 bg-red-100">
                <p>Share your favorite classic games and high scores!</p>
                <div className="text-sm text-gray-600 mt-1">20 threads • 67 replies • Last post: 1 day ago</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Posts */}
        <div className="bg-white border-4 border-green-700 p-4 rounded-lg shadow-[0.5rem_0.5rem_0px_#000]">
          <h2 className="text-2xl font-bold text-green-700 mb-4 underline">Recent Posts</h2>

          <div className="space-y-4">
            <ForumPost
              title="Welcome to PixelConnect!"
              author="Webmaster"
              date="3/28/1999"
              replies={5}
              views={42}
              category="General Discussion"
            />

            <ForumPost
              title="Who's excited for the Y2K bug?"
              author="TechGuru99"
              date="3/27/1999"
              replies={12}
              views={78}
              category="Tech Talk"
            />

            <ForumPost
              title="Just beat Doom on Nightmare difficulty!"
              author="FragMaster"
              date="3/26/1999"
              replies={8}
              views={36}
              category="Retro Gaming"
            />

            <ForumPost
              title="Best Netscape plugins?"
              author="SurfDude"
              date="3/25/1999"
              replies={3}
              views={21}
              category="Tech Talk"
            />
          </div>

          <div className="flex justify-center mt-6">
            <div className="inline-flex">
              <Button className="bg-gray-300 text-black font-bold py-1 px-3 border-2 border-gray-500 rounded-l">
                Previous
              </Button>
              <Button className="bg-blue-500 text-white font-bold py-1 px-3 border-2 border-blue-700">1</Button>
              <Button className="bg-gray-300 text-black font-bold py-1 px-3 border-2 border-gray-500">2</Button>
              <Button className="bg-gray-300 text-black font-bold py-1 px-3 border-2 border-gray-500">3</Button>
              <Button className="bg-gray-300 text-black font-bold py-1 px-3 border-2 border-gray-500 rounded-r">
                Next
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4 border-t-8 border-black text-center text-white mt-8">
      <p>© 1999 PixelConnect - Best viewed with Netscape Navigator 4.0 or Internet Explorer 5.0</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a 
            href="https://sillydog.org/netscape/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <img src="/netscape.png?height=40&width=40" alt="Netscape Now!" className="h-10" />
          </a>
          <a 
            href="https://www.microsoft.com/en-us/download/internet-explorer.aspx" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <img src="/exp.png?height=40&width=40" alt="Internet Explorer" className="h-10" />
          </a>
          <a 
            href="https://www.w3.org/html/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <img src="/htm.gif?height=40&width=40" alt="Made with HTML" className="h-10" />
          </a>
        </div>
      </footer>
    </div>
  )
}

