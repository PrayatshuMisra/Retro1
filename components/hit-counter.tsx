"use client"

import { useState, useEffect } from "react"

export function HitCounter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Get count from localStorage or set default
    const storedCount = localStorage.getItem("pageHits")
    const initialCount = storedCount ? Number.parseInt(storedCount, 10) : 1337

    // Increment count
    const newCount = initialCount + 1
    setCount(newCount)

    // Store in localStorage
    localStorage.setItem("pageHits", newCount.toString())
  }, [])

  return (
    <div className="text-center">
      <p className="text-sm">
        This page has been visited <span className="font-bold">{count.toLocaleString()}</span> times since March 1999
      </p>
    </div>
  )
}

