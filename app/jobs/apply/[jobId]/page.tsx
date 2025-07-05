"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle, DollarSign, Clock, MapPin } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/navbar"

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
  requirements?: string
}

export default function JobApplicationPage() {
  const params = useParams()
  const router = useRouter()
  const jobId = params.jobId as string

  const [user, setUser] = useState<any>(null)
  const [job, setJob] = useState<Job | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [applicationData, setApplicationData] = useState({
    coverLetter: "",
    proposedRate: "",
    timeline: "",
    portfolio: "",
    experience: "",
  })

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
      } else {
        router.push("/jobs")
      }
    }

    // Check if already applied
    const applications = JSON.parse(localStorage.getItem("broke2gigs_applications") || "[]")
    const existingApplication = applications.find(
      (app: any) => app.jobId === jobId && app.applicantId === JSON.parse(userData || "{}").id,
    )
    if (existingApplication) {
      setIsSubmitted(true)
    }
  }, [jobId, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !job) return

    setIsLoading(true)

    // Create application
    const application = {
      id: Date.now().toString(),
      jobId: jobId,
      jobTitle: job.title,
      applicantId: user.id,
      applicantName: user.name,
      applicantEmail: user.email,
      applicantType: user.userType,
      university: user.university,
      coverLetter: applicationData.coverLetter,
      proposedRate: applicationData.proposedRate,
      timeline: applicationData.timeline,
      portfolio: applicationData.portfolio,
      experience: applicationData.experience,
      appliedAt: new Date().toISOString(),
      status: "pending",
    }

    // Save application
    const existingApplications = JSON.parse(localStorage.getItem("broke2gigs_applications") || "[]")
    const updatedApplications = [...existingApplications, application]
    localStorage.setItem("broke2gigs_applications", JSON.stringify(updatedApplications))

    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1500)
  }

  if (!user || !job) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">Loading...</div>
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="text-center">
            <CardContent className="p-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h1>
              <p className="text-gray-600 mb-6">
                Your application for "{job.title}" has been sent to {job.company}. They'll review it and get back to you
                soon.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild variant="outline">
                  <Link href="/jobs">Browse More Gigs</Link>
                </Button>
                <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Link href={`/chat/${jobId}`}>Message Employer</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/jobs">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Jobs
            </Link>
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Apply for <span className="text-purple-600">gig</span>
          </h1>
          <p className="text-lg text-gray-600">Show them why you're the perfect fit</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
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

          {/* Application Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Application</CardTitle>
                <p className="text-sm text-gray-600">Tell {job.company} why you're the perfect person for this gig</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="coverLetter" className="text-base font-medium">
                      Cover Letter *
                    </Label>
                    <Textarea
                      id="coverLetter"
                      placeholder="Introduce yourself and explain why you're interested in this project. What makes you the right fit?"
                      value={applicationData.coverLetter}
                      onChange={(e) => setApplicationData((prev) => ({ ...prev, coverLetter: e.target.value }))}
                      className="mt-2 min-h-[120px]"
                      required
                    />
                    <p className="text-sm text-gray-500 mt-1">Be authentic and show your personality!</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="proposedRate" className="text-base font-medium">
                        Your Rate
                      </Label>
                      <Input
                        id="proposedRate"
                        placeholder="e.g., $25/hour or $500 total"
                        value={applicationData.proposedRate}
                        onChange={(e) => setApplicationData((prev) => ({ ...prev, proposedRate: e.target.value }))}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="timeline" className="text-base font-medium">
                        Timeline
                      </Label>
                      <Input
                        id="timeline"
                        placeholder="e.g., 1 week, 3-5 days"
                        value={applicationData.timeline}
                        onChange={(e) => setApplicationData((prev) => ({ ...prev, timeline: e.target.value }))}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="experience" className="text-base font-medium">
                      Relevant Experience
                    </Label>
                    <Textarea
                      id="experience"
                      placeholder="Describe any relevant experience, projects, or skills that make you qualified for this gig"
                      value={applicationData.experience}
                      onChange={(e) => setApplicationData((prev) => ({ ...prev, experience: e.target.value }))}
                      className="mt-2 min-h-[100px]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="portfolio" className="text-base font-medium">
                      Portfolio/Work Samples
                    </Label>
                    <Input
                      id="portfolio"
                      placeholder="Link to your portfolio, GitHub, Behance, etc."
                      value={applicationData.portfolio}
                      onChange={(e) => setApplicationData((prev) => ({ ...prev, portfolio: e.target.value }))}
                      className="mt-2"
                    />
                    <p className="text-sm text-gray-500 mt-1">Show them what you can do!</p>
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t">
                    <Button variant="outline" asChild>
                      <Link href="/jobs">Cancel</Link>
                    </Button>
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isLoading || !applicationData.coverLetter}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      {isLoading ? "Submitting..." : "Submit Application"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
