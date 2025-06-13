import { BookOpen, Brain, BarChart2, Sparkles, PenBox, Cloud, Cherry } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#181818] text-[#fffbe6] py-0 flex flex-col">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center text-center py-20 px-4 bg-[#232323] border-b border-[#ffd60033]">
        <Image
          src="/logo.png"
          alt="MindInk Logo"
          width={90}
          height={45}
          className="h-12 w-auto rounded shadow-md border border-[#ffd60033] bg-[#181818] mb-6"
        />
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#ffd600] mb-4 drop-shadow-lg">Meet MindInk</h1>
        <p className="text-2xl md:text-3xl text-[#fffbe6]/90 max-w-2xl mx-auto mb-6">
          Your AI-powered journal for self-discovery, mood insights, and mindful growth.
        </p>
        <Link href="/dashboard" className="inline-block bg-[#ffd600] hover:bg-[#ffe066] text-[#181818] px-8 py-4 text-lg rounded-full font-bold shadow-md border border-[#ffd600] transition-colors">
          Start Journaling
        </Link>
      </section>

      {/* Features Section - horizontal cards */}
      <section className="w-full py-20 bg-[#181818]">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#ffd600]">Why MindInk?</h2>
        <div className="overflow-x-auto flex gap-8 px-8 md:px-20 pb-4 snap-x">
          {[
            {
              icon: <Brain className="h-10 w-10 text-[#ffd600] mx-auto" />,
              title: 'AI Mood Analysis',
              description: 'Reveal emotional patterns and gain actionable insights about your mood trends.'
            },
            {
              icon: <BarChart2 className="h-10 w-10 text-[#ffd600] mx-auto" />,
              title: 'Mood Analytics',
              description: 'Visualize your emotional journey with beautiful, interactive charts.'
            },
            {
              icon: <BookOpen className="h-10 w-10 text-[#ffd600] mx-auto" />,
              title: 'Intelligent Journaling',
              description: 'AI-generated summaries and prompts help you reflect and grow.'
            },
            {
              icon: <Cloud className="h-10 w-10 text-[#ffd600] mx-auto" />,
              title: 'Cloud Sync',
              description: 'Access your journal securely from any device, anytime.'
            },
            {
              icon: <Cherry className="h-10 w-10 text-[#ffd600] mx-auto" />,
              title: 'Beautiful Experience',
              description: 'A delightful, distraction-free interface designed for mindful writing.'
            },
          ].map((feature, idx) => (
            <div key={idx} className="min-w-[320px] max-w-xs bg-[#232323] border border-[#ffd60033] rounded-2xl shadow-2xl snap-center flex flex-col items-center py-8 px-6 mx-auto">
              <div className="flex flex-col items-center gap-3 mb-2">
                {feature.icon}
                <h3 className="text-xl font-bold text-[#ffd600] text-center">{feature.title}</h3>
              </div>
              <p className="text-[#fffbe6]/80 text-center text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works - vertical timeline */}
      <section className="w-full py-20 bg-[#181818] border-t border-[#ffd60033]">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#ffd600]">How It Works</h2>
        <div className="flex flex-col items-center gap-10 max-w-2xl mx-auto">
          {[
            {
              step: '1',
              title: 'Write Freely',
              description: 'Express yourself in your journal without filters or constraints.'
            },
            {
              step: '2',
              title: 'AI Analysis',
              description: 'Our system processes your entry to identify key themes and emotional tones.'
            },
            {
              step: '3',
              title: 'Get Insights',
              description: 'Receive meaningful summaries and discover patterns in your thinking.'
            },
            {
              step: '4',
              title: 'Track Progress',
              description: 'Watch your emotional journey unfold through beautiful visualizations.'
            }
          ].map((item, idx) => (
            <div key={item.step} className="flex gap-6 items-center w-full">
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-[#ffd600] text-[#181818] flex items-center justify-center font-bold text-xl mb-2">
                  {item.step}
                </div>
                {idx < 3 && <div className="w-px h-16 bg-[#ffd60033]"></div>}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2 text-[#ffd600]">{item.title}</h3>
                <p className="text-[#fffbe6]/80">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action - bold, centered */}
      <section className="w-full py-16 bg-[#232323] flex flex-col items-center justify-center border-t border-[#ffd60033]">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#ffd600] mb-6 text-center">
          Ready to start your journey?
        </h2>
        <Link 
          href="/dashboard" 
          className="inline-block bg-[#ffd600] hover:bg-[#ffe066] text-[#181818] px-10 py-5 text-xl rounded-full font-bold shadow-xl border border-[#ffd600] transition-colors"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
}