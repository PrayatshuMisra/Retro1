// This is a simplified auth implementation for demonstration purposes
// In a real application, you would use a proper authentication system like NextAuth.js

// Simulated user database
export const users = [
  {
    id: "1",
    username: "CoolUser99",
    password: "password123", // In a real app, this would be hashed
    email: "cooluser@aol.com",
    joinDate: "March 1999",
    avatar: "/placeholder.svg?height=150&width=150",
    bio: "Hey there! I'm CoolUser99, a total web enthusiast from the 90s! I love creating cool websites with flashy GIFs and bright colors!",
    location: "Cyberspace, USA",
    interests: "Web surfing, gaming, coding",
    posts: 42,
    status: "Online",
  },
  {
    id: "2",
    username: "WebMaster2000",
    password: "webmaster", // In a real app, this would be hashed
    email: "webmaster@geocities.com",
    joinDate: "January 1999",
    avatar: "/placeholder.svg?height=150&width=150",
    bio: "Professional webmaster with expertise in HTML tables and animated GIFs.",
    location: "Silicon Valley",
    interests: "HTML, JavaScript, Netscape",
    posts: 87,
    status: "Offline",
  },
]

// Simulated authentication functions
export async function login(username: string, password: string) {
  // Find user by username
  const user = users.find((u) => u.username.toLowerCase() === username.toLowerCase())

  // Check if user exists and password matches
  if (user && user.password === password) {
    return { success: true, user: { ...user, password: undefined } }
  }

  return { success: false, error: "Invalid username or password" }
}

export async function register(username: string, password: string, email: string) {
  // Check if username already exists
  if (users.find((u) => u.username.toLowerCase() === username.toLowerCase())) {
    return { success: false, error: "Username already taken" }
  }

  // Create new user
  const newUser = {
    id: (users.length + 1).toString(),
    username,
    password, // In a real app, this would be hashed
    email,
    joinDate: new Date().toLocaleDateString(),
    avatar: "/placeholder.svg?height=150&width=150",
    bio: "Welcome to my profile!",
    location: "Cyberspace",
    interests: "Web surfing",
    posts: 0,
    status: "Online",
  }

  // Add to users array
  users.push(newUser)

  return { success: true, user: { ...newUser, password: undefined } }
}

