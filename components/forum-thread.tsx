"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Reply {
  id: string
  author: string
  date: string
  content: string
  avatar: string
}

interface ThreadProps {
  id: string
  title: string
  author: string
  date: string
  content: string
  category: string
  replies: Reply[]
}

export function ForumThread({ id, title, author, date, content, category, replies }: ThreadProps) {
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [replyContent, setReplyContent] = useState("")
  const [localReplies, setLocalReplies] = useState<Reply[]>(replies)

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault()

    if (!replyContent.trim()) return

    // In a real app, this would call an API endpoint
    // For now, we'll just add the reply locally
    const newReply: Reply = {
      id: Date.now().toString(),
      author: "CoolUser99", // Hardcoded for demo
      date: new Date().toLocaleDateString(),
      content: replyContent,
      avatar: "/placeholder.svg?height=50&width=50",
    }

    setLocalReplies([...localReplies, newReply])
    setReplyContent("")
    setShowReplyForm(false)
  }

  return (
    <div className="space-y-6">
      {/* Thread header */}
      <Card className="border-4 border-blue-700 p-4 rounded-lg shadow-[0.5rem_0.5rem_0px_#000]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-blue-700">{title}</h2>
          <div className="text-sm text-gray-600">
            Category: <span className="font-bold">{category}</span>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 text-center">
            <img
              src="/placeholder.svg?height=80&width=80"
              alt={author}
              className="w-20 h-20 border-2 border-blue-500 rounded-lg mx-auto"
            />
            <div className="font-bold text-blue-600 mt-1">{author}</div>
            <div className="text-xs text-gray-600">Thread Starter</div>
          </div>

          <div className="flex-grow">
            <div className="bg-blue-100 border-2 border-blue-300 p-3 rounded">
              <div className="text-sm text-gray-600 mb-2">Posted on {date}</div>
              <div className="prose">{content}</div>
            </div>

            <div className="flex justify-end mt-2 space-x-2">
              <Button className="bg-gray-300 text-black font-bold py-1 px-3 border-2 border-gray-500 rounded text-sm">
                Quote
              </Button>
              <Button
                className="bg-green-500 text-white font-bold py-1 px-3 border-2 border-green-700 rounded text-sm"
                onClick={() => setShowReplyForm(true)}
              >
                Reply
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Replies */}
      {localReplies.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-purple-700 underline">Replies</h3>

          {localReplies.map((reply) => (
            <Card key={reply.id} className="border-2 border-purple-500 p-4 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 text-center">
                  <img
                    src={reply.avatar || "/placeholder.svg"}
                    alt={reply.author}
                    className="w-16 h-16 border-2 border-purple-300 rounded-lg mx-auto"
                  />
                  <div className="font-bold text-purple-600 mt-1">{reply.author}</div>
                </div>

                <div className="flex-grow">
                  <div className="bg-purple-100 border-2 border-purple-300 p-3 rounded">
                    <div className="text-sm text-gray-600 mb-2">Posted on {reply.date}</div>
                    <div className="prose">{reply.content}</div>
                  </div>

                  <div className="flex justify-end mt-2 space-x-2">
                    <Button className="bg-gray-300 text-black font-bold py-1 px-3 border-2 border-gray-500 rounded text-sm">
                      Quote
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Reply form */}
      {showReplyForm ? (
        <Card className="border-4 border-green-700 p-4 rounded-lg shadow-[0.5rem_0.5rem_0px_#000]">
          <h3 className="text-xl font-bold text-green-700 mb-4">Post a Reply</h3>

          <form onSubmit={handleSubmitReply}>
            <div className="mb-4">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="w-full border-2 border-gray-500 p-2 rounded h-32"
                placeholder="Type your reply here..."
                required
              ></textarea>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                onClick={() => setShowReplyForm(false)}
                className="bg-gray-300 text-black font-bold py-1 px-4 border-2 border-gray-500 rounded"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-green-500 text-white font-bold py-1 px-4 border-2 border-green-700 rounded"
              >
                Post Reply
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <div className="text-center">
          <Button
            onClick={() => setShowReplyForm(true)}
            className="bg-gradient-to-r from-green-500 to-green-700 text-white font-bold py-2 px-6 border-4 border-green-900 rounded-lg shadow-[0.25rem_0.25rem_0px_#000] hover:translate-y-1 transition-transform"
          >
            Reply to Thread
          </Button>
        </div>
      )}
    </div>
  )
}

