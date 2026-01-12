"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Book, Code, Globe, Cpu, Database, Palette } from "lucide-react";
import Link from "next/link";

const courses = [
    {
        title: "Computer Science",
        icon: Code,
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        topics: ["Web Development", "Algorithms", "System Design"],
    },
    {
        title: "Data Science",
        icon: Database,
        color: "text-green-400",
        bg: "bg-green-500/10",
        border: "border-green-500/20",
        topics: ["Machine Learning", "Python", "Big Data"],
    },
    {
        title: "Design",
        icon: Palette,
        color: "text-pink-400",
        bg: "bg-pink-500/10",
        border: "border-pink-500/20",
        topics: ["UI/UX", "Graphic Design", "Motion Graphics"],
    },
    {
        title: "Physics",
        icon: Globe,
        color: "text-purple-400",
        bg: "bg-purple-500/10",
        border: "border-purple-500/20",
        topics: ["Quantum Mechanics", "Astrophysics", "Thermodynamics"],
    },
    {
        title: "Engineering",
        icon: Cpu,
        color: "text-orange-400",
        bg: "bg-orange-500/10",
        border: "border-orange-500/20",
        topics: ["Robotics", "Electronics", "Civil Engineering"],
    },
    {
        title: "Business",
        icon: Book,
        color: "text-yellow-400",
        bg: "bg-yellow-500/10",
        border: "border-yellow-500/20",
        topics: ["Marketing", "Finance", "Entrepreneurship"],
    },
];

export default function CoursesPage() {
    return (
        <div className="min-h-screen bg-[#030014] text-white selection:bg-purple-500/30">
            <Navbar />

            <main className="container mx-auto px-6 py-20">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-6">
                        Explore Learning Paths
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Structured courses designed to help you master new skills. Choose a category to get started.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course, index) => (
                        <Link
                            href={`/feed?category=${course.title.toLowerCase()}`}
                            key={index}
                            className={`group p-8 rounded-2xl border ${course.border} ${course.bg} hover:bg-opacity-20 transition-all hover:scale-[1.02]`}
                        >
                            <div className={`w-12 h-12 rounded-xl bg-black/20 flex items-center justify-center mb-6 ${course.color}`}>
                                <course.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                                {course.title}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {course.topics.map((topic, i) => (
                                    <span key={i} className="text-xs font-medium px-2 py-1 rounded-md bg-black/20 text-gray-300 border border-white/5">
                                        {topic}
                                    </span>
                                ))}
                            </div>
                        </Link>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
