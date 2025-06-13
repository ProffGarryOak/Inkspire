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
    <div className="min-h-screen bg-[#181818] text-[#fffbe6] flex flex-col">
      {/* Navigation */}
      <nav className="w-full px-0 py-6 flex justify-center items-center border-b border-[#ffd60033]">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="MindInk Logo"
            width={80}
            height={40}
            className="h-10 w-auto rounded shadow-md border border-[#ffd60033] bg-[#232323]"
            priority
          />
          <span className="text-2xl font-bold tracking-tight text-[#ffd600] font-sans"><h1>MindInk</h1></span>
        </div>
      </nav>

      {/* Hero Section - Centered, vertical, bold */}
      <section className="flex-1 flex flex-col justify-center items-center text-center px-4 py-16 gap-8">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-[#ffd600] drop-shadow-lg mb-4">
          Unlock Your Mind
        </h1>
        <p className="text-2xl md:text-3xl text-[#fffbe6]/90 max-w-2xl mx-auto mb-8">
          MindInk is your AI-powered journal companion for deep self-reflection, mood insights, and personal growth.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <AuthButton 
            className="bg-[#ffd600] hover:bg-[#ffe066] text-[#181818] px-10 py-6 text-xl rounded-full font-bold shadow-lg border border-[#ffd600]"
            isPrimary
          >
            <PenBox size={22} />
            {isSignedIn ? 'Continue Writing' : 'Start Journaling'}
          </AuthButton>
          <Button
            onClick={scrollToFeatures}
            variant="outline"
            className="border-[#ffd600] text-[#ffd600] hover:bg-[#ffd600]/10 px-10 py-6 text-xl rounded-full font-bold shadow-lg"
          >
            Explore Features
          </Button>
        </div>
      </section>

      {/* Features Section - horizontal scroll, cards pop */}
      <section ref={featuresRef} className="w-full bg-[#232323] py-20 rounded-t-3xl shadow-inner">
        <Waves size={40} className="text-[#ffd600] mb-10 mx-auto"/>
        <h2 className="text-4xl font-extrabold text-center mb-12 text-[#ffd600] tracking-tight">
          Why MindInk?
        </h2>
        <div className="overflow-x-auto flex gap-8 px-8 md:px-20 pb-4 snap-x">
          {[
            {
              icon: <Brain className="h-10 w-10 text-[#ffd600] mx-auto" />,
              title: 'AI Mood Analysis',
              description: 'Detect emotional patterns and gain actionable insights about your mood trends.',
            },
            {
              icon: <Sparkles className="h-10 w-10 text-[#ffd600] mx-auto" />,
              title: 'Smart Summaries',
              description: 'Concise AI summaries help you spot key themes and reflect on your journey.',
            },
            {
              icon: <Cloud className="h-10 w-10 text-[#ffd600] mx-auto" />,
              title: 'Cloud Sync',
              description: 'Access your journal securely from any device, anytime, anywhere.',
            },
            {
              icon: <BookOpen className="h-10 w-10 text-[#ffd600] mx-auto" />,
              title: 'Private & Secure',
              description: 'Your entries are encrypted and always yours—privacy is our promise.',
            },
            {
              icon: <Cherry className="h-10 w-10 text-[#ffd600] mx-auto" />,
              title: 'Beautiful Experience',
              description: 'A delightful, distraction-free interface designed for mindful writing.',
            },
          ].map((feature, idx) => (
            <Card key={idx} className="min-w-[320px] max-w-xs bg-[#181818] border border-[#ffd60033] rounded-2xl shadow-2xl snap-center flex flex-col items-center py-8 px-6 mx-auto">
              <CardHeader className="flex flex-col items-center gap-3 mb-2">
                {feature.icon}
                <CardTitle className="text-xl font-bold text-[#ffd600] text-center">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-[#fffbe6]/80 text-center text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Final CTA - full width, bold, different placement */}
      <section className="py-20 bg-[#181818] flex flex-col items-center justify-center border-t border-[#ffd60033]">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#ffd600] mb-6 text-center">
          Ready to Begin?
        </h2>
        <p className="text-lg md:text-2xl text-[#fffbe6]/80 mb-10 text-center max-w-xl">
          Join thousands discovering deeper self-awareness through intelligent journaling. Your story starts here.
        </p>
        <AuthButton 
          className="bg-[#ffd600] hover:bg-[#ffe066] text-[#181818] px-12 py-6 text-xl rounded-full font-bold shadow-xl border border-[#ffd600]"
          isPrimary
        >
          {isSignedIn ? 'Go to Dashboard' : 'Start Writing Now'}
        </AuthButton>
      </section>
    </div>
  );
}