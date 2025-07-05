import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "broke2gigs - We all broke, let's gig",
  description:
    "The realest freelance platform for students who hustle and startups who get it. No corporate BS, just opportunities.",
  keywords: "freelance, students, gigs, startups, jobs, remote work",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
