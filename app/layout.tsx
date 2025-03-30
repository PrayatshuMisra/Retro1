import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { RetroCursor } from "@/components/retro-cursor"
import { MidiPlayer } from "@/components/midi-player" // Import the MidiPlayer

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>PixelConnect - A 90s Web Experience</title>
        <meta name="description" content="PixelConnect - A nostalgic journey back to the 90s web" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
          <MidiPlayer /> {/* Added the background music player */}
          <RetroCursor />
        </ThemeProvider>
      </body>
    </html>
  )
}
