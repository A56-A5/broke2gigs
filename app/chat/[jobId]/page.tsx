"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, MapPin, DollarSign, Clock } from "lucide-react"
import Navbar from "@/components/navbar"

interface Message {
  id: string
  sender: string
  senderType: "student" | "employer"
  content: string
  timestamp: string
}

interface Job {
  id: number
  title: string
  company: string
  budget: string
  category: string
  description: string
  postedBy: string
  deadline: string
  skills: string[]
}

export default function JobChatPage() {
  const params = useParams()
  const router = useRouter()
  const jobId = params.jobId as string
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [user, setUser] = useState<any>(null)
  const [job, setJob] = useState<Job | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [otherUser, setOtherUser] = useState<any>(null)

  useEffect(() => {
    // Load user
    const userData = localStorage.getItem("broke2gigs_user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push("/auth/login")
      return
    }

    // Load job details
    const savedJobs = localStorage.getItem("broke2gigs_jobs")
    if (savedJobs) {
      const jobs = JSON.parse(savedJobs)
      const foundJob = jobs.find((j: Job) => j.id.toString() === jobId)
      if (foundJob) {
        setJob(foundJob)

        // Set other user (employer if current user is student, vice versa)
        if (JSON.parse(userData).userType === "student") {
          setOtherUser({
            name: foundJob.postedBy,
            type: "employer",
            company: foundJob.company,
          })
        } else {
          // For demo, create a mock student
          setOtherUser({
            name: "Alex Chen",
            type: "student",
            university: "UC Berkeley",
          })
        }
      }
    }

    // Load messages
    const savedMessages = localStorage.getItem(`chat_${jobId}`)
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages))
    }
  }, [jobId, router])

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
    localStorage.setItem(`chat_${jobId}`, JSON.stringify(updatedMessages))
    setNewMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (!user || !job) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Job Details Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{job.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{job.description}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Badge variant="secondary" className="mr-2">
                      {job.category}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="h-4 w-4 mr-2" />
                    {job.budget}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    Deadline: {job.deadline}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    Remote
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Skills Required:</p>
                  <div className="flex flex-wrap gap-1">
                    {job.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-600">Posted by</p>
                  <p className="font-medium">{job.postedBy}</p>
                  <p className="text-sm text-gray-500">{job.company}</p>
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
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt={otherUser?.name} />
                    <AvatarFallback>
                      {otherUser?.name
                        ?.split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">{otherUser?.name}</h3>
                    <p className="text-sm text-gray-600">
                      {otherUser?.type === "employer" ? otherUser.company : otherUser.university}
                    </p>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-500 mt-8">
                    <p>No messages yet. Start the conversation!</p>
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
                    placeholder="Type your message..."
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
