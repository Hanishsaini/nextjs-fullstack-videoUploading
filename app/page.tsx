"use client";

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import VideoCard from "./components/VideoCard";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import { Video } from "./components/VideoList";
import { Sparkles, Crown, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch("/api/video");
        const data = await res.json();
        setVideos(data);
      } catch (err) {
        console.error("Failed to fetch videos:", err);
      }
    }
    fetchVideos();
  }, []);

  return (
    <main className="min-h-screen bg-[#030014] text-white selection:bg-purple-500/30">
      <Navbar />
      <Hero />

      {/* Services Section */}
      <Services />

      {/* Premium CTA */}
      <section className="container mx-auto px-6 py-10">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-500/20 p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium">
              <Crown className="w-4 h-4" />
              <span>Premium Features</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
              Upgrade Your Experience
            </h2>
            <p className="text-gray-400 text-lg">
              Unlock 4K uploads, unlimited storage, and exclusive content with our Premium plans.
            </p>
          </div>
          <Link href="/premium" className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-xl font-bold hover:bg-gray-100 transition-all hover:scale-105">
            Get Premium
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Trending Videos Section */}
      <section className="container mx-auto px-6 py-20 relative z-10">
        <div className="flex items-center gap-3 mb-10">
          <Sparkles className="w-6 h-6 text-purple-400" />
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Trending Now
          </h2>
        </div>

        {videos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <VideoCard key={video._id} video={video} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 glass rounded-2xl border-dashed border-2 border-gray-800">
            <p className="text-gray-400 text-lg">No videos found. Be the first to upload!</p>
          </div>
        )}
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Footer */}
      <Footer />
    </main>
  );
}
