"use client";

import React from "react";
import Link from "next/link";

export default function PremiumPage() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
            <div className="max-w-4xl w-full text-center space-y-12">
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text animate-gradient-x">
                    Unlock Premium
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Experience the ultimate video platform with exclusive features, higher limits, and priority support.
                </p>

                <div className="grid md:grid-cols-3 gap-8 mt-12">
                    {/* Free Plan */}
                    <div className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-all duration-300 flex flex-col">
                        <h3 className="text-2xl font-bold mb-4">Starter</h3>
                        <div className="text-4xl font-bold mb-6">$0<span className="text-lg text-gray-500 font-normal">/mo</span></div>
                        <ul className="space-y-4 text-gray-400 mb-8 flex-1 text-left">
                            <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Standard Uploads</li>
                            <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> 720p Streaming</li>
                            <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Community Support</li>
                        </ul>
                        <Link href="/register" className="block w-full py-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors font-semibold">
                            Get Started
                        </Link>
                    </div>

                    {/* Pro Plan */}
                    <div className="p-8 rounded-2xl bg-gradient-to-b from-purple-900/20 to-black border border-purple-500/30 transform scale-105 shadow-2xl shadow-purple-900/20 flex flex-col relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
                        <h3 className="text-2xl font-bold mb-4 text-purple-400">Pro</h3>
                        <div className="text-4xl font-bold mb-6">$19<span className="text-lg text-gray-500 font-normal">/mo</span></div>
                        <ul className="space-y-4 text-gray-300 mb-8 flex-1 text-left">
                            <li className="flex items-center"><span className="text-purple-400 mr-2">✓</span> 4K Ultra HD Uploads</li>
                            <li className="flex items-center"><span className="text-purple-400 mr-2">✓</span> Unlimited Storage</li>
                            <li className="flex items-center"><span className="text-purple-400 mr-2">✓</span> Ad-free Experience</li>
                            <li className="flex items-center"><span className="text-purple-400 mr-2">✓</span> Priority Support</li>
                        </ul>
                        <button className="block w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 transition-colors font-bold shadow-lg shadow-purple-900/40">
                            Upgrade Now
                        </button>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-all duration-300 flex flex-col">
                        <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
                        <div className="text-4xl font-bold mb-6">$99<span className="text-lg text-gray-500 font-normal">/mo</span></div>
                        <ul className="space-y-4 text-gray-400 mb-8 flex-1 text-left">
                            <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Custom Solutions</li>
                            <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Dedicated Account Manager</li>
                            <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> API Access</li>
                            <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> SSO Integration</li>
                        </ul>
                        <button className="block w-full py-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors font-semibold">
                            Contact Sales Team
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
