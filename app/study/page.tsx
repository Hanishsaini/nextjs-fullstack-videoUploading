"use client";

import { useState } from "react";
import { Sparkles, BookOpen, BrainCircuit, Loader2, FileText, CheckCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function StudyPage() {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!input.trim()) return;
        setLoading(true);
        setResult(null);

        try {
            const prompt = `
        Act as an expert tutor. I will provide a topic or video description. 
        Please generate:
        1. A concise summary (bullet points).
        2. Key concepts explained simply.
        3. A short 5-question quiz with answers hidden (or at the bottom).
        
        Topic/Description: ${input}
      `;

            const res = await fetch("/api/ai/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt }),
            });

            const data = await res.json();
            if (data.result) {
                setResult(data.result);
            } else {
                alert("Failed to generate content. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#030014] text-white selection:bg-purple-500/30">
            <Navbar />

            <main className="container mx-auto px-6 py-20">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
                        <BrainCircuit className="w-4 h-4" />
                        <span>AI Study Companion</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-400 mb-6">
                        Turn Content into <br /> Knowledge Instantly
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Paste a video description or topic below, and our AI will generate smart notes, summaries, and quizzes to help you master the subject.
                    </p>
                </div>

                {/* Input Section */}
                <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-2 flex items-center gap-2 shadow-2xl shadow-purple-900/20 mb-12">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter a topic (e.g., 'Quantum Physics Basics')..."
                        className="flex-1 bg-transparent border-none outline-none text-white px-4 py-3 placeholder-gray-500"
                        onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                    />
                    <button
                        onClick={handleGenerate}
                        disabled={loading || !input.trim()}
                        className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                <Sparkles className="w-5 h-5" />
                                Generate
                            </>
                        )}
                    </button>
                </div>

                {/* Result Section */}
                {result && (
                    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="bg-gray-900/50 border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl">
                            <div className="flex items-center gap-3 mb-8 border-b border-gray-800 pb-6">
                                <FileText className="w-6 h-6 text-purple-400" />
                                <h2 className="text-2xl font-bold text-white">Study Guide</h2>
                            </div>

                            <div className="prose prose-invert max-w-none prose-headings:text-purple-200 prose-a:text-purple-400 prose-strong:text-white text-gray-300">
                                <div dangerouslySetInnerHTML={{ __html: result.replace(/\n/g, "<br />").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
                            </div>

                            <div className="mt-12 pt-8 border-t border-gray-800 flex justify-end">
                                <button
                                    onClick={() => window.print()}
                                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                                >
                                    <CheckCircle className="w-5 h-5" />
                                    Save as PDF
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Features Grid */}
                {!result && (
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-20">
                        {[
                            { icon: FileText, title: "Smart Summaries", desc: "Get concise bullet points of any complex topic." },
                            { icon: BookOpen, title: "Instant Quizzes", desc: "Test your knowledge with AI-generated questions." },
                            { icon: BrainCircuit, title: "Concept Simplification", desc: "Understand difficult concepts with simple explanations." },
                        ].map((feature, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-center">
                                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 text-purple-400">
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                                <p className="text-gray-400">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
