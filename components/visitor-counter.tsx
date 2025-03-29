"use client"

import { useEffect, useState } from "react"

export function VisitorCounter() {
  const [count, setCount] = useState(1337)

  useEffect(() => {
    // Simulate counter increment
    const timer = setTimeout(() => {
      setCount(count + 1)
    }, 10000)

    return () => clearTimeout(timer)
  }, [count])

  return (
    <div className="bg-black text-green-400 font-mono px-4 py-2 rounded border-2 border-green-500 inline-flex items-center">
      <span className="mr-2">Visitors:</span>
      <div className="flex">
        {count
          .toString()
          .split("")
          .map((digit, index) => (
            <div key={index} className="bg-black border border-green-500 px-2 mx-0.5 rounded">
              {digit}
            </div>
          ))}
      </div>
    </div>
  )
}

