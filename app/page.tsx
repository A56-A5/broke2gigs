"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Users, Zap, Heart, Star, Briefcase } from "lucide-react"
import Navbar from "@/components/navbar"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6">
              We all <span className="text-purple-600">broke</span>
              ,<br />
              let's <span className="text-purple-600">gig</span>.
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto font-medium">
              The realest freelance platform for students who hustle and startups who get it. No corporate BS, just
              opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" asChild className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-6">
                <Link href="/jobs" className="flex items-center">
                  Find Gigs <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-lg px-8 py-6 border-2 border-purple-600 text-purple-600 hover:bg-purple-50 bg-transparent"
              >
                <Link href="/post-gig" className="flex items-center">
                  Hire Talent <Briefcase className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-purple-300 rounded-full opacity-60 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-20 w-12 h-12 bg-purple-200 rounded-full opacity-60 animate-pulse delay-500"></div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Built different, for the <span className="text-purple-600">different</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            We're not another corporate job board. We're a community where broke students meet startups who remember
            what it's like to bootstrap. Real opportunities, fair pay, zero gatekeeping.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Community First</h3>
              <p className="text-gray-600">By students, for students. We get the struggle.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Move Fast</h3>
              <p className="text-gray-600">Quick matches, faster payments, no bureaucracy.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fair & Real</h3>
              <p className="text-gray-600">Transparent pricing, honest reviews, authentic connections.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Gigs Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Hot gigs right now 🔥</h2>
            <p className="text-lg text-gray-600">Fresh opportunities posted by real startups</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              {
                title: "Logo Design for AI Startup",
                budget: "$150-300",
                category: "Design",
                company: "TechFlow",
                urgent: true,
              },
              {
                title: "Social Media Content Creator",
                budget: "$200-500",
                category: "Marketing",
                company: "GrowthHack",
                urgent: false,
              },
              {
                title: "React Developer - MVP Build",
                budget: "$800-1200",
                category: "Development",
                company: "StartupXYZ",
                urgent: true,
              },
            ].map((gig, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded">
                      {gig.category}
                    </span>
                    {gig.urgent && (
                      <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded">URGENT</span>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{gig.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">by {gig.company}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-purple-600">{gig.budget}</span>
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">4.8</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
              <Link href="/jobs">View All Gigs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to level up your hustle?</h2>
          <p className="text-xl text-purple-100 mb-8">Join thousands of students already making moves on broke2gigs</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="bg-white text-purple-600 hover:bg-gray-100">
              <Link href="/signup">Join as Student</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
            >
              <Link href="/signup">Hire Students</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative w-8 h-6">
                  <img src="/broke2gigs-logo.jpg" alt="Broke2Gigs" className="object-contain w-full h-full" />
                </div>
                <span className="text-xl font-bold">broke2gigs</span>
              </div>
              <p className="text-gray-400">We all broke, let's gig.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">For Students</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/jobs" className="hover:text-white">
                    Find Gigs
                  </Link>
                </li>
                <li>
                  <Link href="/profiles" className="hover:text-white">
                    Create Profile
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="hover:text-white">
                    Resources
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">For Employers</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/post-gig" className="hover:text-white">
                    Post a Gig
                  </Link>
                </li>
                <li>
                  <Link href="/talent" className="hover:text-white">
                    Find Talent
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Community</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-white">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 broke2gigs. Made with ❤️ by broke students, for broke students.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
