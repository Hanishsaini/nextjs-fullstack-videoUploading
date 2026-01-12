"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../../components/Navbar";
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Scene {
    text: string;
    visual: string;
    duration: number;
}

interface VideoData {
    title: string;
    script: Scene[];
    style: string;
}

export default function AIWatchPage() {
    const params = useParams();
    const [videoData, setVideoData] = useState<VideoData | null>(null);
    const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const synthRef = useRef<SpeechSynthesis | null>(null);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    useEffect(() => {
        async function fetchVideo() {
            try {
                const res = await fetch(`/api/ai/video/${params.id}`);
                const data = await res.json();
                setVideoData(data);
            } catch (error) {
                console.error("Failed to load video:", error);
            }
        }
        fetchVideo();
    }, [params.id]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            synthRef.current = window.speechSynthesis;
        }
    }, []);

    const playScene = (index: number) => {
        if (!videoData || !synthRef.current) return;

        // Cancel previous speech
        synthRef.current.cancel();

        const scene = videoData.script[index];
        const utterance = new SpeechSynthesisUtterance(scene.text);
        utteranceRef.current = utterance;

        // Voice selection (try to find a good English voice)
        const voices = synthRef.current.getVoices();
        const preferredVoice = voices.find(v => v.name.includes("Google US English") || v.name.includes("Samantha"));
        if (preferredVoice) utterance.voice = preferredVoice;

        utterance.rate = 1.1; // Slightly faster for better flow
        utterance.volume = isMuted ? 0 : 1;

        utterance.onend = () => {
            if (index < videoData.script.length - 1) {
                setCurrentSceneIndex(index + 1);
                playScene(index + 1);
            } else {
                setIsPlaying(false);
            }
        };

        synthRef.current.speak(utterance);
    };

    const togglePlay = () => {
        if (!videoData || !synthRef.current) return;

        if (isPlaying) {
            synthRef.current.pause();
            setIsPlaying(false);
        } else {
            if (synthRef.current.paused) {
                synthRef.current.resume();
            } else {
                playScene(currentSceneIndex);
            }
            setIsPlaying(true);
        }
    };

    const restart = () => {
        if (synthRef.current) synthRef.current.cancel();
        setCurrentSceneIndex(0);
        setIsPlaying(true);
        playScene(0);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
        if (utteranceRef.current) {
            utteranceRef.current.volume = !isMuted ? 0 : 1;
        }
    };

    // Stop speech when leaving page
    useEffect(() => {
        return () => {
            if (synthRef.current) synthRef.current.cancel();
        };
    }, []);

    if (!videoData) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading Magic...</div>;

    const currentScene = videoData.script[currentSceneIndex];

    return (
        <div className="min-h-screen bg-[#030014] text-white">
            <Navbar />

            <main className="container mx-auto px-6 py-20 flex flex-col items-center">
                <div className="w-full max-w-4xl aspect-video bg-black border border-gray-800 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col">

                    {/* Visual Canvas */}
                    <div className="flex-1 relative flex items-center justify-center p-12 bg-gradient-to-br from-gray-900 to-black">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSceneIndex}
                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 1.1 }}
                                transition={{ duration: 0.5 }}
                                className="text-center"
                            >
                                <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8 leading-tight">
                                    {currentScene.visual}
                                </h2>
                                <p className="text-2xl text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed">
                                    &quot;{currentScene.text}&quot;
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        {/* Progress Bar */}
                        <div className="absolute bottom-0 left-0 h-1 bg-purple-600 transition-all duration-300"
                            style={{ width: `${((currentSceneIndex + 1) / videoData.script.length) * 100}%` }}
                        />
                    </div>

                    {/* Controls */}
                    <div className="h-20 bg-gray-900/80 backdrop-blur-md border-t border-gray-800 flex items-center justify-between px-8">
                        <div className="flex items-center gap-4">
                            <button onClick={togglePlay} className="p-3 rounded-full bg-white text-black hover:bg-gray-200 transition-colors">
                                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
                            </button>
                            <button onClick={restart} className="p-3 rounded-full hover:bg-white/10 text-white transition-colors">
                                <RotateCcw className="w-5 h-5" />
                            </button>
                            <button onClick={toggleMute} className="p-3 rounded-full hover:bg-white/10 text-white transition-colors">
                                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                            </button>
                        </div>

                        <div className="text-sm font-medium text-gray-400">
                            Scene {currentSceneIndex + 1} / {videoData.script.length}
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center max-w-2xl">
                    <h1 className="text-3xl font-bold text-white mb-2">{videoData.title}</h1>
                    <p className="text-gray-400">Generated by NoteCast AI</p>
                </div>
            </main>
        </div>
    );
}
