
 
# PixelConnect - A 90s Web Experience

![PixelConnect Banner](/img1.webp?height=200&width=600)

## 🌐 Overview

PixelConnect is a nostalgic journey back to the golden era of the internet - the 1990s! This project recreates the classic web aesthetics and features of the early internet days, complete with guestbooks, visitor counters, animated backgrounds, and all the visual charm of the 90s web.

Built with modern technologies but designed with retro sensibilities, PixelConnect is both a functional social platform and a tribute to internet history.

## ✨ Features

- **Authentic 90s Design**: Vibrant colors, Comic Sans font, pixelated images, and classic UI elements
- **User Profiles**: Create your own customizable profile page with photos, guestbook, and personal info
- **Message Board**: Participate in forum discussions across various categories
- **Guestbook**: Sign guestbooks and leave messages for other users
- **Weather Widget**: Check the "current weather" with our simulated weather API
- **Visitor Counter**: Track page visits with an animated counter
- **Retro Games**: Play classic games like Snake and Pong right in your browser
- **MIDI Player**: Toggle background "music" for the authentic 90s web experience
- **Admin Dashboard**: Manage users, content, and system settings (use admin/admin123 to access)

## 🛠️ Technologies Used

- **Next.js**: React framework for building the application
- **TypeScript**: For type-safe code
- **Tailwind CSS**: For styling with a custom 90s-inspired theme
- **shadcn/ui**: Component library (heavily customized for retro aesthetics)
- **React Hooks**: For state management and side effects
- **Next.js, Supabase API Routes**: For simulated backend functionality

## 🚀 Getting Started

## 📝 Usage

### User Authentication

- **Login**: Use the credentials "CoolUser99" / "password123" for a demo account
- **Register**: Create your own account with a username, email, and password


### Navigation

- **Home**: Main landing page with guestbook and site information
- **Message Board**: Browse and create forum threads
- **Profile**: View and edit your personal profile
- **Games**: Play retro games like Snake and Pong
- **About**: Learn about the site and its creator


### Admin Access

1. Navigate to the Admin Dashboard
2. Login with username "admin" and password "admin123"
3. Access system statistics, user management, content moderation, and system settings


## 📁 Project Structure
retro-connect/
├── app/                  # Next.js app directory
│   ├── api/              # API routes for simulated backend
│   ├── about/            # About page
│   ├── admin/            # Admin dashboard
│   ├── forum/            # Message board
│   ├── games/            # Retro games
│   ├── login/            # Login page
│   ├── profile/          # User profile
│   ├── register/         # Registration page
│   └── page.tsx          # Home page
├── components/           # React components
│   ├── ui/               # UI components from shadcn
│   ├── guestbook-entry.tsx
│   ├── forum-post.tsx
│   ├── weather-widget.tsx
│   └── ...
├── lib/                  # Utility functions and helpers
├── public/               # Static assets
└── ...

## 🎮 Demo Accounts

For testing purposes, you can use these pre-configured accounts:

- **Regular User**:

- Username: CoolUser99
- Password: password123



- **Admin User**:

- Username: admin
- Password: admin123

### Prerequisites

- Node.js 16.8.0 or later
- npm or yarn

### Community Features

- **User Profiles**: Create your own customizable profile page with:
  - Personal information and bio
  - Photo gallery
  - Visitor guestbook
  - Status updates
  - Custom avatar
  
- **Message Board**: Participate in forum discussions across various categories:
  - General Discussion
  - Tech Talk
  - Retro Gaming
  - Web Design
  - Off-Topic
  
- **Guestbook System**: Sign guestbooks and leave messages for other users
  - Leave your name, message, and optional website/email
  - View entries from other visitors
  - Chronological display of entries

### Interactive Elements

- **Weather Widget**: Check the "current weather" with our simulated weather API
  - Randomly generated weather conditions
  - Visual weather indicators
  - Temperature and humidity display
  
- **Visitor Counter**: Track page visits with an animated counter
  - Persistent count stored in localStorage
  - Digit-by-digit display
  
- **Retro Games**: Play classic games right in your browser
  - Snake: Control a snake to eat food and grow without hitting walls or yourself
  - Pong: Classic paddle game against an AI opponent
  - More games planned for future updates
  
- **MIDI Player**: Toggle background "music" for the authentic 90s web experience
  - Simple audio synthesis to simulate MIDI playback
  - Play/pause controls

### Administration

- **Admin Dashboard**: Manage users, content, and system settings
  - User management: view, edit, and ban users
  - Content moderation: manage forum posts and guestbook entries
  - System statistics: track site usage and performance
  - Maintenance mode toggle
  - Simulated backup and system tools

 ### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/PrayatshuMisra/Retro1.git
   cd Retro1
