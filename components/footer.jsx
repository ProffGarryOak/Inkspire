"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Linkedin, Twitter, Instagram, Globe } from 'lucide-react';

const SOCIAL_LINKS = [
  {
    name: 'Email',
    icon: <Mail className="h-5 w-5" />,
    href: 'mailto:adarshp.1133@gmail.com'
  },
  {
    name: 'LinkedIn',
    icon: <Linkedin className="h-5 w-5" />,
    href: 'https://linkedin.com/in/adarshpandey1133'
  },
  {
    name: 'Twitter',
    icon: <Twitter className="h-5 w-5" />,
    href: 'https://twitter.com/proffgarryoak'
  },
  {
    name: 'Instagram',
    icon: <Instagram className="h-5 w-5" />,
    href: 'https://instagram.com/rnkpandey'
  },
  {
    name: 'Portfolio',
    icon: <Globe  className="h-5 w-5" />, // Using GitHub as portfolio icon
    href: 'https://adarshp1133.vercel.app'
  }
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#181818] text-[#fffbe6] py-14 px-4 border-t border-[#ffd60033]">
      {/* Decorative Accent Circles */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#ffd60033] rounded-full blur-2xl opacity-60 pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-[#ffd60033] rounded-full blur-2xl opacity-60 pointer-events-none" />
      <div className="container mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-10 relative z-10">
        {/* Branding & Description */}
        <div className="flex flex-col items-center md:items-start gap-3 md:w-1/3">
          <Link href="/" className="flex items-center gap-4 mb-2">
            <Image
              src="/logo.png"
              alt="MindInk Logo"
              width={90}
              height={48}
              className="h-12 w-auto rounded-lg shadow-lg border-2 border-[#ffd600] bg-[#232323]"
            />
            <span className="text-3xl font-extrabold text-[#ffd600] tracking-tight font-sans drop-shadow-lg">
              MindInk
            </span>
          </Link>
          <p className="text-left max-w-xs text-[#fffbe6]/80 text-base font-light">
            Your private journal, beautifully secure and always yours. Express, reflect, and grow with MindInk.
          </p>
        </div>
        {/* Social & Quick Links */}
        <div className="flex flex-col items-center gap-6 md:w-1/3">
          <div className="flex gap-4 flex-wrap justify-center">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#232323] border-2 border-[#ffd600] p-3 text-[#ffd600] hover:bg-[#ffd600] hover:text-[#181818] transition-colors shadow-md hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#ffd600]"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
          <div className="flex gap-6 mt-2 text-sm text-[#ffd600] font-semibold">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/(main)/about" className="hover:underline">About</Link>
            <Link href="/(main)/dashboard" className="hover:underline">Dashboard</Link>
          </div>
        </div>
        {/* Newsletter or CTA */}
        <div className="flex flex-col items-center md:items-end gap-3 md:w-1/3">
          <span className="text-lg font-bold text-[#ffd600] mb-1">Stay Inspired</span>
          <a href="mailto:adarshp.1133@gmail.com" className="inline-block px-6 py-2 rounded-full bg-[#ffd600] text-[#181818] font-semibold shadow-md hover:bg-[#ffe066] transition-colors">Contact Us</a>
          <p className="text-xs text-[#fffbe6]/60 mt-2">We love feedback and collaboration!</p>
        </div>
      </div>
      {/* Copyright */}
      <div className="mt-10 text-center text-xs text-[#fffbe6]/60 relative z-10">
        <p>© {new Date().getFullYear()} MindInk. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;