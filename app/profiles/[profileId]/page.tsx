"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, Star, GraduationCap, MapPin, Heart } from "lucide-react"
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
    fullBio:
      "I'm a junior at UC Berkeley studying Computer Science with a focus on human-computer interaction. I've been freelancing for over 2 years and have worked with startups ranging from early-stage to Series A. My passion lies in creating intuitive, beautiful interfaces that users love to interact with. I believe great design should be accessible to everyone, especially startups who are just getting started.",
    experience: [
      {
        title: "UI/UX Designer",
        company: "TechStart Inc.",
        duration: "6 months",
        description: "Redesigned their entire mobile app, increasing user engagement by 40%",
      },
      {
        title: "Frontend Developer",
        company: "GrowthHack",
        duration: "3 months",
        description: "Built responsive landing pages that improved conversion rates by 25%",
      },
    ],
    reviews: [
      {
        client: "Sarah Johnson",
        company: "StartupXYZ",
        rating: 5,
        comment:
          "Alex delivered exceptional work on our mobile app redesign. Professional, creative, and met all deadlines!",
      },
      {
        client: "Mike Chen",
        company: "TechFlow",
        rating: 5,
        comment: "Amazing attention to detail and great communication throughout the project.",
      },
    ],
  },
  // Add other profiles with similar structure...
]

export default function ProfileDetailPage() {
  const params = useParams()
  const router = useRouter()
  const profileId = Number.parseInt(params.profileId as string)

  const [profile, setProfile] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    // Load user
    const userData = localStorage.getItem("broke2gigs_user")
    if (userData) {
      setUser(JSON.parse(userData))
    }

    // Find profile
    const foundProfile = mockProfiles.find((p) => p.id === profileId)
    if (foundProfile) {
      setProfile(foundProfile)
    } else {
      router.push("/profiles")
    }
  }, [profileId, router])

  if (!profile) {
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
            <div className="flex items-start space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                <AvatarFallback className="text-2xl">
                  {profile.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
                  {profile.featured && <Badge className="bg-purple-600 hover:bg-purple-700 text-white">Featured</Badge>}
                </div>
                <p className="text-xl text-purple-600 font-medium mb-3">{profile.title}</p>
                <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <GraduationCap className="h-4 w-4 mr-1" />
                    {profile.university} • {profile.year}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {profile.location}
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
                    <span className="font-medium">{profile.rating}</span>
                    <span className="text-gray-500 ml-1">({profile.completedGigs} gigs)</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-2xl font-bold text-purple-600">{profile.hourlyRate}/hr</div>
                  <div
                    className={`text-sm px-2 py-1 rounded ${profile.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                  >
                    {profile.available ? "Available now" : "Busy"}
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <Button variant="ghost" size="sm" onClick={() => setIsLiked(!isLiked)}>
                  <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
                </Button>
                <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Link href={`/chat/profile/${profile.id}`}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details */}
        <Tabs defaultValue="about" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="about">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>About Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{profile.fullBio}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill: string, index: number) => (
                      <Badge key={index} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="portfolio">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {profile.portfolio.map((item: string, index: number) => (
                    <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="w-full h-32 bg-gray-200 rounded mb-3 flex items-center justify-center">
                        <span className="text-gray-500">Portfolio Item</span>
                      </div>
                      <h3 className="font-medium text-gray-900">{item}</h3>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experience">
            <Card>
              <CardHeader>
                <CardTitle>Work Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {profile.experience.map((exp: any, index: number) => (
                    <div key={index} className="border-l-4 border-l-purple-500 pl-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                        <span className="text-sm text-gray-500">{exp.duration}</span>
                      </div>
                      <p className="text-purple-600 font-medium mb-2">{exp.company}</p>
                      <p className="text-gray-600">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Client Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {profile.reviews.map((review: any, index: number) => (
                    <div key={index} className="border-b pb-6 last:border-b-0">
                      <div className="flex items-center space-x-4 mb-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {review.client
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium text-gray-900">{review.client}</h4>
                          <p className="text-sm text-gray-600">{review.company}</p>
                        </div>
                        <div className="flex items-center ml-auto">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
