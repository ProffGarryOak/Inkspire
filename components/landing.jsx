'use client';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { SignInButton, useAuth } from '@clerk/nextjs';
import Image from 'next/image';
import { Cherry, BookOpen, Cloud, Waves, PenBox, Brain, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Landing() {
  const featuresRef = useRef(null);
  const { isSignedIn } = useAuth();

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const AuthButton = ({ children, className, isPrimary = false, variant }) => {
    if (isSignedIn) {
      return (
        <Link href="/dashboard">
          <Button variant={variant} className={className}>
            {children}
          </Button>
        </Link>
      );
    }
    return (
      <SignInButton>
        <Button variant={variant} className={className}>
          {children}
        </Button>
      </SignInButton>
    );
  };

  return (
    <div className="min-h-screen bg-[#e5e5e5] text-[#1c1c1c]">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="InkSpire Logo"
            width={120}
            height={60}
            className="h-12 w-auto"
            priority
          />
          <span className="text-2xl font-bold tracking-tighter"><h1>InkSpire</h1></span>
        </div>
        <div className="flex gap-4">
          
          <AuthButton 
            variant="outline"
            className="bg-[#b33a3a] hover:bg-[#b33a3a]/90 text-white px-5 hover:text-white"
          >
            {isSignedIn ? 'Go to Dashboard' : 'Get Started'}
          </AuthButton>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            <span className="block">Your AI-Powered</span>
            <span className="text-[#b33a3a]">Journal Companion</span>
          </h1>
          <p className="text-xl text-[#1c1c1c]/80">
            InkSpire uses advanced AI to analyze your moods and summarize your thoughts,
            helping you gain deeper self-awareness through journaling.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <AuthButton 
              className="bg-[#b33a3a] hover:bg-[#b33a3a]/90 text-white px-6 py-6 text-lg sm:px-8"
              isPrimary
            >
              <PenBox size={18} />
              {isSignedIn ? 'Continue Writing' : 'Begin Your Journey'}
            </AuthButton>
            <Button
              onClick={scrollToFeatures}
              variant="outline"
              className="border-[#1c1c1c] text-[#1c1c1c] hover:bg-[#1c1c1c]/10 px-6 py-6 text-lg sm:px-8"
            >
              Learn More
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <Image
            src="/japanese-journal.png"
            alt="Journal interface"
            width={500}
            height={500}
            priority
            className=""
          />
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="bg-white py-20">
        <Waves size={35} className="text-[#e7e7e7] mb-8 mx-auto"/>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            The <span className="text-[#b33a3a]">InkSpire</span> Difference
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="h-8 w-8 text-[#b33a3a]" />,
                title: 'AI Mood Analysis',
                description: 'Our AI detects emotional patterns and provides insights about your mood trends',
              },
              {
                icon: <Sparkles className="h-8 w-8 text-[#b33a3a]" />,
                title: 'Smart Summaries',
                description: 'Get concise summaries of your entries to spot key themes and patterns',
              },
              {
                icon: <Cloud className="h-8 w-8 text-[#b33a3a]" />,
                title: 'Cloud Sync',
                description: 'Access your journal from any device, anytime',
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow border-[#1c1c1c]/10 h-full"
              >
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-2xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[#1c1c1c]/80">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* About Button */}
          <div className="flex justify-center mt-16">
            <Link href="/about">
              <Button 
                variant="outline" 
                className="border-[#b33a3a] text-[#b33a3a] hover:bg-[#b33a3a]/10 px-8 py-6 text-lg"
              >
                Learn More About InkSpire
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[#b33a3a]/5">
        <div className="container mx-auto px-4 text-center">
          <Cherry className="h-12 w-12 text-[#b33a3a] mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Begin Your AI-Enhanced Journaling
          </h2>
          <p className="text-xl text-[#1c1c1c]/80 mb-8 max-w-2xl mx-auto">
            Join thousands discovering deeper self-awareness through intelligent journaling.
          </p>
          <AuthButton 
            className="bg-[#b33a3a] hover:bg-[#b33a3a]/90 text-white px-8 py-6 text-lg"
            isPrimary
          >
            {isSignedIn ? 'Go to Dashboard' : 'Start Writing Now'}
          </AuthButton>
        </div>
      </section>
    </div>
  );
}