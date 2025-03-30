"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function GamesPage() {
  const [activeGame, setActiveGame] = useState<string | null>(null)
  const snakeCanvasRef = useRef<HTMLCanvasElement>(null)
  const tetrisCanvasRef = useRef<HTMLCanvasElement>(null)
  const pongCanvasRef = useRef<HTMLCanvasElement>(null)

  // Snake game state
  const [snakeScore, setSnakeScore] = useState(0)
  const [snakeGameOver, setSnakeGameOver] = useState(false)

  // Tetris game state
  const [tetrisScore, setTetrisScore] = useState(0)
  const [tetrisGameOver, setTetrisGameOver] = useState(false)

  // Pong game state
  const [pongScore, setPongScore] = useState(0)

  // Snake game implementation
  const initSnakeGame = () => {
    const canvas = snakeCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    setSnakeScore(0)
    setSnakeGameOver(false)

    const gridSize = 20
    const tileCount = canvas.width / gridSize

    const snake = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ]

    let food = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount),
    }

    let dx = 1
    let dy = 0

    const gameLoop = setInterval(() => {
      if (snakeGameOver) {
        clearInterval(gameLoop)
        return
      }

      // Move snake
      const head = { x: snake[0].x + dx, y: snake[0].y + dy }

      // Check wall collision
      if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        setSnakeGameOver(true)
        return
      }

      // Check self collision
      for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
          setSnakeGameOver(true)
          return
        }
      }

      snake.unshift(head)

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setSnakeScore((prev) => prev + 10)
        food = {
          x: Math.floor(Math.random() * tileCount),
          y: Math.floor(Math.random() * tileCount),
        }
      } else {
        snake.pop()
      }

      // Draw everything
      ctx.fillStyle = "black"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw snake
      ctx.fillStyle = "lime"
      snake.forEach((segment) => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2)
      })

      // Draw food
      ctx.fillStyle = "red"
      ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2)
    }, 100)

    // Handle keyboard input
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" && dy !== 1) {
        dx = 0
        dy = -1
      } else if (e.key === "ArrowDown" && dy !== -1) {
        dx = 0
        dy = 1
      } else if (e.key === "ArrowLeft" && dx !== 1) {
        dx = -1
        dy = 0
      } else if (e.key === "ArrowRight" && dx !== -1) {
        dx = 1
        dy = 0
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      clearInterval(gameLoop)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }

  // Simple Pong game implementation
  const initPongGame = () => {
    const canvas = pongCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    setPongScore(0)

    const paddleHeight = 80
    const paddleWidth = 10
    let leftPaddleY = canvas.height / 2 - paddleHeight / 2
    let rightPaddleY = canvas.height / 2 - paddleHeight / 2

    let ballX = canvas.width / 2
    let ballY = canvas.height / 2
    const ballRadius = 8
    let ballSpeedX = 5
    let ballSpeedY = 3

    // AI difficulty
    const aiSpeed = 3

    const gameLoop = setInterval(() => {
      // Move ball
      ballX += ballSpeedX
      ballY += ballSpeedY

      // Ball collision with top and bottom
      if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
        ballSpeedY = -ballSpeedY
      }

      // Ball collision with paddles
      if (ballX - ballRadius < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX
        setPongScore((prev) => prev + 1)
      }

      if (
        ballX + ballRadius > canvas.width - paddleWidth &&
        ballY > rightPaddleY &&
        ballY < rightPaddleY + paddleHeight
      ) {
        ballSpeedX = -ballSpeedX
      }

      // Ball out of bounds
      if (ballX < 0 || ballX > canvas.width) {
        ballX = canvas.width / 2
        ballY = canvas.height / 2
        ballSpeedX = -ballSpeedX
      }

      // AI movement
      if (rightPaddleY + paddleHeight / 2 < ballY) {
        rightPaddleY += aiSpeed
      } else {
        rightPaddleY -= aiSpeed
      }

      // Draw everything
      ctx.fillStyle = "black"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw paddles
      ctx.fillStyle = "white"
      ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight)
      ctx.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight)

      // Draw ball
      ctx.beginPath()
      ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2)
      ctx.fill()

      // Draw center line
      ctx.setLineDash([5, 5])
      ctx.beginPath()
      ctx.moveTo(canvas.width / 2, 0)
      ctx.lineTo(canvas.width / 2, canvas.height)
      ctx.strokeStyle = "white"
      ctx.stroke()
      ctx.setLineDash([])
    }, 16)

    // Handle mouse movement for player paddle
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mouseY = e.clientY - rect.top

      if (mouseY > 0 && mouseY < canvas.height) {
        leftPaddleY = mouseY - paddleHeight / 2
      }
    }

    canvas.addEventListener("mousemove", handleMouseMove)

    return () => {
      clearInterval(gameLoop)
      canvas.removeEventListener("mousemove", handleMouseMove)
    }
  }

  useEffect(() => {
    if (activeGame === "snake") {
      return initSnakeGame()
    } else if (activeGame === "pong") {
      return initPongGame()
    }
  }, [activeGame])

  return (
    <div className="min-h-screen bg-teal-300 text-purple-900 font-['Comic_Sans_MS',_cursive]">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4 border-b-8 border-black text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-yellow-300 drop-shadow-[0.2rem_0.2rem_0px_#000]">
          RetroConnect
        </h1>
        <p className="text-white text-xl mt-2">Retro Games Arcade</p>
      </header>

      {/* Main content */}
      <main className="container mx-auto p-4">
        <div className="bg-white border-4 border-purple-700 p-4 rounded-lg shadow-[0.5rem_0.5rem_0px_#000] mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-purple-700 underline">Retro Games</h2>
            <Link href="/">
              <Button className="bg-blue-500 text-white font-bold py-1 px-4 border-2 border-blue-900 rounded">
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="bg-yellow-200 border-2 border-yellow-600 p-3 mb-6">
            <p className="font-bold">🎮 Welcome to the RetroConnect Arcade!</p>
            <p>Play some classic games right in your browser! Use arrow keys for Snake, mouse for Pong.</p>
          </div>

          {!activeGame ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card
                className="border-4 border-green-500 p-4 rounded-lg bg-green-100 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setActiveGame("snake")}
              >
                <h3 className="text-xl font-bold text-green-700 mb-2 text-center">Snake</h3>
                <div className="flex justify-center mb-2">
                  <img src="/placeholder.svg?height=100&width=100" alt="Snake Game" className="border-2 border-black" />
                </div>
                <p className="text-center">
                  Classic Snake game! Eat the food, grow longer, don't hit the walls or yourself!
                </p>
                <div className="mt-4 text-center">
                  <Button className="bg-gradient-to-r from-green-500 to-green-700 text-white font-bold py-1 px-4 border-2 border-green-900 rounded">
                    PLAY NOW
                  </Button>
                </div>
              </Card>

              <Card
                className="border-4 border-blue-500 p-4 rounded-lg bg-blue-100 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setActiveGame("pong")}
              >
                <h3 className="text-xl font-bold text-blue-700 mb-2 text-center">Pong</h3>
                <div className="flex justify-center mb-2">
                  <img src="/placeholder.svg?height=100&width=100" alt="Pong Game" className="border-2 border-black" />
                </div>
                <p className="text-center">
                  The original video game! Move your paddle to bounce the ball back and forth.
                </p>
                <div className="mt-4 text-center">
                  <Button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-1 px-4 border-2 border-blue-900 rounded">
                    PLAY NOW
                  </Button>
                </div>
              </Card>

              <Card className="border-4 border-red-500 p-4 rounded-lg bg-red-100 hover:shadow-lg transition-shadow cursor-pointer">
                <h3 className="text-xl font-bold text-red-700 mb-2 text-center">Tetris</h3>
                <div className="flex justify-center mb-2">
                  <img
                    src="/placeholder.svg?height=100&width=100"
                    alt="Tetris Game"
                    className="border-2 border-black"
                  />
                </div>
                <p className="text-center">
                  Stack the falling blocks to create complete rows. Don't let them reach the top!
                </p>
                <div className="mt-4 text-center">
                  <Button
                    className="bg-gradient-to-r from-red-500 to-red-700 text-white font-bold py-1 px-4 border-2 border-red-900 rounded opacity-50"
                    disabled
                  >
                    COMING SOON
                  </Button>
                </div>
              </Card>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-purple-700">
                  {activeGame === "snake" ? "Snake Game" : activeGame === "pong" ? "Pong Game" : "Game"}
                </h3>
                <div className="flex items-center space-x-4">
                  <div className="bg-black text-green-400 font-mono px-4 py-2 rounded border-2 border-green-500">
                    Score: {activeGame === "snake" ? snakeScore : activeGame === "pong" ? pongScore : 0}
                  </div>
                  <Button
                    onClick={() => {
                      setActiveGame(null)
                      setSnakeGameOver(false)
                      setSnakeScore(0)
                      setPongScore(0)
                    }}
                    className="bg-red-500 text-white font-bold py-1 px-4 border-2 border-red-900 rounded"
                  >
                    EXIT GAME
                  </Button>
                </div>
              </div>

              <div className="flex justify-center mb-6">
                {activeGame === "snake" && (
                  <>
                    {snakeGameOver ? (
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-red-600 mb-4">GAME OVER</h3>
                        <p className="mb-4">Your score: {snakeScore}</p>
                        <Button
                          onClick={() => {
                            setSnakeGameOver(false)
                            initSnakeGame()
                          }}
                          className="bg-gradient-to-r from-green-500 to-green-700 text-white font-bold py-2 px-6 border-4 border-green-900 rounded-lg shadow-[0.25rem_0.25rem_0px_#000]"
                        >
                          PLAY AGAIN
                        </Button>
                      </div>
                    ) : (
                      <canvas
                        ref={snakeCanvasRef}
                        width={400}
                        height={400}
                        className="border-4 border-black bg-black"
                      ></canvas>
                    )}
                  </>
                )}

                {activeGame === "pong" && (
                  <canvas
                    ref={pongCanvasRef}
                    width={600}
                    height={400}
                    className="border-4 border-black bg-black"
                  ></canvas>
                )}
              </div>

              <div className="bg-gray-200 border-2 border-gray-400 p-3 rounded">
                <h4 className="font-bold mb-2">Game Controls:</h4>
                {activeGame === "snake" && (
                  <p>Use the arrow keys to control the snake. Eat the red food to grow and earn points!</p>
                )}
                {activeGame === "pong" && (
                  <p>Move your mouse up and down to control the left paddle. Try to keep the ball in play!</p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="bg-white border-4 border-green-700 p-4 rounded-lg shadow-[0.5rem_0.5rem_0px_#000]">
          <h2 className="text-2xl font-bold text-green-700 mb-4 underline">High Scores</h2>

          <Tabs defaultValue="snake" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="snake" className="bg-green-200 border-2 border-green-500 font-bold">
                Snake
              </TabsTrigger>
              <TabsTrigger value="pong" className="bg-blue-200 border-2 border-blue-500 font-bold">
                Pong
              </TabsTrigger>
            </TabsList>

            <TabsContent value="snake">
              <div className="overflow-hidden border-2 border-green-500 rounded-lg">
                <table className="w-full">
                  <thead className="bg-green-500 text-white">
                    <tr>
                      <th className="p-2 text-left">Rank</th>
                      <th className="p-2 text-left">Player</th>
                      <th className="p-2 text-left">Score</th>
                      <th className="p-2 text-left">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-green-100">
                      <td className="p-2 font-bold">1</td>
                      <td className="p-2">SnakeMaster99</td>
                      <td className="p-2">250</td>
                      <td className="p-2">3/15/1999</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold">2</td>
                      <td className="p-2">RetroGamer</td>
                      <td className="p-2">180</td>
                      <td className="p-2">3/20/1999</td>
                    </tr>
                    <tr className="bg-green-100">
                      <td className="p-2 font-bold">3</td>
                      <td className="p-2">CyberKid2000</td>
                      <td className="p-2">150</td>
                      <td className="p-2">3/22/1999</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="pong">
              <div className="overflow-hidden border-2 border-blue-500 rounded-lg">
                <table className="w-full">
                  <thead className="bg-blue-500 text-white">
                    <tr>
                      <th className="p-2 text-left">Rank</th>
                      <th className="p-2 text-left">Player</th>
                      <th className="p-2 text-left">Score</th>
                      <th className="p-2 text-left">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-blue-100">
                      <td className="p-2 font-bold">1</td>
                      <td className="p-2">PongChamp</td>
                      <td className="p-2">42</td>
                      <td className="p-2">3/18/1999</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold">2</td>
                      <td className="p-2">ArcadePro</td>
                      <td className="p-2">38</td>
                      <td className="p-2">3/21/1999</td>
                    </tr>
                    <tr className="bg-blue-100">
                      <td className="p-2 font-bold">3</td>
                      <td className="p-2">GameWizard</td>
                      <td className="p-2">35</td>
                      <td className="p-2">3/24/1999</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4 border-t-8 border-black text-center text-white mt-8">
        <p>© 1999 RetroConnect - Best viewed with Netscape Navigator 4.0 or Internet Explorer 5.0</p>
        <div className="flex justify-center space-x-4 mt-2">
          <img src="/placeholder.svg?height=40&width=40" alt="Netscape Now!" className="h-10" />
          <img src="/placeholder.svg?height=40&width=40" alt="Internet Explorer" className="h-10" />
          <img src="/placeholder.svg?height=40&width=40" alt="Made with HTML" className="h-10" />
        </div>
        <p className="mt-2 text-sm">
          This page has been visited <span className="font-bold">1,337</span> times since March 1999
        </p>
      </footer>
    </div>
  )
}

