"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

export default function Testimonials() {
    const testimonials = [
        {
            name: "Sarah Chen",
            role: "Content Creator",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
            content: "Vidora AI transformed how I manage my video content. The AI analysis saves me hours of work every week!",
            rating: 5,
            company: "@sarahcreates",
        },
        {
            name: "Marcus Rodriguez",
            role: "Filmmaker",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
            content: "The quality and speed are unmatched. I can upload 4K videos and they're ready to share in minutes. Game changer!",
            rating: 5,
            company: "@marcusfilms",
        },
        {
            name: "Aisha Patel",
            role: "Educator",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha",
            content: "Perfect for my online courses. The analytics help me understand what content resonates with my students.",
            rating: 5,
            company: "@learnwithaisha",
        },
        {
            name: "Jake Morrison",
            role: "YouTuber",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jake",
            content: "Best investment for my channel. The Pro features and unlimited uploads are worth every penny!",
            rating: 5,
            company: "@jaketech",
        },
        {
            name: "Elena Volkov",
            role: "Brand Manager",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
            content: "We use Vidora for all our marketing videos. The enterprise security gives us peace of mind.",
            rating: 5,
            company: "TechCorp Inc.",
        },
        {
            name: "David Kim",
            role: "Entrepreneur",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
            content: "The monetization features helped me turn my passion into a profitable business. Highly recommend!",
            rating: 5,
            company: "@davidventures",
        },
    ];

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />

            <div className="container mx-auto px-6 relative">
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
                            Loved by Creators
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Join thousands of creators who trust Vidora AI for their video content
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="group"
                        >
                            <div className="h-full glass rounded-2xl p-8 border border-white/10 hover:border-purple-500/30 transition-all duration-300 relative">
                                {/* Quote Icon */}
                                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Quote className="w-12 h-12 text-purple-400" />
                                </div>

                                {/* Rating */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                                        />
                                    ))}
                                </div>

                                {/* Content */}
                                <p className="text-gray-300 text-sm leading-relaxed mb-6 relative z-10">
                                    &quot;{testimonial.content}&quot;
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-4">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-purple-500/30">
                                        <Image
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold text-sm">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-gray-400 text-xs">{testimonial.role}</p>
                                        <p className="text-purple-400 text-xs">{testimonial.company}</p>
                                    </div>
                                </div>

                                {/* Hover Glow */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-300 pointer-events-none" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-center mt-12"
                >
                    <p className="text-gray-400 text-sm">
                        Join <span className="text-purple-400 font-semibold">10,000+</span> creators already using Vidora AI
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
