"use client";

import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import {
    Rocket,
    Users,
    TrendingUp,
    Heart,
    Zap,
    Globe,
    ArrowRight,
    CheckCircle2
} from "lucide-react";

export default function CareersPage() {
    const benefits = [
        {
            icon: Rocket,
            title: "Fast-Paced Growth",
            description: "Join a rocket ship and grow your career exponentially",
        },
        {
            icon: Users,
            title: "Amazing Team",
            description: "Work with talented engineers from top tech companies",
        },
        {
            icon: TrendingUp,
            title: "Equity & Ownership",
            description: "Share in our success with competitive equity packages",
        },
        {
            icon: Heart,
            title: "Health & Wellness",
            description: "Comprehensive health coverage and wellness programs",
        },
        {
            icon: Zap,
            title: "Cutting-Edge Tech",
            description: "Work with the latest AI and video technologies",
        },
        {
            icon: Globe,
            title: "Remote-First",
            description: "Work from anywhere with flexible hours",
        },
    ];

    const openings = [
        {
            title: "Software Engineering Intern",
            type: "Internship",
            location: "Remote",
            duration: "3-6 months",
            description: "Join our engineering team to build the future of video content management with AI.",
            requirements: [
                "Currently pursuing CS degree or related field",
                "Strong programming skills in JavaScript/TypeScript or Python",
                "Passion for AI and video technologies",
                "Excellent communication skills",
            ],
        },
        {
            title: "Product Design Intern",
            type: "Internship",
            location: "Remote",
            duration: "3-6 months",
            description: "Help design beautiful, intuitive experiences for content creators worldwide.",
            requirements: [
                "Portfolio showcasing UI/UX design work",
                "Proficiency in Figma or similar design tools",
                "Understanding of design systems",
                "Creative problem-solving mindset",
            ],
        },
        {
            title: "Marketing & Growth Intern",
            type: "Internship",
            location: "Remote",
            duration: "3-6 months",
            description: "Drive user acquisition and engagement through creative marketing campaigns.",
            requirements: [
                "Interest in digital marketing and growth",
                "Strong writing and communication skills",
                "Data-driven mindset",
                "Social media savvy",
            ],
        },
    ];

    return (
        <main className="min-h-screen bg-[#030014] text-white">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent" />

                <div className="container mx-auto max-w-4xl text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-6">
                            <span className="text-purple-300 text-sm font-semibold">🚀 We&apos;re Hiring!</span>
                        </div>

                        <h1 className="text-6xl md:text-7xl font-bold mb-6">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
                                Join Our Mission
                            </span>
                        </h1>

                        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
                            Help us build the future of video content creation. We&apos;re looking for passionate individuals to join our growing team.
                        </p>

                        <motion.a
                            href="#openings"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-lg hover:shadow-purple-500/40 transition-all"
                        >
                            View Open Positions
                            <ArrowRight className="w-5 h-5" />
                        </motion.a>
                    </motion.div>
                </div>
            </section>

            {/* Why Join Section */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold mb-4">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                                Why Vidora AI?
                            </span>
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Join a team that&apos;s revolutionizing how creators manage and monetize their content
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={benefit.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="glass rounded-2xl p-8 border border-white/10 hover:border-purple-500/30 transition-all group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 p-0.5 mb-4">
                                    <div className="w-full h-full bg-[#030014] rounded-xl flex items-center justify-center">
                                        <benefit.icon className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                                <p className="text-gray-400 text-sm">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open Positions Section */}
            <section id="openings" className="py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold mb-4">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                                Open Positions
                            </span>
                        </h2>
                        <p className="text-gray-400 text-lg">
                            Currently hiring for internship positions
                        </p>
                    </motion.div>

                    <div className="space-y-6">
                        {openings.map((job, index) => (
                            <motion.div
                                key={job.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="glass rounded-2xl p-8 border border-white/10 hover:border-purple-500/30 transition-all"
                            >
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <h3 className="text-2xl font-bold text-white">{job.title}</h3>
                                            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold border border-purple-500/30">
                                                {job.type}
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                                            <span>📍 {job.location}</span>
                                            <span>⏱️ {job.duration}</span>
                                        </div>

                                        <p className="text-gray-300 mb-6">{job.description}</p>

                                        <div>
                                            <h4 className="text-white font-semibold mb-3">Requirements:</h4>
                                            <ul className="space-y-2">
                                                {job.requirements.map((req, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
                                                        <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                                                        <span>{req}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="flex-shrink-0">
                                        <Link href="/careers/apply">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="w-full md:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-lg hover:shadow-purple-500/40 transition-all"
                                            >
                                                Apply Now
                                            </motion.button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass rounded-3xl p-12 border border-purple-500/30 text-center relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold mb-4">Don&apos;t See a Perfect Fit?</h2>
                            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                                We&apos;re always interested in meeting talented people. Send us your resume and let&apos;s chat!
                            </p>
                            <motion.a
                                href="mailto:careers@vidora.ai"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-block px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold border border-white/20 transition-all"
                            >
                                Get in Touch
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
