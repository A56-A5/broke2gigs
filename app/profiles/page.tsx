"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MapPin, Star, MessageCircle, Heart, GraduationCap, Briefcase } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/navbar"

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
    portfolio: ["Mobile app redesign", "SaaS dashboard", "E-commerce site"],
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
    portfolio: ["E-commerce platform", "Social media app", "Analytics dashboard"],
    available: true,
    featured: false,
  },
  {
    id: 3,
    name: "Jordan Kim",
    title: "Social Media & Content Creator",
    university: "NYU",
    year: "Sophomore",
    location: "New York, NY",
    rating: 4.7,
    completedGigs: 18,
    hourlyRate: "$20-30",
    avatar: "/placeholder.svg?height=80&width=80",
    skills: ["TikTok", "Instagram", "Content Strategy", "Video Editing"],
    bio: "Marketing major who's grown multiple accounts to 100K+ followers. I understand Gen Z better than anyone.",
    portfolio: ["Viral TikTok campaign", "Instagram growth strategy", "Brand partnerships"],
    available: false,
    featured: true,
  },
  {
    id: 4,
    name: "Sam Rodriguez",
    title: "Data Analyst & Python Developer",
    university: "MIT",
    year: "Junior",
    location: "Boston, MA",
    rating: 4.9,
    completedGigs: 15,
    hourlyRate: "$35-50",
    avatar: "/placeholder.svg?height=80&width=80",
    skills: ["Python", "SQL", "Tableau", "Machine Learning"],
    bio: "Math & CS double major. I turn messy data into actionable insights for startups and small businesses.",
    portfolio: ["Customer segmentation analysis", "Sales forecasting model", "A/B test analysis"],
    available: true,
    featured: false,
  },
  {
    id: 5,
    name: "Riley Thompson",
    title: "Graphic Designer & Brand Strategist",
    university: "RISD",
    year: "Senior",
    location: "Providence, RI",
    rating: 4.6,
    completedGigs: 27,
    hourlyRate: "$25-40",
    avatar: "/placeholder.svg?height=80&width=80",
    skills: ["Illustrator", "Photoshop", "Branding", "Logo Design"],
    bio: "Design major with 3+ years of freelance experience. I help startups build memorable brand identities.",
    portfolio: ["Tech startup rebrand", "Restaurant logo design", "Product packaging"],
    available: true,
    featured: false,
  },
  {
    id: 6,
    name: "Casey Wu",
    title: "Video Editor & Motion Graphics",
    university: "UCLA",
    year: "Junior",
    location: "Los Angeles, CA",
    rating: 4.8,
    completedGigs: 22,
    hourlyRate: "$30-45",
    avatar: "/placeholder.svg?height=80&width=80",
    skills: ["After Effects", "Premiere Pro", "Motion Graphics", "YouTube"],
    bio: "Film major specializing in digital content. I've edited videos with millions of views for various creators.",
    portfolio: ["Startup explainer video", "Social media ads", "YouTube series"],
    available: true,
    featured: true,
  },
]

export default function ProfilesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSkill, setSelectedSkill] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [likedProfiles, setLikedProfiles] = useState<number[]>([])
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("broke2gigs_user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const allSkills = ["all", "React", "Figma", "Python", "TikTok", "Photoshop", "Node.js", "Instagram"]
  const locations = ["all", "San Francisco, CA", "New York, NY", "Los Angeles, CA", "Boston, MA"]

  const filteredProfiles = mockProfiles.filter((profile) => {
    const matchesSearch =
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesSkill = selectedSkill === "all" || profile.skills.includes(selectedSkill)
    const matchesLocation = selectedLocation === "all" || profile.location === selectedLocation

    return matchesSearch && matchesSkill && matchesLocation
  })

  const toggleLike = (profileId: number) => {
    setLikedProfiles((prev) =>
      prev.includes(profileId) ? prev.filter((id) => id !== profileId) : [...prev, profileId],
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Find <span className="text-purple-600">talent</span>
          </h1>
          <p className="text-lg text-gray-600">Discover skilled students ready to work on your projects</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search by name, skills, or title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedSkill} onValueChange={setSelectedSkill}>
              <SelectTrigger>
                <SelectValue placeholder="Skills" />
              </SelectTrigger>
              <SelectContent>
                {allSkills.map((skill) => (
                  <SelectItem key={skill} value={skill}>
                    {skill === "all" ? "All Skills" : skill}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location === "all" ? "All Locations" : location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">{filteredProfiles.length} talented students found</p>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort by: Featured</span>
          </div>
        </div>

        {/* Profile Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredProfiles.map((profile) => (
            <Card
              key={profile.id}
              className={`hover:shadow-lg transition-all duration-200 ${profile.featured ? "border-l-4 border-l-purple-500" : ""}`}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                      <AvatarFallback>
                        {profile.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-xl font-bold text-gray-900">{profile.name}</h3>
                        {profile.featured && (
                          <Badge className="bg-purple-600 hover:bg-purple-700 text-white">Featured</Badge>
                        )}
                      </div>
                      <p className="text-purple-600 font-medium mb-1">{profile.title}</p>
                      <div className="flex items-center text-sm text-gray-600 space-x-4">
                        <div className="flex items-center">
                          <GraduationCap className="h-4 w-4 mr-1" />
                          {profile.university} • {profile.year}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {profile.location}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => toggleLike(profile.id)}>
                    <Heart
                      className={`h-5 w-5 ${likedProfiles.includes(profile.id) ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                    />
                  </Button>
                </div>

                <p className="text-gray-600 mb-4">{profile.bio}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {profile.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
                      <span className="font-medium">{profile.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-1 text-gray-400" />
                      <span>{profile.completedGigs} gigs completed</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-purple-600">{profile.hourlyRate}/hr</div>
                    <div className={`text-xs ${profile.available ? "text-green-600" : "text-red-600"}`}>
                      {profile.available ? "Available now" : "Busy"}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                    <Link href={`/chat/profile/${profile.id}`}>
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Message
                    </Link>
                  </Button>
                  <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700 text-white" asChild>
                    <Link href={`/profiles/${profile.id}`}>View Profile</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Profiles
          </Button>
        </div>
      </div>
    </div>
  )
}
