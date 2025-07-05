"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, MapPin, Star, GraduationCap } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/navbar"

interface Message {
  id: string
  sender: string
  senderType: "student" | "employer"
  content: string
  timestamp: string
}

const mockProfiles = [
  {
    id: 1,
    name: "Alex Chen",
    title: "UI/UX Designer & Frontend Dev",
    university: "UC Berkeley",
    year: "Junior",
    location: "San Francisco, CA",
    rating: 4.9,
    completedGigs: 23,
    hourlyRate: "$25-35",
    avatar: "/placeholder.svg?height=80&width=80",
    skills: ["Figma", "React", "Tailwind", "Prototyping"],
    bio: "CS major with a passion for creating beautiful, user-friendly interfaces. I've helped 20+ startups with their design needs.",
    available: true,
    featured: true,
  },
  {
    id: 2,
    name: "Maya Patel",
    title: "Full-Stack Developer",
    university: "Stanford",
    year: "Senior",
    location: "Palo Alto, CA",
    rating: 4.8,
    completedGigs: 31,
    hourlyRate: "$30-45",
    avatar: "/placeholder.svg?height=80&width=80",
    skills: ["React", "Node.js", "Python", "AWS"],
    bio: "Computer Science senior specializing in web development. I love building MVPs for early-stage startups.",
    available: true,
    featured: false,
  },
]

export default function ProfileChatPage() {
  const params = useParams()
  const router = useRouter()
  const profileId = params.profileId as string
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    // Load user
    const userData = localStorage.getItem("broke2gigs_user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push("/auth/login")
      return
    }

    // Find profile
    const foundProfile = mockProfiles.find((p) => p.id.toString() === profileId)
    if (foundProfile) {
      setProfile(foundProfile)
    } else {
      router.push("/profiles")
      return
    }

    // Load messages
    const savedMessages = localStorage.getItem(`chat_profile_${profileId}`)
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages))
    }
  }, [profileId, router])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const sendMessage = () => {
    if (!newMessage.trim() || !user) return

    const message: Message = {
      id: Date.now().toString(),
      sender: user.name,
      senderType: user.userType,
      content: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    const updatedMessages = [...messages, message]
    setMessages(updatedMessages)
    localStorage.setItem(`chat_profile_${profileId}`, JSON.stringify(updatedMessages))
    setNewMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (!user || !profile) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Details Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Talent Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <Avatar className="h-20 w-20 mx-auto mb-3">
                    <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                    <AvatarFallback className="text-lg">
                      {profile.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-gray-900 mb-1">{profile.name}</h3>
                  <p className="text-purple-600 font-medium mb-2">{profile.title}</p>
                  {profile.featured && (
                    <Badge className="bg-purple-600 hover:bg-purple-700 text-white mb-2">Featured</Badge>
                  )}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <GraduationCap className="h-4 w-4 mr-2 text-gray-400" />
                    <span>
                      {profile.university} • {profile.year}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{profile.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-2 text-yellow-500 fill-current" />
                    <span>
                      {profile.rating} ({profile.completedGigs} gigs)
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-1">{profile.hourlyRate}/hr</div>
                    <div
                      className={`text-sm px-2 py-1 rounded ${profile.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                    >
                      {profile.available ? "Available now" : "Busy"}
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Skills:</p>
                  <div className="flex flex-wrap gap-1">
                    {profile.skills.map((skill: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <Link href={`/profiles/${profile.id}`}>View Full Profile</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              {/* Chat Header */}
              <CardHeader className="border-b">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                    <AvatarFallback>
                      {profile.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">{profile.name}</h3>
                    <p className="text-sm text-gray-600">{profile.university}</p>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-500 mt-8">
                    <p className="mb-2">Start a conversation with {profile.name}!</p>
                    <p className="text-sm">Introduce yourself and discuss potential collaboration opportunities.</p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === user.name ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender === user.name
                            ? "bg-purple-600 hover:bg-purple-700 text-white"
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender === user.name ? "text-purple-100" : "text-gray-500"
                          }`}
                        >
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </CardContent>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder={`Message ${profile.name}...`}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
