"use client";

import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { Linkedin, Twitter, Github } from "lucide-react";

export default function AboutPage() {
    const team = [
        {
            name: "Alex Rivera",
            role: "CEO & Co-Founder",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
            bio: "Former ML Engineer at Google. Passionate about democratizing AI for creators.",
            social: {
                linkedin: "#",
                twitter: "#",
                github: "#",
            },
        },
        {
            name: "Priya Sharma",
            role: "CTO & Co-Founder",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
            bio: "Ex-Meta engineer with 10+ years in video infrastructure and AI systems.",
            social: {
                linkedin: "#",
                twitter: "#",
                github: "#",
            },
        },
        {
            name: "Jordan Lee",
            role: "Head of Product",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
            bio: "Product leader from Netflix. Building tools that creators actually love.",
            social: {
                linkedin: "#",
                twitter: "#",
            },
        },
        {
            name: "Sofia Martinez",
            role: "Head of Design",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia",
            bio: "Award-winning designer focused on beautiful, intuitive user experiences.",
            social: {
                linkedin: "#",
                twitter: "#",
            },
        },
    ];

    const values = [
        {
            title: "Creator First",
            description: "Every decision we make starts with how it benefits creators.",
        },
        {
            title: "Innovation",
            description: "We push boundaries with cutting-edge AI and video technology.",
        },
        {
            title: "Transparency",
            description: "Open communication and honest relationships with our community.",
        },
        {
            title: "Excellence",
            description: "We obsess over quality in everything we build and deliver.",
        },
    ];

    return (
        <main className="min-h-screen bg-[#030014] text-white">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-6xl md:text-7xl font-bold mb-6">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
                                Building the Future
                            </span>
                            <br />
                            <span className="text-white">of Video Content</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            We&apos;re on a mission to empower every creator with AI-powered tools that make video content creation, management, and monetization effortless.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass rounded-3xl p-12 border border-white/10"
                    >
                        <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                            Our Story
                        </h2>
                        <div className="space-y-4 text-gray-300 leading-relaxed">
                            <p>
                                Vidora AI was born from a simple frustration: managing video content shouldn&apos;t be this hard. As creators ourselves, we experienced firsthand the challenges of uploading, organizing, analyzing, and monetizing video content across multiple platforms.
                            </p>
                            <p>
                                In 2024, we brought together a team of engineers from Google, Meta, and Netflix with a shared vision: leverage AI to make video content management as simple as possible. What started as a weekend project quickly evolved into a platform trusted by thousands of creators worldwide.
                            </p>
                            <p>
                                Today, we&apos;re building the infrastructure that powers the next generation of content creators. From AI-powered analytics to seamless monetization, we&apos;re committed to giving creators the tools they need to focus on what they do best: creating amazing content.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold text-center mb-16"
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                            Our Values
                        </span>
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="glass rounded-2xl p-8 border border-white/10 hover:border-purple-500/30 transition-all"
                            >
                                <h3 className="text-2xl font-bold mb-3 text-white">{value.title}</h3>
                                <p className="text-gray-400">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold text-center mb-4"
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                            Meet the Team
                        </span>
                    </motion.h2>
                    <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
                        We&apos;re a diverse team of builders, dreamers, and creators united by our passion for empowering content creators worldwide.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, index) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="glass rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all text-center">
                                    {/* Avatar */}
                                    <p className="text-gray-400 text-sm mb-4">{member.bio}</p>

                                    {/* Social Links */}
                                    <div className="flex justify-center gap-3">
                                        {member.social.linkedin && (
                                            <a
                                                href={member.social.linkedin}
                                                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                                            >
                                                <Linkedin className="w-4 h-4 text-gray-400 hover:text-purple-400" />
                                            </a>
                                        )}
                                        {member.social.twitter && (
                                            <a
                                                href={member.social.twitter}
                                                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                                            >
                                                <Twitter className="w-4 h-4 text-gray-400 hover:text-purple-400" />
                                            </a>
                                        )}
                                        {member.social.github && (
                                            <a
                                                href={member.social.github}
                                                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                                            >
                                                <Github className="w-4 h-4 text-gray-400 hover:text-purple-400" />
                                            </a>
                                        )}
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
                            <h2 className="text-3xl font-bold mb-4">Want to Join Us?</h2>
                            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                                We&apos;re always looking for talented individuals who share our passion for empowering creators.
                            </p>
                            <motion.a
                                href="/careers"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-lg hover:shadow-purple-500/40 transition-all"
                            >
                                View Open Positions
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
