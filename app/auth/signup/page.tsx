"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    userType: "",
    university: "",
    company: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Mock registration - in real app, this would be an API call
    setTimeout(() => {
      const user = {
        id: Date.now().toString(),
        email: formData.email,
        name: formData.name,
        userType: formData.userType,
        university: formData.userType === "student" ? formData.university : undefined,
        company: formData.userType === "employer" ? formData.company : undefined,
        avatar: "/placeholder.svg?height=40&width=40",
      }

      localStorage.setItem("broke2gigs_user", JSON.stringify(user))
      setIsLoading(false)
      router.push("/")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="relative w-16 h-10">
              <Image src="/broke2gigs-logo.jpg" alt="Broke2Gigs" fill className="object-contain" />
            </div>
            <span className="text-2xl font-bold text-purple-600">broke2gigs</span>
          </div>
          <CardTitle className="text-2xl font-bold">Join the hustle!</CardTitle>
          <p className="text-gray-600">Create your account and start gigging</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <Label htmlFor="userType">I am a...</Label>
              <Select
                value={formData.userType}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, userType: value }))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student looking for gigs</SelectItem>
                  <SelectItem value="employer">Employer hiring talent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                className="mt-1"
                required
              />
            </div>

            {formData.userType === "student" && (
              <div>
                <Label htmlFor="university">University</Label>
                <Input
                  id="university"
                  placeholder="e.g., UC Berkeley"
                  value={formData.university}
                  onChange={(e) => setFormData((prev) => ({ ...prev, university: e.target.value }))}
                  className="mt-1"
                  required
                />
              </div>
            )}

            {formData.userType === "employer" && (
              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  placeholder="e.g., TechStart Inc."
                  value={formData.company}
                  onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                  className="mt-1"
                  required
                />
              </div>
            )}

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              disabled={isLoading || !formData.userType}
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-purple-600 hover:text-purple-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
