"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, MapPin, Clock, Star, Heart, MessageCircle } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/navbar"

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedBudget, setSelectedBudget] = useState("all")
  const [likedJobs, setLikedJobs] = useState<number[]>([])

  const categories = ["all", "Design", "Development", "Marketing", "Writing", "Video"]
  const budgetRanges = ["all", "$0-200", "$200-500", "$500-1000", "$1000+"]

  useEffect(() => {
    // Load user
    const userData = localStorage.getItem("broke2gigs_user")
    if (userData) {
      setUser(JSON.parse(userData))
    }

    // Load jobs from localStorage
    const savedJobs = localStorage.getItem("broke2gigs_jobs")
    if (savedJobs) {
      setJobs(JSON.parse(savedJobs))
    } else {
      // Set default mock jobs if none exist
      const defaultJobs = [
        {
          id: 1,
          title: "Design Instagram Posts for Fitness App",
          company: "FitStart",
          budget: "$200-400",
          category: "Design",
          location: "Remote",
          posted: "2 hours ago",
          urgent: true,
          description:
            "Need 10 Instagram posts designed for our new fitness app launch. Looking for someone who gets Gen Z aesthetics.",
          skills: ["Figma", "Instagram", "Social Media"],
          rating: 4.9,
          applicants: 12,
          postedBy: "Demo Employer",
          deadline: "2024-01-15",
        },
        {
          id: 2,
          title: "Web designer",
          company: "TechFlow",
          budget: "$100-150",
          category: "Marketing",
          location: "Remote",
          posted: "Just now",
          urgent: true,
          description: "Talent people in designing websites",
          skills: ["HTML", "CSS", "JavaScript"],
          rating: 4.5,
          applicants: 0,
          postedBy: "Alex Chen",
          deadline: "2024-01-20",
        },
        // Add more default jobs...
      ]
      localStorage.setItem("broke2gigs_jobs", JSON.stringify(defaultJobs))
      setJobs(defaultJobs)
    }
  }, [])

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || job.category === selectedCategory

    const matchesBudget =
      selectedBudget === "all" ||
      (selectedBudget === "$0-200" && Number.parseInt(job.budget.split("-")[0].replace("$", "")) <= 200) ||
      (selectedBudget === "$200-500" &&
        Number.parseInt(job.budget.split("-")[0].replace("$", "")) >= 200 &&
        Number.parseInt(job.budget.split("-")[1].replace("$", "")) <= 500) ||
      (selectedBudget === "$500-1000" &&
        Number.parseInt(job.budget.split("-")[0].replace("$", "")) >= 500 &&
        Number.parseInt(job.budget.split("-")[1].replace("$", "")) <= 1000) ||
      (selectedBudget === "$1000+" && Number.parseInt(job.budget.split("-")[1].replace("$", "")) > 1000)

    return matchesSearch && matchesCategory && matchesBudget
  })

  const toggleLike = (jobId: number) => {
    setLikedJobs((prev) => (prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Find your next <span className="text-purple-600">gig</span>
          </h1>
          <p className="text-lg text-gray-600">Fresh opportunities from startups who get it</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search gigs, companies, skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="md:col-span-1">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-1">
              <Select value={selectedBudget} onValueChange={setSelectedBudget}>
                <SelectTrigger>
                  <SelectValue placeholder="Budget" />
                </SelectTrigger>
                <SelectContent>
                  {budgetRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range === "all" ? "All Budgets" : range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">{filteredJobs.length} gigs found</p>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">Sort by: Latest</span>
          </div>
        </div>

        {/* Job Cards */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-purple-500">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                        {job.category}
                      </Badge>
                      {job.urgent && (
                        <Badge variant="destructive" className="bg-red-100 text-red-700 border-red-200">
                          URGENT
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-purple-600 cursor-pointer">
                      {job.title}
                    </h3>
                    <p className="text-gray-600 mb-3">{job.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => toggleLike(job.id)} className="ml-4">
                    <Heart
                      className={`h-5 w-5 ${likedJobs.includes(job.id) ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                    />
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <span className="font-medium text-gray-900">{job.company}</span>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {job.posted}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
                      {job.rating}
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end space-x-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">{job.budget}</div>
                      <div className="text-sm text-gray-500">{job.applicants} applicants</div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/chat/${job.id}`}>
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Chat
                        </Link>
                      </Button>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white" asChild>
                        <Link href={`/jobs/apply/${job.id}`}>Apply Now!</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Gigs
          </Button>
        </div>
      </div>
    </div>
  )
}
