"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Twitter, Linkedin, Github, Mail, Youtube } from "lucide-react";
import { useState, useEffect } from "react";

export default function Footer() {
    const [currentYear, setCurrentYear] = useState(2024);

    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
    }, []);

    const footerLinks = {
        product: [
            { name: "Features", href: "/#services" },
            { name: "Pricing", href: "/pricing" },
            { name: "Upload", href: "/upload" },
            { name: "Gallery", href: "/gallery" },
        ],
        company: [
            { name: "About", href: "/about" },
            { name: "Careers", href: "/careers" },
            { name: "Blog", href: "#" },
            { name: "Press", href: "#" },
        ],
        resources: [
            { name: "Documentation", href: "#" },
            { name: "Help Center", href: "#" },
            { name: "API", href: "#" },
            { name: "Status", href: "#" },
        ],
        legal: [
            { name: "Privacy", href: "#" },
            { name: "Terms", href: "#" },
            { name: "Cookie Policy", href: "#" },
            { name: "Licenses", href: "#" },
        ],
    };

    const socialLinks = [
        { icon: Twitter, href: "#", label: "Twitter" },
        { icon: Linkedin, href: "#", label: "LinkedIn" },
        { icon: Github, href: "#", label: "GitHub" },
        { icon: Youtube, href: "#", label: "YouTube" },
        { icon: Mail, href: "mailto:hello@vidora.ai", label: "Email" },
    ];

    return (
        <footer className="relative bg-black/40 backdrop-blur-xl border-t border-white/5 mt-20">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-black/50 pointer-events-none" />

            <div className="relative container mx-auto px-6 py-16">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-block mb-4">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center gap-2"
                            >
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">V</span>
                                </div>
                                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                    Vidora AI
                                </span>
                            </motion.div>
                        </Link>
                        <p className="text-gray-400 text-sm mb-6 max-w-xs">
                            Empowering creators with AI-powered video platform. Upload, analyze, and monetize your content with cutting-edge technology.
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors group"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-4 h-4 text-gray-400 group-hover:text-purple-400 transition-colors" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Product</h3>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white text-sm transition-colors inline-block hover:translate-x-1 duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white text-sm transition-colors inline-block hover:translate-x-1 duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Resources</h3>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white text-sm transition-colors inline-block hover:translate-x-1 duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h3>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white text-sm transition-colors inline-block hover:translate-x-1 duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="pt-8 border-t border-white/5">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-sm">
                            © {currentYear} Vidora AI. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                            <span className="flex items-center gap-2">
                                Made with <span className="text-red-500">♥</span> for creators
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
