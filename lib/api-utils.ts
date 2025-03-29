// Helper functions for API routes

// Simulate database delay
export async function simulateDelay(ms = 500) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Format date in 90s style
export function formatDate(date: Date | string) {
  const d = new Date(date)
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`
}

// Generate a random 90s username
export function generateRandomUsername() {
  const prefixes = ["Cyber", "Web", "Net", "Cool", "Rad", "Digital", "Tech", "Pixel"]
  const suffixes = ["Surfer", "Master", "Guru", "Wizard", "Dude", "Kid", "Ninja", "Star"]
  const numbers = ["95", "98", "99", "2000", "42", "007", "64", "1337"]

  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)]
  const number = numbers[Math.floor(Math.random() * numbers.length)]

  return `${prefix}${suffix}${number}`
}

// Validate email format (basic validation)
export function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

