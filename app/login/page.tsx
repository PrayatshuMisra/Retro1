import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-teal-300 text-purple-900 font-['Comic_Sans_MS',_cursive]">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4 border-b-8 border-black text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-yellow-300 drop-shadow-[0.2rem_0.2rem_0px_#000]">
          PixelConnect
        </h1>
        <p className="text-white text-xl mt-2">Login Page</p>
      </header>

      {/* Main content */}
      <main className="container mx-auto p-4 py-8">
        <LoginForm />
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

