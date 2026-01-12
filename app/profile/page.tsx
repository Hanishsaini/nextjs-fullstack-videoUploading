"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { Video } from "../components/VideoList";
import { BarChart3, Upload, Zap, DollarSign } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    if (!session) return;
    const fetchUserVideos = async () => {
      const res = await fetch(`/api/user/videos?email=${session.user?.email}`);
      const data = await res.json();
      setVideos(data);
    };
    fetchUserVideos();
  }, [session]);

  if (!session) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400 mb-6">Please login to view your dashboard.</p>
          <Link href="/">
            <button className="px-6 py-2 rounded-full bg-purple-600 text-white">Go Home</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#030014] text-white pb-20">
      <Navbar />

      <div className="container mx-auto px-6 pt-32">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-50"></div>
            <Image
              src={session.user?.image || "/default-avatar.png"}
              width={128}
              height={128}
              className="rounded-full border-4 border-[#030014] relative z-10"
              alt="Profile"
            />
            {session.user?.isPro && (
              <div className="absolute bottom-0 right-0 bg-gradient-to-r from-amber-400 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded-full z-20 border-2 border-[#030014]">
                PRO
              </div>
            )}
          </motion.div>

          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold mb-2">{session.user?.name}</h1>
            <p className="text-gray-400 mb-4">{session.user?.email}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="glass px-4 py-2 rounded-lg flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="font-bold">1,200</span>
                <span className="text-xs text-gray-400">AI Credits</span>
              </div>
              <div className="glass px-4 py-2 rounded-lg flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-400" />
                <span className="font-bold">$450.00</span>
                <span className="text-xs text-gray-400">Earnings</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats Column */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-purple-400" />
                Performance
              </h2>
              <div className="glass p-6 rounded-2xl h-64 flex items-center justify-center text-gray-500">
                [Graph Placeholder: Views over time]
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Upload className="w-6 h-6 text-purple-400" />
                Your Videos
              </h2>
              {videos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {videos.map((v) => (
                    <div key={v._id} className="glass p-4 rounded-xl flex gap-4 group hover:bg-white/5 transition">
                      <div className="w-32 h-20 rounded-lg overflow-hidden relative flex-shrink-0">
                        <video src={v.url} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold truncate group-hover:text-purple-300 transition">{v.title}</h3>
                        <p className="text-xs text-gray-400 mt-1">Uploaded {new Date(v.createdAt).toLocaleDateString()}</p>
                        <div className="flex gap-2 mt-2">
                          <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-gray-300">HD</span>
                          <span className="text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded border border-green-500/20">Monetized</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass p-10 rounded-2xl text-center">
                  <p className="text-gray-400 mb-4">You haven&apos;t uploaded any videos yet.</p>
                  <Link href="/upload">
                    <button className="px-6 py-2 bg-white text-black rounded-full font-bold hover:scale-105 transition">
                      Upload First Video
                    </button>
                  </Link>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="glass p-6 rounded-2xl bg-gradient-to-br from-purple-900/20 to-transparent border-purple-500/20">
              <h3 className="font-bold text-lg mb-2">Pro Status</h3>
              <p className="text-sm text-gray-400 mb-4">You are on the {session.user?.isPro ? "Pro" : "Free"} plan.</p>
              {!session.user?.isPro && (
                <Link href="/pricing">
                  <button className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 font-bold text-sm shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition">
                    Upgrade Now
                  </button>
                </Link>
              )}
            </div>

            <div className="glass p-6 rounded-2xl">
              <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
              <ul className="space-y-4">
                <li className="flex gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-400 mt-1.5"></div>
                  <span className="text-gray-400">Your video <span className="text-white">&quot;Cyberpunk City&quot;</span> reached 1k views.</span>
                </li>
                <li className="flex gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5"></div>
                  <span className="text-gray-400">New comment on <span className="text-white">&quot;AI Tutorial&quot;</span>.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
