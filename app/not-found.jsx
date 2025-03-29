'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Cherry, Scroll, Mountain } from 'lucide-react'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#e5e5e5] text-[#1c1c1c] flex flex-col">
      {/* Decorative Japanese Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 opacity-10">
          <Cherry className="h-24 w-24 text-[#b33a3a]" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-10">
          <Mountain className="h-24 w-24 text-[#1c1c1c]" />
        </div>
      </div>

      <main className="flex-grow flex flex-col items-center justify-center p-8 text-center relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* InkSpire Logo */}
          {/* <div className="flex justify-center mb-6">
            <Image
              src="/logo.png"
              alt="InkSpire Logo"
              width={240}
              height={120}
              className="h-16 w-auto"
            />
          </div> */}

          {/* 404 Illustration */}
          <div className="relative mb-8">
            <Scroll className="h-32 w-32 mx-auto text-[#b33a3a]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-[#b33a3a]">404</span>
            </div>
          </div>

          {/* Message */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#1c1c1c]">
            Page Not Found
          </h1>
          <p className="text-xl text-[#1c1c1c]/80 mb-8 max-w-lg mx-auto">
            The page you're looking for has either been moved or doesn't exist.
            
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/" passHref>
              <Button className="bg-[#b33a3a] hover:bg-[#b33a3a]/90 text-white px-8 py-6 text-lg">
                Return Home
              </Button>
            </Link>
            <Link href="/dashboard" passHref>
              <Button variant="outline" className="border-[#1c1c1c] text-[#1c1c1c] hover:bg-[#1c1c1c]/10 px-8 py-6 text-lg">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </main>

      
    </div>
  )
}