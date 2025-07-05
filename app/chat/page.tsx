"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, Paperclip, Phone, Video, MoreVertical, Search } from "lucide-react"
import Link from "next/link"

const mockConversations = [
  {
    id: 1,
    name: "Alex Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Sounds good! I can start on the logo designs tomorrow.",
    timestamp: "2 min ago",
    unread: 2,
    online: true,
    gigTitle: "Logo Design for AI Startup",
  },
  {
    id: 2,
    name: "Maya Patel",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I've uploaded the first version of the dashboard. Check it out!",
    timestamp: "1 hour ago",
    unread: 0,
    online: true,
    gigTitle: "React Dashboard Development",
  },
  {
    id: 3,
    name: "Jordan Kim",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "The TikTok strategy document is ready for review",
    timestamp: "3 hours ago",
    unread: 1,
    online: false,
    gigTitle: "TikTok Content Strategy",
  },
  {
    id: 4,
    name: "Sam Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for the feedback! I'll adjust the analysis accordingly.",
    timestamp: "1 day ago",
    unread: 0,
    online: false,
    gigTitle: "Data Analysis Project",
  },
]

const mockMessages = [
  {
    id: 1,
    sender: "Alex Chen",
    content: "Hey! Thanks for choosing me for the logo project. I'm excited to work with you!",
    timestamp: "10:30 AM",
    isMe: false,
  },
  {
    id: 2,
    sender: "You",
    content: "Hi Alex! I'm excited too. I saw your portfolio and your style is exactly what we're looking for.",
    timestamp: "10:32 AM",
    isMe: true,
  },
  {
    id: 3,
    sender: "Alex Chen",
    content: "Awesome! Can you tell me more about your startup? What's the vibe you're going for?",
    timestamp: "10:33 AM",
    isMe: false,
  },
  {
    id: 4,
    sender: "You",
    content:
      "We're building an AI tool for content creators. Think modern, clean, but with some personality. Not too corporate.",
    timestamp: "10:35 AM",
    isMe: true,
  },
  {
    id: 5,
    sender: "Alex Chen",
    content:
      "Perfect! I love working with startups that want to break the mold. I'm thinking we could explore some geometric shapes with a tech feel but keep it approachable.",
    timestamp: "10:37 AM",
    isMe: false,
  },
  {
    id: 6,
    sender: "You",
    content: "That sounds exactly right! What's your timeline looking like?",
    timestamp: "10:40 AM",
    isMe: true,
  },
  {
    id: 7,
    sender: "Alex Chen",
    content:
      "I can have the first concepts ready by tomorrow afternoon. Usually I do 3-4 initial directions and we can refine from there.",
    timestamp: "10:42 AM",
    isMe: false,
  },
  {
    id: 8,
    sender: "Alex Chen",
    content: "Sounds good! I can start on the logo designs tomorrow.",
    timestamp: "10:45 AM",
    isMe: false,
  },
]

export default function ChatPage() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0])
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredConversations = mockConversations.filter(
    (conv) =>
      conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.gigTitle.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B2G</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
                broke2gigs
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link href="/jobs">Browse Gigs</Link>
              </Button>
              <Button asChild className="bg-gradient-to-r from-purple-600 to-teal-600">
                <Link href="/profile">Profile</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Conversations Sidebar */}
        <div className="w-80 border-r bg-white flex flex-col">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedConversation.id === conversation.id ? "bg-purple-50 border-r-4 border-r-purple-500" : ""
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                      <AvatarFallback>
                        {conversation.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">{conversation.name}</h3>
                      <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{conversation.gigTitle}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                      {conversation.unread > 0 && (
                        <Badge className="bg-purple-600 text-white text-xs">{conversation.unread}</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b bg-white flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={selectedConversation.avatar || "/placeholder.svg"} alt={selectedConversation.name} />
                <AvatarFallback>
                  {selectedConversation.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-gray-900">{selectedConversation.name}</h3>
                <p className="text-sm text-gray-600">{selectedConversation.gigTitle}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {mockMessages.map((message) => (
              <div key={message.id} className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.isMe
                      ? "bg-gradient-to-r from-purple-600 to-teal-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${message.isMe ? "text-purple-100" : "text-gray-500"}`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t bg-white">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1"
              />
              <Button onClick={sendMessage} className="bg-gradient-to-r from-purple-600 to-teal-600">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
