"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Loader2, Video, FileText, Sparkles } from "lucide-react";

export default function CreatePage() {
    const router = useRouter();
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [style, setStyle] = useState("whiteboard");
    const [loading, setLoading] = useState(false);

    const handleCreate = async () => {
        if (!text.trim() || !title.trim()) return;
        setLoading(true);

        try {
            const res = await fetch("/api/ai/script", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text, title, style }),
            });

            const data = await res.json();
            if (data.id) {
                router.push(`/watch/ai/${data.id}`);
            } else {
                alert("Failed to create video. Please try again.");
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
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
                            Create Magic Notes
                        </h1>
                        <p className="text-gray-400 text-lg">
                            Turn your boring study notes into an engaging video instantly.
                        </p>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-800 rounded-3xl p-8 shadow-2xl">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Video Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g., The French Revolution Explained"
                                    className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Your Notes</label>
                                <textarea
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder="Paste your lecture notes, essay, or summary here..."
                                    className="w-full h-64 bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Video Style</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setStyle("whiteboard")}
                                        className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${style === "whiteboard"
                                                ? "bg-purple-600/20 border-purple-500 text-white"
                                                : "bg-black/50 border-gray-700 text-gray-400 hover:bg-gray-800"
                                            }`}
                                    >
                                        <FileText className="w-6 h-6" />
                                        <span className="font-medium">Whiteboard</span>
                                    </button>
                                    <button
                                        onClick={() => setStyle("viral")}
                                        className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${style === "viral"
                                                ? "bg-pink-600/20 border-pink-500 text-white"
                                                : "bg-black/50 border-gray-700 text-gray-400 hover:bg-gray-800"
                                            }`}
                                    >
                                        <Video className="w-6 h-6" />
                                        <span className="font-medium">Viral Short</span>
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={handleCreate}
                                disabled={loading || !text.trim() || !title.trim()}
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-purple-900/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                        Generating Script...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-6 h-6" />
                                        Generate Video
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
