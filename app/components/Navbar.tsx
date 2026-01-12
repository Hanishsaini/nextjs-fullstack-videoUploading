"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Menu, X, Upload, LogOut, User, BrainCircuit, BookOpen, Bot } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          VideoPro
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/feed" className="text-gray-300 hover:text-white transition-colors">
            Feed
          </Link>
          <Link href="/courses" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Courses
          </Link>
          <Link href="/study" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
            <BrainCircuit className="w-4 h-4" />
            Study AI
          </Link>
          <Link href="/chat" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
            <Bot className="w-4 h-4" />
            Chat
          </Link>
          <Link href="/premium" className="text-gray-300 hover:text-white transition-colors">
            Premium
          </Link>

          {session ? (
            <div className="flex items-center gap-4">
              <Link
                href="/upload"
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-full transition-all"
              >
                <Upload className="w-4 h-4" />
                Upload
              </Link>
              <div className="relative group">
                <button className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-[2px]">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                </button>
                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right">
                  <div className="p-2">
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 rounded-lg">
                      Profile
                    </Link>
                    <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 rounded-lg">
                      Dashboard
                    </Link>
                    <Link href="/settings" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 rounded-lg">
                      Settings
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-white hover:text-purple-400 transition-colors">
                Login
              </Link>
              <Link
                href="/register"
                className="bg-white text-black px-5 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-gray-800 p-6 space-y-4 animate-in slide-in-from-top-4">
          <Link href="/feed" className="block text-gray-300 hover:text-white">
            Feed
          </Link>
          <Link href="/courses" className="block text-gray-300 hover:text-white">
            Courses
          </Link>
          <Link href="/study" className="block text-gray-300 hover:text-white">
            Study AI
          </Link>
          <Link href="/premium" className="block text-gray-300 hover:text-white">
            Premium
          </Link>
          {session ? (
            <>
              <Link href="/upload" className="block text-gray-300 hover:text-white">
                Upload Video
              </Link>
              <Link href="/profile" className="block text-gray-300 hover:text-white">
                Profile
              </Link>
              <button
                onClick={handleSignOut}
                className="block w-full text-left text-red-400"
              >
                Sign Out
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-4 pt-4 border-t border-gray-800">
              <Link href="/login" className="block text-center text-white border border-white/20 py-2 rounded-lg">
                Login
              </Link>
              <Link href="/register" className="block text-center bg-white text-black py-2 rounded-lg">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
