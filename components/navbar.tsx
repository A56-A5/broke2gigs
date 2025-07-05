"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Settings, LogOut, MessageSquare, Briefcase } from "lucide-react"
import Image from "next/image"

export default function Navbar() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("broke2gigs_user")
    if (userData) {
      setUser(JSON.parse(userData))
    }

    // Listen for storage changes to update navbar when user logs in/out
    const handleStorageChange = () => {
      const userData = localStorage.getItem("broke2gigs_user")
      if (userData) {
        setUser(JSON.parse(userData))
      } else {
        setUser(null)
      }
    }

    window.addEventListener("storage", handleStorageChange)

    // Custom event for same-tab updates
    window.addEventListener("userChanged", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("userChanged", handleStorageChange)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("broke2gigs_user")
    setUser(null)
    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new Event("userChanged"))
    router.push("/")
  }

  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-12 h-8">
              <Image src="/broke2gigs-logo.jpg" alt="Broke2Gigs" fill className="object-contain" priority />
            </div>
            <span className="text-xl font-bold text-purple-600">broke2gigs</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/jobs" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Find Gigs
            </Link>
            <Link href="/post-gig" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Post a Gig
            </Link>
            <Link href="/profiles" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Talent
            </Link>
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 hover:bg-gray-100">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback className="text-sm">
                        {user.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{user.userType}</p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center cursor-pointer">
                      <User className="h-4 w-4 mr-2" />
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center cursor-pointer">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Messages
                    </Link>
                  </DropdownMenuItem>
                  {user.userType === "employer" && (
                    <DropdownMenuItem asChild>
                      <Link href="/post-gig" className="flex items-center cursor-pointer">
                        <Briefcase className="h-4 w-4 mr-2" />
                        Post a Gig
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center cursor-pointer">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center cursor-pointer text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link href="/auth/login">Sign In</Link>
                </Button>
                <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Link href="/auth/signup">Join Now</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
