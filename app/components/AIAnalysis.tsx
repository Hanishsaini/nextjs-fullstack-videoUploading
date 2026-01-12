"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Brain, Tag, Lock } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface AIResult {
    summary: string;
    sentiment: string;
    tags: string[];
}

export default function AIAnalysis() {
    const { data: session } = useSession();
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState<AIResult | null>(null);

    const handleAnalyze = () => {
        setAnalyzing(true);
        // Mock AI Analysis
        setTimeout(() => {
            setResult({
                summary: "This video features a high-energy montage of urban landscapes, utilizing fast cuts and dynamic transitions. The color grading leans towards teal and orange, suggesting a cinematic travel vlog style.",
                sentiment: "Positive / Exciting",
                tags: ["Travel", "Cinematic", "Urban", "Vlog", "4K"],
            });
            setAnalyzing(false);
        }, 2000);
    };

    if (!session?.user?.isPro) {
        return (
            <div className="glass rounded-xl p-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-center p-6">
                    <Lock className="w-8 h-8 text-purple-400 mb-2" />
                    <h3 className="text-xl font-bold text-white mb-1">Unlock AI Insights</h3>
                    <p className="text-gray-400 text-sm mb-4">Get instant summaries, sentiment analysis, and auto-tags.</p>
                    <Link href="/pricing">
                        <button className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm hover:shadow-lg hover:shadow-purple-500/40 transition">
                            Upgrade to Pro
                        </button>
                    </Link>
                </div>
                <div className="opacity-30 blur-sm">
                    <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
                    <div className="flex gap-2">
                        <div className="h-6 w-16 bg-gray-700 rounded-full"></div>
                        <div className="h-6 w-16 bg-gray-700 rounded-full"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="glass rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-400" />
                    <h3 className="text-lg font-bold text-white">AI Analysis</h3>
                </div>
                {!result && !analyzing && (
                    <button
                        onClick={handleAnalyze}
                        className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-600/20 text-purple-300 text-sm hover:bg-purple-600/30 transition border border-purple-500/30"
                    >
                        <Sparkles className="w-3 h-3" />
                        Analyze Video
                    </button>
                )}
            </div>

            {analyzing && (
                <div className="flex flex-col items-center justify-center py-8">
                    <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                    <p className="text-sm text-purple-300 animate-pulse">Processing visual data...</p>
                </div>
            )}

            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Summary</h4>
                                <p className="text-gray-200 text-sm leading-relaxed">{result.summary}</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div>
                                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Sentiment</h4>
                                    <span className="inline-block px-2 py-1 rounded bg-green-500/20 text-green-300 text-xs font-medium border border-green-500/30">
                                        {result.sentiment}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Auto Tags</h4>
                                <div className="flex flex-wrap gap-2">
                                    {result.tags.map((tag: string) => (
                                        <span key={tag} className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 text-gray-300 text-xs border border-white/10">
                                            <Tag className="w-3 h-3" />
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
