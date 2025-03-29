"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function CreateThreadForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    category: "General Discussion",
    content: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.title.trim() || !formData.content.trim()) {
      setError("Please fill out all required fields")
      return
    }

    setLoading(true)

    try {
      // In a real app, this would call an API endpoint
      // For now, we'll simulate creating a thread
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirect to forum page after "creating" the thread
      router.push("/forum")
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border-4 border-green-700 p-6 rounded-lg shadow-[0.5rem_0.5rem_0px_#000]">
      <h2 className="text-2xl font-bold text-green-700 mb-4 underline">Create New Thread</h2>

      {error && <div className="bg-red-100 border-2 border-red-500 text-red-700 p-3 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-bold mb-1">Thread Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border-2 border-gray-500 p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-bold mb-1">Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border-2 border-gray-500 p-2 rounded"
          >
            <option value="General Discussion">General Discussion</option>
            <option value="Tech Talk">Tech Talk</option>
            <option value="Retro Gaming">Retro Gaming</option>
            <option value="Web Design">Web Design</option>
            <option value="Off-Topic">Off-Topic</option>
          </select>
        </div>

        <div>
          <label className="block font-bold mb-1">Content:</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full border-2 border-gray-500 p-2 rounded h-40"
            required
          ></textarea>
        </div>

        <div className="bg-yellow-100 border-2 border-yellow-500 p-3 rounded">
          <h3 className="font-bold">Forum Rules:</h3>
          <ul className="list-disc list-inside text-sm">
            <li>Be respectful to other users</li>
            <li>No spamming or excessive posting</li>
            <li>Stay on topic within each category</li>
            <li>No offensive language or content</li>
          </ul>
        </div>

        <div className="flex justify-between">
          <Button
            type="button"
            onClick={() => router.push("/forum")}
            className="bg-gray-300 text-black font-bold py-2 px-4 border-2 border-gray-500 rounded"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-green-500 to-green-700 text-white font-bold py-2 px-4 border-4 border-green-900 rounded-lg shadow-[0.25rem_0.25rem_0px_#000] hover:translate-y-1 transition-transform"
          >
            {loading ? "Creating Thread..." : "Post New Thread"}
          </Button>
        </div>
      </form>
    </Card>
  )
}

