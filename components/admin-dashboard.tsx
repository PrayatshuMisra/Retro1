"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SiteStats {
  totalUsers: number
  activeUsers: number
  totalPosts: number
  totalThreads: number
  totalGuestbookEntries: number
  totalPageViews: number
  serverStatus: "online" | "maintenance" | "issues"
  lastBackup: string
  diskUsage: string
  registrationsToday: number
}

interface User {
  id: string
  username: string
  email: string
  joinDate: string
  posts: number
  status: string
  banned: boolean
  password?: string
}

interface AdminDashboardProps {
  onAction?: (action: string) => void
}

export default function AdminDashboard({ onAction }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false)
  const [actionMessage, setActionMessage] = useState<string | null>(null)
  const [showActionMessage, setShowActionMessage] = useState(false)
  const [showAddUserForm, setShowAddUserForm] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    status: "Online",
  })

  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      username: "CoolUser99",
      email: "cooluser@aol.com",
      joinDate: "March 1999",
      posts: 42,
      status: "Online",
      banned: false,
    },
    {
      id: "2",
      username: "WebMaster2000",
      email: "webmaster@geocities.com",
      joinDate: "January 1999",
      posts: 87,
      status: "Offline",
      banned: false,
    },
    {
      id: "3",
      username: "CyberGirl2000",
      email: "cybergirl@hotmail.com",
      joinDate: "March 1999",
      posts: 12,
      status: "Online",
      banned: false,
    },
  ])

  const siteStats: SiteStats = {
    totalUsers: 1337,
    activeUsers: 42,
    totalPosts: 256,
    totalThreads: 64,
    totalGuestbookEntries: 128,
    totalPageViews: 9001,
    serverStatus: "online",
    lastBackup: "3/30/1999 04:20 AM",
    diskUsage: "420MB / 500MB",
    registrationsToday: 7,
  }

  const handleLogout = () => {
    localStorage.removeItem("adminSession")
    window.location.reload()
  }

  const toggleMaintenanceMode = () => {
    setIsMaintenanceMode(!isMaintenanceMode)
  }

  const handleAction = (action: string) => {
    setActionMessage(`Action performed: ${action}`)
    setShowActionMessage(true)
    setTimeout(() => {
      setShowActionMessage(false)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      {showActionMessage && (
        <div className="bg-blue-100 border-2 border-blue-500 text-blue-700 p-3 rounded mb-4 animate-pulse">
          {actionMessage}
        </div>
      )}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-purple-700 underline">Admin Control Panel</h2>
        <Button
          onClick={handleLogout}
          className="bg-red-500 text-white font-bold py-1 px-4 border-2 border-red-900 rounded"
        >
          Logout
        </Button>
      </div>

      <div className="bg-green-100 border-2 border-green-500 p-3 rounded">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-bold text-green-800">
              System Status: {isMaintenanceMode ? "MAINTENANCE MODE" : "ONLINE"}
            </p>
            <p className="text-sm">Last login: 3/31/1999 12:34 PM from 127.0.0.1</p>
          </div>
          <Button
            onClick={toggleMaintenanceMode}
            className={`font-bold py-1 px-4 border-2 rounded ${
              isMaintenanceMode
                ? "bg-green-500 text-white border-green-700"
                : "bg-yellow-500 text-white border-yellow-700"
            }`}
          >
            {isMaintenanceMode ? "Disable Maintenance Mode" : "Enable Maintenance Mode"}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="overview" className="bg-blue-200 border-2 border-blue-500 font-bold">
            Overview
          </TabsTrigger>
          <TabsTrigger value="users" className="bg-green-200 border-2 border-green-500 font-bold">
            Users
          </TabsTrigger>
          <TabsTrigger value="content" className="bg-yellow-200 border-2 border-yellow-500 font-bold">
            Content
          </TabsTrigger>
          <TabsTrigger value="system" className="bg-red-200 border-2 border-red-500 font-bold">
            System
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-4 border-blue-500 p-4 rounded-lg bg-blue-100">
              <h3 className="text-xl font-bold text-blue-700 mb-4 underline">Site Statistics</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-bold">Total Users:</span>
                  <span>{siteStats.totalUsers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">Active Users:</span>
                  <span>{siteStats.activeUsers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">Total Posts:</span>
                  <span>{siteStats.totalPosts}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">Total Threads:</span>
                  <span>{siteStats.totalThreads}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">Guestbook Entries:</span>
                  <span>{siteStats.totalGuestbookEntries}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">Total Page Views:</span>
                  <span>{siteStats.totalPageViews}</span>
                </div>
              </div>
            </Card>

            <Card className="border-4 border-purple-500 p-4 rounded-lg bg-purple-100">
              <h3 className="text-xl font-bold text-purple-700 mb-4 underline">Quick Actions</h3>
              <div className="space-y-2">
                <Button
                  onClick={() => handleAction("Database backup started")}
                  className="w-full bg-blue-500 text-white font-bold py-1 px-4 border-2 border-blue-700 rounded mb-2"
                >
                  Backup Database
                </Button>
                <Button
                  onClick={() => handleAction("Newsletter sent to all users")}
                  className="w-full bg-green-500 text-white font-bold py-1 px-4 border-2 border-green-700 rounded mb-2"
                >
                  Send Newsletter
                </Button>
                <Button
                  onClick={() => handleAction("Cache cleared successfully")}
                  className="w-full bg-yellow-500 text-white font-bold py-1 px-4 border-2 border-yellow-700 rounded mb-2"
                >
                  Clear Cache
                </Button>
                <Button
                  onClick={() => handleAction("Ban hammer activated!")}
                  className="w-full bg-red-500 text-white font-bold py-1 px-4 border-2 border-red-700 rounded"
                >
                  Ban Hammer
                </Button>
              </div>
            </Card>
          </div>

          <Card className="border-4 border-green-500 p-4 rounded-lg bg-green-100 mt-4">
            <h3 className="text-xl font-bold text-green-700 mb-4 underline">Recent Activity</h3>
            <div className="space-y-2">
              <div className="border-b border-green-300 pb-2">
                <div className="flex justify-between">
                  <span className="font-bold">CyberGirl2000</span>
                  <span className="text-sm">3/31/1999 11:42 AM</span>
                </div>
                <p className="text-sm">Registered a new account</p>
              </div>
              <div className="border-b border-green-300 pb-2">
                <div className="flex justify-between">
                  <span className="font-bold">RadDude1995</span>
                  <span className="text-sm">3/31/1999 10:15 AM</span>
                </div>
                <p className="text-sm">Created a new forum thread: "Who's excited for The Matrix?"</p>
              </div>
              <div className="border-b border-green-300 pb-2">
                <div className="flex justify-between">
                  <span className="font-bold">WebSurfer42</span>
                  <span className="text-sm">3/31/1999 09:30 AM</span>
                </div>
                <p className="text-sm">Signed the guestbook</p>
              </div>
              <div className="border-b border-green-300 pb-2">
                <div className="flex justify-between">
                  <span className="font-bold">TechGuru99</span>
                  <span className="text-sm">3/31/1999 08:45 AM</span>
                </div>
                <p className="text-sm">Updated profile information</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card className="border-4 border-green-500 p-4 rounded-lg bg-green-100">
            <h3 className="text-xl font-bold text-green-700 mb-4 underline">User Management</h3>

            {showAddUserForm && (
              <div className="bg-white border-2 border-green-500 p-4 rounded-lg mb-4">
                <h4 className="font-bold text-green-700 mb-2">Add New User</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block font-bold mb-1">Username:</label>
                    <input
                      type="text"
                      className="w-full border-2 border-gray-500 p-2 rounded"
                      value={newUser.username}
                      onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Email:</label>
                    <input
                      type="email"
                      className="w-full border-2 border-gray-500 p-2 rounded"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Password:</label>
                    <input
                      type="password"
                      className="w-full border-2 border-gray-500 p-2 rounded"
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Status:</label>
                    <select
                      className="w-full border-2 border-gray-500 p-2 rounded"
                      value={newUser.status}
                      onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
                    >
                      <option value="Online">Online</option>
                      <option value="Offline">Offline</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    onClick={() => setShowAddUserForm(false)}
                    className="bg-gray-500 text-white font-bold py-1 px-3 border-2 border-gray-700 rounded"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      handleAction(`New user added: ${newUser.username}`)
                      setUsers([
                        ...users,
                        {
                          id: Date.now().toString(),
                          username: newUser.username,
                          email: newUser.email,
                          joinDate: "March 1999",
                          posts: 0,
                          status: newUser.status,
                          banned: false,
                        },
                      ])
                      setShowAddUserForm(false)
                      setNewUser({
                        username: "",
                        email: "",
                        password: "",
                        status: "Online",
                      })
                    }}
                    className="bg-green-500 text-white font-bold py-1 px-3 border-2 border-green-700 rounded"
                  >
                    Add User
                  </Button>
                </div>
              </div>
            )}

            {editingUser && (
              <div className="bg-white border-2 border-blue-500 p-4 rounded-lg mb-4">
                <h4 className="font-bold text-blue-700 mb-2">Edit User: {editingUser.username}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block font-bold mb-1">Username:</label>
                    <input
                      type="text"
                      className="w-full border-2 border-gray-500 p-2 rounded"
                      value={editingUser.username}
                      onChange={(e) =>
                        setEditingUser({ ...editingUser, username: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Email:</label>
                    <input
                      type="email"
                      className="w-full border-2 border-gray-500 p-2 rounded"
                      value={editingUser.email}
                      onChange={(e) =>
                        setEditingUser({ ...editingUser, email: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Status:</label>
                    <select
                      className="w-full border-2 border-gray-500 p-2 rounded"
                      value={editingUser.status}
                      onChange={(e) =>
                        setEditingUser({ ...editingUser, status: e.target.value })
                      }
                    >
                      <option value="Online">Online</option>
                      <option value="Offline">Offline</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    onClick={() => setEditingUser(null)}
                    className="bg-gray-500 text-white font-bold py-1 px-3 border-2 border-gray-700 rounded"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      handleAction(`User updated: ${editingUser.username}`)
                      setUsers(
                        users.map((user) =>
                          user.id === editingUser.id ? editingUser : user
                        )
                      )
                      setEditingUser(null)
                    }}
                    className="bg-blue-500 text-white font-bold py-1 px-3 border-2 border-blue-700 rounded"
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-green-500 text-white">
                    <th className="border border-green-600 p-2 text-left">Username</th>
                    <th className="border border-green-600 p-2 text-left">Email</th>
                    <th className="border border-green-600 p-2 text-left">Join Date</th>
                    <th className="border border-green-600 p-2 text-left">Posts</th>
                    <th className="border border-green-600 p-2 text-left">Status</th>
                    <th className="border border-green-600 p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className={user.banned ? "bg-red-100" : "bg-white"}>
                      <td className="border border-green-300 p-2">{user.username}</td>
                      <td className="border border-green-300 p-2">{user.email}</td>
                      <td className="border border-green-300 p-2">{user.joinDate}</td>
                      <td className="border border-green-300 p-2">{user.posts}</td>
                      <td
                        className={`border border-green-300 p-2 ${
                          user.status === "Online" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {user.status}
                      </td>
                      <td className="border border-green-300 p-2">
                        <div className="flex space-x-1">
                          <Button
                            onClick={() => setEditingUser(user)}
                            className="bg-blue-500 text-white text-xs py-1 px-2 border border-blue-700 rounded"
                            disabled={user.banned}
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => {
                              if (user.banned) {
                                handleAction(`User unbanned: ${user.username}`)
                                setUsers(
                                  users.map((u) =>
                                    u.id === user.id
                                      ? { ...u, banned: false, status: "Online" }
                                      : u
                                  )
                                )
                              } else {
                                handleAction(`User banned: ${user.username}`)
                                setUsers(
                                  users.map((u) =>
                                    u.id === user.id
                                      ? { ...u, banned: true, status: "Offline" }
                                      : u
                                  )
                                )
                              }
                            }}
                            className={`text-white text-xs py-1 px-2 border rounded ${
                              user.banned
                                ? "bg-green-500 border-green-700"
                                : "bg-red-500 border-red-700"
                            }`}
                          >
                            {user.banned ? "Unban" : "Ban"}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-between">
              <div>
                <span className="font-bold">New registrations today:</span> {siteStats.registrationsToday}
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={() => setShowAddUserForm(true)}
                  className="bg-green-500 text-white font-bold py-1 px-3 border-2 border-green-700 rounded"
                >
                  Add User
                </Button>
                <Button
                  onClick={() => handleAction("Users exported to CSV")}
                  className="bg-blue-500 text-white font-bold py-1 px-3 border-2 border-blue-700 rounded"
                >
                  Export Users
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="content">
          <Card className="border-4 border-yellow-500 p-4 rounded-lg bg-yellow-100">
            <h3 className="text-xl font-bold text-yellow-700 mb-4 underline">Content Management</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-2 border-yellow-400 p-3 rounded-lg bg-white">
                <h4 className="font-bold text-yellow-700 mb-2">Forum Statistics</h4>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Total Threads:</span>
                    <span>{siteStats.totalThreads}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Posts:</span>
                    <span>{siteStats.totalPosts}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Most Active Category:</span>
                    <span>Tech Talk</span>
                  </div>
                </div>
                <div className="mt-3">
                  <Button
                    onClick={() => handleAction("Forum management opened")}
                    className="w-full bg-yellow-500 text-white font-bold py-1 px-3 border-2 border-yellow-700 rounded"
                  >
                    Manage Forums
                  </Button>
                </div>
              </div>

              <div className="border-2 border-yellow-400 p-3 rounded-lg bg-white">
                <h4 className="font-bold text-yellow-700 mb-2">Guestbook</h4>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Total Entries:</span>
                    <span>{siteStats.totalGuestbookEntries}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Entries Today:</span>
                    <span>5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Flagged Entries:</span>
                    <span className="text-red-600">2</span>
                  </div>
                </div>
                <div className="mt-3">
                  <Button
                    onClick={() => handleAction("Guestbook moderation opened")}
                    className="w-full bg-yellow-500 text-white font-bold py-1 px-3 border-2 border-yellow-700 rounded"
                  >
                    Moderate Guestbook
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-4 border-2 border-yellow-400 p-3 rounded-lg bg-white">
              <h4 className="font-bold text-yellow-700 mb-2">Recent Content</h4>
              <div className="space-y-2">
                <div className="border-b border-yellow-200 pb-2">
                  <div className="flex justify-between">
                    <span className="font-bold">Forum Post:</span>
                    <span className="text-sm">3/31/1999 11:30 AM</span>
                  </div>
                  <p className="text-sm">"Who's excited for The Matrix?" by RadDude1995</p>
                  <div className="flex space-x-2 mt-1">
                    <Button
                      onClick={() => handleAction("Viewing post: Who's excited for The Matrix?")}
                      className="bg-blue-500 text-white text-xs py-0 px-2 border border-blue-700 rounded"
                    >
                      View
                    </Button>
                    <Button
                      onClick={() => handleAction("Post deleted: Who's excited for The Matrix?")}
                      className="bg-red-500 text-white text-xs py-0 px-2 border border-red-700 rounded"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
                <div className="border-b border-yellow-200 pb-2">
                  <div className="flex justify-between">
                    <span className="font-bold">Guestbook Entry:</span>
                    <span className="text-sm">3/31/1999 10:15 AM</span>
                  </div>
                  <p className="text-sm">"This site is awesome!" by WebSurfer42</p>
                  <div className="flex space-x-2 mt-1">
                    <Button
                      onClick={() => handleAction("Viewing guestbook entry: This site is awesome!")}
                      className="bg-blue-500 text-white text-xs py-0 px-2 border border-blue-700 rounded"
                    >
                      View
                    </Button>
                    <Button
                      onClick={() => handleAction("Guestbook entry deleted")}
                      className="bg-red-500 text-white text-xs py-0 px-2 border border-red-700 rounded"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card className="border-4 border-red-500 p-4 rounded-lg bg-red-100">
            <h3 className="text-xl font-bold text-red-700 mb-4 underline">System Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-2 border-red-400 p-3 rounded-lg bg-white">
                <h4 className="font-bold text-red-700 mb-2">Server Status</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-bold">Status:</span>
                    <span className={`${siteStats.serverStatus === "online" ? "text-green-600" : "text-red-600"}`}>
                      {siteStats.serverStatus.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">Uptime:</span>
                    <span>42 days, 13 hours, 37 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">Last Backup:</span>
                    <span>{siteStats.lastBackup}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">Disk Usage:</span>
                    <span>{siteStats.diskUsage}</span>
                  </div>
                </div>
              </div>

              <div className="border-2 border-red-400 p-3 rounded-lg bg-white">
                <h4 className="font-bold text-red-700 mb-2">System Logs</h4>
                <div className="h-32 overflow-y-auto bg-black text-green-400 p-2 font-mono text-xs">
                  <div>[3/31/1999 12:00:00] System check completed successfully</div>
                  <div>[3/31/1999 11:45:23] User CyberGirl2000 logged in</div>
                  <div>[3/31/1999 11:30:15] New forum thread created</div>
                  <div>[3/31/1999 11:15:42] Backup completed successfully</div>
                  <div>[3/31/1999 11:00:00] Scheduled maintenance started</div>
                  <div>[3/31/1999 10:45:18] User WebSurfer42 logged in</div>
                  <div>[3/31/1999 10:30:05] Guestbook entry added</div>
                  <div>[3/31/1999 10:15:37] User RadDude1995 logged in</div>
                  <div>[3/31/1999 10:00:00] System check started</div>
                </div>
                <div className="mt-2">
                  <Button
                    onClick={() => handleAction("Viewing full system logs")}
                    className="w-full bg-red-500 text-white font-bold py-1 px-3 border-2 border-red-700 rounded"
                  >
                    View Full Logs
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-4 border-2 border-red-400 p-3 rounded-lg bg-white">
              <h4 className="font-bold text-red-700 mb-2">System Actions</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <Button
                  onClick={() => handleAction("Backup process started")}
                  className="bg-blue-500 text-white font-bold py-1 px-3 border-2 border-blue-700 rounded"
                >
                  Backup Now
                </Button>
                <Button
                  onClick={() => handleAction("Cache cleared successfully")}
                  className="bg-green-500 text-white font-bold py-1 px-3 border-2 border-green-700 rounded"
                >
                  Clear Cache
                </Button>
                <Button
                  onClick={() => handleAction("Database optimization complete")}
                  className="bg-yellow-500 text-white font-bold py-1 px-3 border-2 border-yellow-700 rounded"
                >
                  Optimize DB
                </Button>
                <Button
                  onClick={() => handleAction("Server restart initiated")}
                  className="bg-red-500 text-white font-bold py-1 px-3 border-2 border-red-700 rounded"
                >
                  Restart Server
                </Button>
              </div>
            </div>

            <div className="mt-4 bg-yellow-200 border-2 border-yellow-600 p-3 rounded">
              <p className="font-bold">⚠️ Y2K Warning ⚠️</p>
              <p>
                The year 2000 is approaching! Make sure to update your system before December 31st, 1999 to avoid
                potential issues.
              </p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}