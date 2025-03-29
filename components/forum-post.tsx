import { Card } from "@/components/ui/card"

interface ForumPostProps {
  title: string
  author: string
  date: string
  replies: number
  views: number
  category: string
}

export function ForumPost({ title, author, date, replies, views, category }: ForumPostProps) {
  return (
    <Card className="border-2 border-gray-400 hover:border-blue-500 transition-colors">
      <div className="p-3 flex flex-col md:flex-row md:items-center">
        <div className="flex-grow">
          <h3 className="font-bold text-blue-700 hover:underline cursor-pointer">{title}</h3>
          <div className="text-sm text-gray-600 mt-1">
            Posted by <span className="text-blue-600 underline">{author}</span> on {date} in{" "}
            <span className="font-bold">{category}</span>
          </div>
        </div>
        <div className="mt-2 md:mt-0 flex space-x-4 text-sm">
          <div>
            <span className="font-bold">{replies}</span> replies
          </div>
          <div>
            <span className="font-bold">{views}</span> views
          </div>
          <div className="hidden md:block">
            <img src="/placeholder.svg?height=20&width=20" alt="Hot topic" className="h-5 w-5" />
          </div>
        </div>
      </div>
    </Card>
  )
}

