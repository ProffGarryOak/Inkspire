import { BookOpen, Brain, BarChart2, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#e5e5e5] text-[#1c1c1c] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Image
              src="/logo.png"
              alt="InkSpire Logo"
              width={120}
              height={60}
              className="h-16 w-auto"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About InkSpire</h1>
          <p className="text-xl text-[#1c1c1c]/80 max-w-2xl mx-auto">
            Your AI-powered journaling companion that helps you understand yourself better through intelligent reflection and mood analysis.
          </p>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Sparkles className="text-[#b33a3a]" />
            Why InkSpire?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: <Brain className="h-8 w-8 text-[#b33a3a]" />,
                title: "AI-Powered Insights",
                description: "Our advanced AI analyzes your entries to uncover patterns and provide meaningful reflections about your thoughts and emotions."
              },
              {
                icon: <BarChart2 className="h-8 w-8 text-[#b33a3a]" />,
                title: "Mood Analytics",
                description: "Visualize your emotional journey over time with our mood tracking and analytics dashboard."
              },
              {
                icon: <BookOpen className="h-8 w-8 text-[#b33a3a]" />,
                title: "Intelligent Journaling",
                description: "Get AI-generated summaries of your entries and discover connections you might have missed."
              },
              {
                icon: <Sparkles className="h-8 w-8 text-[#b33a3a]" />,
                title: "Personal Growth",
                description: "Regular prompts and reflections help you develop greater self-awareness and mindfulness."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-[#1c1c1c]/10 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  {feature.icon}
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-[#1c1c1c]/80">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">How InkSpire Works</h2>
          <div className="space-y-8">
            {[
              {
                step: "1",
                title: "Write Freely",
                description: "Express yourself in your journal without filters or constraints."
              },
              {
                step: "2",
                title: "AI Analysis",
                description: "Our system processes your entry to identify key themes and emotional tones."
              },
              {
                step: "3",
                title: "Get Insights",
                description: "Receive meaningful summaries and discover patterns in your thinking."
              },
              {
                step: "4",
                title: "Track Progress",
                description: "Watch your emotional journey unfold through beautiful visualizations."
              }
            ].map((item) => (
              <div key={item.step} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="h-10 w-10 rounded-full bg-[#b33a3a] text-white flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <div className="w-px h-full bg-[#1c1c1c]/20 mt-2"></div>
                </div>
                <div className="pb-8">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-[#1c1c1c]/80">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-[#1c1c1c]/10 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to start your AI-powered journaling journey?</h2>
          <Link 
            href="/dashboard" 
            className="inline-block bg-[#b33a3a] hover:bg-[#a03535] text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}