"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Play, ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background Blobs */}
            <div className="aurora-bg">
                <div className="aurora-blob blob-1"></div>
                <div className="aurora-blob blob-2"></div>
                <div className="aurora-blob blob-3"></div>
            </div>
            <div className="grid-pattern"></div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-sm text-purple-300 mb-6 backdrop-blur-md">
                        ✨ The Future of Video is Here
                    </span>
                    <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
                        Create. Share. <br />
                        <span className="text-gradient">Inspire.</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Vidora AI empowers creators with next-gen tools, stunning quality, and
                        AI-driven insights. Join the revolution today.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/upload">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 rounded-full bg-white text-black font-bold text-lg flex items-center gap-2 shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.7)] transition-all"
                            >
                                <Play className="w-5 h-5 fill-current" />
                                Start Creating
                            </motion.button>
                        </Link>
                        <Link href="/pricing">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 rounded-full glass text-white font-bold text-lg flex items-center gap-2 hover:bg-white/10 transition-all"
                            >
                                View Plans
                                <ArrowRight className="w-5 h-5" />
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>

                {/* Floating Cards Animation */}
                <div className="mt-20 relative h-[400px] w-full max-w-5xl mx-auto perspective-1000">
                    <motion.div
                        initial={{ rotateX: 20, rotateY: -20, opacity: 0 }}
                        animate={{ rotateX: 10, rotateY: -10, opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="absolute left-0 top-10 w-64 h-40 glass rounded-xl p-4 transform rotate-[-6deg] z-10"
                    >
                        <div className="w-full h-full bg-purple-500/20 rounded-lg animate-pulse"></div>
                    </motion.div>
                    <motion.div
                        initial={{ rotateX: 20, opacity: 0, y: 50 }}
                        animate={{ rotateX: 0, opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, delay: 0.2 }}
                        className="absolute left-1/2 top-0 -translate-x-1/2 w-[500px] h-[300px] glass rounded-2xl p-2 shadow-2xl z-20 border border-white/10"
                    >
                        <div className="w-full h-full bg-black/40 rounded-xl overflow-hidden relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Play className="w-16 h-16 text-white/50" />
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ rotateX: 20, rotateY: 20, opacity: 0 }}
                        animate={{ rotateX: 10, rotateY: 10, opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.7 }}
                        className="absolute right-0 top-20 w-60 h-48 glass rounded-xl p-4 transform rotate-[6deg] z-10"
                    >
                        <div className="w-full h-full bg-pink-500/20 rounded-lg animate-pulse"></div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
