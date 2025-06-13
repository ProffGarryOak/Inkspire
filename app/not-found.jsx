'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Cherry, Scroll, Mountain, Sparkles } from 'lucide-react'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#181818] text-[#fffbe6] flex flex-col relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 opacity-10">
          <Cherry className="h-24 w-24 text-[#ffd600]" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-10">
          <Mountain className="h-24 w-24 text-[#ffd600]" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">
          <Sparkles className="h-40 w-40 text-[#ffd600]" />
        </div>
      </div>

      <main className="flex-grow flex flex-col items-center justify-center p-8 text-center relative z-10">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-8">
          {/* 404 Illustration */}
          <div className="relative mb-2">
            <Scroll className="h-36 w-36 mx-auto text-[#ffd600] drop-shadow-xl" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl font-extrabold text-[#ffd600] drop-shadow-lg">404</span>
            </div>
          </div>

          {/* Message */}
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-[#ffd600] drop-shadow-lg">
            Lost in Thought?
          </h1>
          <p className="text-2xl text-[#fffbe6]/80 mb-8 max-w-lg mx-auto">
            Oops! The page you seek has wandered off. Let MindInk guide you back to your journaling journey.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/" passHref>
              <Button className="bg-[#ffd600] hover:bg-[#ffe066] text-[#181818] px-8 py-6 text-lg rounded-full font-bold shadow-md border border-[#ffd600]">
                Return Home
              </Button>
            </Link>
            <Link href="/dashboard" passHref>
              <Button variant="outline" className="border-[#ffd600] text-[#ffd600] hover:bg-[#ffd600]/10 px-8 py-6 text-lg rounded-full font-bold shadow-md">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}