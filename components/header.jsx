// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs";
// import { Button } from "@/components/ui/button";
// import { Menu, X } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { checkUser } from "@/lib/checkUser";

// const Header = () => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const { isSignedIn } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     const verifyUser = async () => {
//       await checkUser();
//     };
//     verifyUser();
//   }, []);

//   return (
//     <header className="w-full bg-[#1c1c1c] shadow-md">
//       <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
//         {/* Logo/Brand */}
//         <div className="flex items-center">
//           <Link href={isSignedIn ? "/dashboard" : "/"} className="flex items-center gap-2 hover:opacity-80 transition">
//             <Image
//               src="/logo.png"
//               alt="InkSpire Logo"
//               width={100}
//               height={40}
//               priority
//               className="h-10 w-auto"
//             />
//             <span className="text-2xl font-bold text-[#b33a3a] font-shikamaru hidden sm:block">
//               <h1>InkSpire</h1>
//             </span>
//           </Link>
//         </div>

//         {/* Desktop Navigation */}
//         <div className="hidden md:flex items-center gap-4">
//           <SignedOut>
//             <SignInButton>
//               <Button className="bg-[#b33a3a] hover:bg-[#b33a3a]/90 text-white">
//                 Sign In
//               </Button>
//             </SignInButton>
//             <SignUpButton>
//               <Button variant="outline" className="border-[#b33a3a] text-[#b33a3a] hover:bg-[#b33a3a]/10">
//                 Sign Up
//               </Button>
//             </SignUpButton>
//           </SignedOut>
//           <SignedIn>
//             <div className="w-12 h-12 rounded-full border-2 border-[#b33a3a] flex items-center justify-center overflow-hidden">
//               <UserButton afterSignOutUrl="/" />
//             </div>
//           </SignedIn>
//         </div>

//         {/* Mobile Menu Button */}
//         <div className="md:hidden flex items-center">
//           <button
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             className="text-[#e5e5e5] focus:outline-none"
//           >
//             {mobileMenuOpen ? (
//               <X className="h-6 w-6" />
//             ) : (
//               <Menu className="h-6 w-6" />
//             )}
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       {mobileMenuOpen && (
//         <div className="md:hidden bg-[#1c1c1c] px-4 pb-4">
//           <div className="flex flex-col space-y-4">
//             <SignedOut>
//               <SignInButton>
//                 <Button
//                   className="w-full bg-[#b33a3a] hover:bg-[#b33a3a]/90 text-white"
//                   onClick={() => setMobileMenuOpen(false)}
//                 >
//                   Sign In
//                 </Button>
//               </SignInButton>
//               <SignUpButton>
//                 <Button
//                   variant="outline"
//                   className="w-full border-[#b33a3a] text-[#b33a3a] hover:bg-[#b33a3a]/10"
//                   onClick={() => setMobileMenuOpen(false)}
//                 >
//                   Sign Up
//                 </Button>
//               </SignUpButton>
//             </SignedOut>
//             <SignedIn>
//               <div className="w-12 h-12 mx-auto rounded-full border-2 border-[#b33a3a] flex items-center justify-center overflow-hidden">
//                 <UserButton afterSignOutUrl="/" />
//               </div>
//             </SignedIn>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { PenBox, FolderOpen } from "lucide-react";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import UserMenu from "./user-menu";
import { checkUser } from "@/lib/checkUser";

async function Header() {
  await checkUser();

  return (
    <header className="w-full bg-[#1c1c1c] shadow-md">
      <nav className="container mx-auto px-5 py-5 flex justify-between items-center">
      <div className="flex items-center">
          <Link href={"/"} className="flex items-center gap-2 hover:opacity-80 transition">
            <Image
              src="/logo.png"
              alt="InkSpire Logo"
              width={100}
              height={40}
              priority
              className="h-10 w-auto"
            />
            <span className="text-2xl font-bold text-[#b33a3a] font-shikamaru hidden sm:block">
              <h1>InkSpire</h1>
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <SignedIn>
            <Link href="/dashboard#collections">
            <Button className="bg-[#b33a3a] hover:bg-[#b33a3a]/90 text-white px-5">
                <FolderOpen size={18} />
                <span className="hidden md:inline">Collections</span>
              </Button>
            </Link>
          </SignedIn>
          <Link href="/journal/write">
          <Button className="bg-[#e5e5e5] hover:bg-[#e5e5e5]/90 text-#b33a3a px-5">
              <PenBox size={18} />
              <span className="hidden md:inline">Write New</span>
            </Button>
          </Link>
          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
            <Button className="bg-[#b33a3a] hover:bg-[#b33a3a]/90 text-white">Login</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserMenu />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}

export default Header;
