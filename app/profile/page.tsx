"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Briefcase, MessageSquare, Settings } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/navbar"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [userJobs, setUserJobs] = useState<any[]>([])
  const [userChats, setUserChats] = useState<any[]>([])
  const router = useRouter()

  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: "",
    avatar: "",
  })

  useEffect(() => {
    const userData = localStorage.getItem("broke2gigs_user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setEditForm({
        name: parsedUser.name,
        avatar: parsedUser.avatar || "",
      })

      // Load user's posted jobs (if employer)
      if (parsedUser.userType === "employer") {
        const savedJobs = localStorage.getItem("broke2gigs_jobs")
        if (savedJobs) {
          const jobs = JSON.parse(savedJobs)
          const myJobs = jobs.filter((job: any) => job.postedBy === parsedUser.name)
          setUserJobs(myJobs)
        }
      }

      // Load user's chats
      const allKeys = Object.keys(localStorage)
      const chatKeys = allKeys.filter((key) => key.startsWith("chat_"))
      const chats = chatKeys.map((key) => {
        const jobId = key.replace("chat_", "")
        const messages = JSON.parse(localStorage.getItem(key) || "[]")
        return {
          jobId,
          messageCount: messages.length,
          lastMessage: messages[messages.length - 1]?.content || "No messages yet",
        }
      })
      setUserChats(chats)
    } else {
      router.push("/auth/login")
    }
  }, [router])

  const handleSaveProfile = () => {
    if (!user) return

    const updatedUser = {
      ...user,
      name: editForm.name,
      avatar: editForm.avatar,
    }

    localStorage.setItem("broke2gigs_user", JSON.stringify(updatedUser))
    setUser(updatedUser)
    setIsEditing(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("broke2gigs_user")
    router.push("/")
  }

  if (!user) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={isEditing ? editForm.avatar : user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="text-2xl">
                    {(isEditing ? editForm.name : user.name)
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">Edit</span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture URL</label>
                      <input
                        type="url"
                        value={editForm.avatar}
                        onChange={(e) => setEditForm((prev) => ({ ...prev, avatar: e.target.value }))}
                        placeholder="https://example.com/your-photo.jpg"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
                    <div className="flex items-center space-x-4 mb-3">
                      <Badge className="bg-purple-600 hover:bg-purple-700 text-white">
                        {user.userType === "student" ? "Student" : "Employer"}
                      </Badge>
                      {user.university && <span className="text-gray-600">{user.university}</span>}
                      {user.company && <span className="text-gray-600">{user.company}</span>}
                    </div>
                    <p className="text-gray-600">{user.email}</p>
                  </>
                )}
              </div>
              <div className="flex space-x-2">
                {isEditing ? (
                  <>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveProfile} className="bg-purple-600 hover:bg-purple-700 text-white">
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="jobs" className="flex items-center">
              <Briefcase className="h-4 w-4 mr-2" />
              {user.userType === "employer" ? "Posted Jobs" : "Applied Jobs"}
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account Type</span>
                    <span className="font-medium capitalize">{user.userType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Member Since</span>
                    <span className="font-medium">Today</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Chats</span>
                    <span className="font-medium">{userChats.length}</span>
                  </div>
                  {user.userType === "employer" && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Jobs Posted</span>
                      <span className="font-medium">{userJobs.length}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {user.userType === "employer" ? (
                    <>
                      <Button asChild className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                        <Link href="/post-gig">Post New Gig</Link>
                      </Button>
                      <Button variant="outline" asChild className="w-full bg-transparent">
                        <Link href="/profiles">Browse Talent</Link>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button asChild className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                        <Link href="/jobs">Find Gigs</Link>
                      </Button>
                      <Button variant="outline" asChild className="w-full bg-transparent">
                        <Link href="/profiles">View My Public Profile</Link>
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="jobs">
            <Card>
              <CardHeader>
                <CardTitle>{user.userType === "employer" ? "Your Posted Jobs" : "Your Applied Jobs"}</CardTitle>
              </CardHeader>
              <CardContent>
                {user.userType === "employer" ? (
                  userJobs.length > 0 ? (
                    <div className="space-y-4">
                      {userJobs.map((job) => (
                        <div key={job.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-gray-900">{job.title}</h3>
                            <Badge variant="secondary">{job.category}</Badge>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{job.description}</p>
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-teal-600">{job.budget}</span>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/chat/${job.id}`}>View Chats</Link>
                              </Button>
                              <Button size="sm">Edit Job</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">You haven't posted any jobs yet.</p>
                      <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white">
                        <Link href="/post-gig">Post Your First Gig</Link>
                      </Button>
                    </div>
                  )
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">You haven't applied to any jobs yet.</p>
                    <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white">
                      <Link href="/jobs">Browse Available Gigs</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Your Conversations</CardTitle>
              </CardHeader>
              <CardContent>
                {userChats.length > 0 ? (
                  <div className="space-y-4">
                    {userChats.map((chat) => (
                      <div key={chat.jobId} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {chat.jobId.startsWith("profile_")
                                ? `Profile Chat #${chat.jobId.replace("profile_", "")}`
                                : `Job #${chat.jobId}`}
                            </h3>
                            <p className="text-sm text-gray-600">{chat.messageCount} messages</p>
                            <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <Link
                              href={
                                chat.jobId.startsWith("profile_")
                                  ? `/chat/profile/${chat.jobId.replace("profile_", "")}`
                                  : `/chat/${chat.jobId}`
                              }
                            >
                              Open Chat
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No conversations yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
