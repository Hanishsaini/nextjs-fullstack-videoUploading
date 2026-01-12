"use client";

import { motion } from "framer-motion";
import { Zap, Video, Brain, TrendingUp, Shield, Sparkles } from "lucide-react";

export default function Services() {
    const services = [
        {
            icon: Video,
            title: "HD Video Hosting",
            description: "Upload and stream videos in stunning 4K quality with lightning-fast CDN delivery worldwide.",
            gradient: "from-blue-500 to-cyan-500",
        },
        {
            icon: Brain,
            title: "AI-Powered Analysis",
            description: "Get instant insights with sentiment analysis, auto-tagging, and content recommendations.",
            gradient: "from-purple-500 to-pink-500",
        },
        {
            icon: TrendingUp,
            title: "Analytics Dashboard",
            description: "Track views, engagement, and revenue with real-time analytics and detailed reports.",
            gradient: "from-orange-500 to-red-500",
        },
        {
            icon: Zap,
            title: "Instant Processing",
            description: "Upload and publish in seconds with our optimized video processing pipeline.",
            gradient: "from-yellow-500 to-orange-500",
        },
        {
            icon: Shield,
            title: "Enterprise Security",
            description: "Bank-level encryption and DRM protection to keep your content safe and secure.",
            gradient: "from-green-500 to-emerald-500",
        },
        {
            icon: Sparkles,
            title: "Pro Features",
            description: "Unlock unlimited uploads, custom branding, and priority support with Pro plan.",
            gradient: "from-indigo-500 to-purple-500",
        },
    ];

    return (
        <section id="services" className="py-24 relative">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl font-bold mb-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white">
                            Powerful Features
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Everything you need to create, manage, and monetize your video content in one platform
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="group relative"
                        >
                            {/* Card */}
                            <div className="h-full glass rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
                                {/* Icon */}
                                <div className="mb-6 relative">
                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} p-0.5`}>
                                        <div className="w-full h-full bg-[#030014] rounded-xl flex items-center justify-center">
                                            <service.icon className="w-7 h-7 text-white" />
                                        </div>
                                    </div>
                                    {/* Glow Effect */}
                                    <div className={`absolute inset-0 w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`} />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-200 transition-all duration-300">
                                    {service.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {service.description}
                                </p>

                                {/* Hover Border Glow */}
                                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
