import { Card } from "@/components/ui/card"

interface GuestbookEntryProps {
  name: string
  message: string
  date: string
}

export function GuestbookEntry({ name, message, date }: GuestbookEntryProps) {
  return (
    <Card className="border-2 border-blue-500 p-3 bg-blue-100">
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-blue-800">{name}</h3>
        <span className="text-sm text-gray-600">{date}</span>
      </div>
      <p className="mt-2">{message}</p>
      <div className="flex items-center mt-2">
        <img src="/email.jpg?height=16&width=16" alt="Email" className="h-4 w-4 mr-1" />
        <span className="text-xs text-blue-600 underline"><a href="mailto:prayatshumisra2005@gmail.com">Email</a></span>
        <span className="mx-2">|</span>
        <img src="/home.png?height=16&width=16" alt="Homepage" className="h-4 w-4 mr-1" />
        <span className="text-xs text-blue-600 underline"><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Homepage</a></span>
      </div>
    </Card>
  )
}

