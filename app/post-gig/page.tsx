"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { X, Plus, DollarSign, Users } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"

export default function PostGigPage() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    requirements: "",
    budget: "",
    budgetType: "fixed",
    deadline: "",
    skills: [] as string[],
    urgent: false,
    remote: true,
  })

  const [skillInput, setSkillInput] = useState("")
  const router = useRouter()

  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("broke2gigs_user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push("/auth/login")
    }
  }, [router])

  const categories = [
    "Design",
    "Development",
    "Marketing",
    "Writing",
    "Video",
    "Photography",
    "Data Analysis",
    "Social Media",
    "Consulting",
    "Other",
  ]

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }))
      setSkillInput("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      router.push("/auth/login")
      return
    }

    const newJob = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      requirements: formData.requirements,
      category: formData.category,
      budget: formData.budget,
      budgetType: formData.budgetType,
      deadline: formData.deadline,
      skills: formData.skills,
      urgent: formData.urgent,
      remote: formData.remote,
      company: user.company || user.name,
      postedBy: user.name,
      posted: "Just now",
      location: "Remote",
      rating: 4.5,
      applicants: 0,
    }

    // Save to localStorage
    const existingJobs = JSON.parse(localStorage.getItem("broke2gigs_jobs") || "[]")
    const updatedJobs = [newJob, ...existingJobs]
    localStorage.setItem("broke2gigs_jobs", JSON.stringify(updatedJobs))

    // Reset form and redirect
    setFormData({
      title: "",
      category: "",
      description: "",
      requirements: "",
      budget: "",
      budgetType: "fixed",
      deadline: "",
      skills: [],
      urgent: false,
      remote: true,
    })

    router.push("/jobs")
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Post a <span className="text-purple-600">gig</span>
          </h1>
          <p className="text-lg text-gray-600">Find the perfect student for your project</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-purple-600" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="title" className="text-base font-medium">
                  Gig Title *
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., Design a logo for my startup"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  className="mt-2"
                />
                <p className="text-sm text-gray-500 mt-1">Be specific and clear about what you need</p>
              </div>

              <div>
                <Label htmlFor="category" className="text-base font-medium">
                  Category *
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description" className="text-base font-medium">
                  Project Description *
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your project in detail. What do you need? What's the context? What's your vision?"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  className="mt-2 min-h-[120px]"
                />
                <p className="text-sm text-gray-500 mt-1">The more details, the better applications you'll get</p>
              </div>

              <div>
                <Label htmlFor="requirements" className="text-base font-medium">
                  Requirements & Expectations
                </Label>
                <Textarea
                  id="requirements"
                  placeholder="What skills, experience, or tools do you need? Any specific requirements?"
                  value={formData.requirements}
                  onChange={(e) => setFormData((prev) => ({ ...prev, requirements: e.target.value }))}
                  className="mt-2 min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Budget & Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-teal-600" />
                Budget & Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium">Budget Type *</Label>
                <div className="flex space-x-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="fixed"
                      checked={formData.budgetType === "fixed"}
                      onCheckedChange={() => setFormData((prev) => ({ ...prev, budgetType: "fixed" }))}
                    />
                    <Label htmlFor="fixed">Fixed Price</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hourly"
                      checked={formData.budgetType === "hourly"}
                      onCheckedChange={() => setFormData((prev) => ({ ...prev, budgetType: "hourly" }))}
                    />
                    <Label htmlFor="hourly">Hourly Rate</Label>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="budget" className="text-base font-medium">
                  Budget Range *
                </Label>
                <Input
                  id="budget"
                  placeholder={formData.budgetType === "fixed" ? "e.g., $200-500" : "e.g., $15-25/hour"}
                  value={formData.budget}
                  onChange={(e) => setFormData((prev) => ({ ...prev, budget: e.target.value }))}
                  className="mt-2"
                />
                <p className="text-sm text-gray-500 mt-1">Be realistic - students need fair pay too!</p>
              </div>

              <div>
                <Label htmlFor="deadline" className="text-base font-medium">
                  Deadline
                </Label>
                <Input
                  id="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData((prev) => ({ ...prev, deadline: e.target.value }))}
                  className="mt-2"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="urgent"
                  checked={formData.urgent}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, urgent: checked as boolean }))}
                />
                <Label htmlFor="urgent" className="text-base font-medium">
                  This is urgent (will be highlighted)
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Skills & Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Skills Required</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="skills" className="text-base font-medium">
                  Add Skills
                </Label>
                <div className="flex space-x-2 mt-2">
                  <Input
                    id="skills"
                    placeholder="e.g., Figma, React, Photoshop"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                  />
                  <Button type="button" onClick={addSkill} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {formData.skills.length > 0 && (
                <div>
                  <Label className="text-base font-medium">Selected Skills</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                        <span>{skill}</span>
                        <button type="button" onClick={() => removeSkill(skill)} className="ml-1 hover:text-red-500">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remote"
                  checked={formData.remote}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, remote: checked as boolean }))}
                />
                <Label htmlFor="remote" className="text-base font-medium">
                  Remote work is okay
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-between items-center">
            <Button variant="outline" asChild>
              <Link href="/jobs">Cancel</Link>
            </Button>
            <Button type="submit" size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
              Post Gig
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
