"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock users database
const mockUsers = [
  {
    email: "alex@student.com",
    password: "password123",
    name: "Alex Chen",
    userType: "student",
    university: "UC Berkeley",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    email: "maya@student.com",
    password: "password123",
    name: "Maya Patel",
    userType: "student",
    university: "Stanford",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    email: "sarah@company.com",
    password: "password123",
    name: "Sarah Johnson",
    userType: "employer",
    company: "TechStart Inc.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    email: "mike@startup.com",
    password: "password123",
    name: "Mike Chen",
    userType: "employer",
    company: "StartupXYZ",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Find user in mock database
    const foundUser = mockUsers.find((user) => user.email === formData.email && user.password === formData.password)

    setTimeout(() => {
      if (foundUser) {
        const user = {
          id: Date.now().toString(),
          ...foundUser,
        }

        localStorage.setItem("broke2gigs_user", JSON.stringify(user))
        // Dispatch custom event for navbar update
        window.dispatchEvent(new Event("userChanged"))
        setIsLoading(false)
        router.push("/")
      } else {
        setError("Invalid email or password. Try the demo accounts below.")
        setIsLoading(false)
      }
    }, 1000)
  }

  const quickLogin = (userEmail: string) => {
    const user = mockUsers.find((u) => u.email === userEmail)
    if (user) {
      setFormData({
        email: user.email,
        password: user.password,
        userType: user.userType,
      })
    }
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
          <CardTitle className="text-2xl font-bold">Welcome back!</CardTitle>
          <p className="text-gray-600">Sign in to continue your hustle</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
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

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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

            {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</div>}

            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="text-purple-600 hover:text-purple-700 font-medium">
                Sign up
              </Link>
            </p>
          </div>

          {/* Demo accounts */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-3">Quick Demo Login:</p>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => quickLogin("alex@student.com")}
                  className="text-xs"
                >
                  Alex (Student)
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => quickLogin("maya@student.com")}
                  className="text-xs"
                >
                  Maya (Student)
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => quickLogin("sarah@company.com")}
                  className="text-xs"
                >
                  Sarah (Employer)
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => quickLogin("mike@startup.com")}
                  className="text-xs"
                >
                  Mike (Employer)
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">Click any button to auto-fill login details</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
