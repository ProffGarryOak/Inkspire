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
    <footer className="bg-[#1c1c1c] text-[#e5e5e5] py-8 px-4">
      <div className="container mx-auto flex flex-col items-center">
        {/* Logo and Branding */}
        <div className="flex flex-col items-center space-y-2 mb-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="InkSpire Logo"
              width={100}
              height={50}
              className="h-12 w-auto"
            />
            <span className="text-3xl font-bold text-[#b33a3a] font-shikamaru">
              InkSpire
            </span>
          </Link>
          <p className="text-center max-w-md text-[#e5e5e5]/80">
            Your private journal with traditional encryption
          </p>
        </div>

        {/* Social Links */}
        <div className="flex space-x-6 mb-8">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#e5e5e5] hover:text-[#b33a3a] transition-colors"
              aria-label={link.name}
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-[#e5e5e5]/60">
          <p>© {new Date().getFullYear()} InkSpire. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;