"use client";

import { useSession, signIn } from "next-auth/react";
import { useState } from "react";

export default function PricingPage() {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);

    const handleUpgrade = async () => {
        if (!session) {
            signIn("google");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/payment", {
                method: "POST",
            });
            const data = await res.json();

            if (res.ok && data.url) {
                window.location.href = data.url; // Redirect to Stripe
            } else {
                alert("Upgrade failed: " + (data.error || "Unknown error"));
            }
        } catch (error) {
            console.error("Payment error:", error);
            alert("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white py-20 px-6 flex flex-col items-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#050014] via-[#0a0224] to-[#1a0133] z-0"></div>
            <div className="absolute inset-0 starfield z-10 opacity-30"></div>

            <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mb-4 relative z-20 text-center">
                Choose Your Plan
            </h1>
            <p className="text-gray-400 text-xl mb-16 relative z-20 text-center max-w-2xl">
                Unlock the full potential of your creativity with Vidora Pro. Higher limits, better quality, and exclusive badges.
            </p>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl w-full relative z-20">
                {/* Free Plan */}
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-10 flex flex-col hover:border-gray-600 transition-all duration-300">
                    <h2 className="text-3xl font-bold text-gray-300 mb-2">Free</h2>
                    <div className="text-5xl font-bold mb-6">$0<span className="text-lg text-gray-500 font-normal">/mo</span></div>
                    <ul className="space-y-4 mb-8 flex-1 text-gray-400">
                        <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> 1 Video Upload per Day</li>
                        <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Standard Quality (720p)</li>
                        <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Basic Support</li>
                    </ul>
                    <button className="w-full py-4 rounded-xl bg-gray-800 text-white font-bold hover:bg-gray-700 transition-all cursor-not-allowed opacity-70">
                        Current Plan
                    </button>
                </div>

                {/* Pro Plan */}
                <div className="bg-gradient-to-b from-indigo-900/40 to-purple-900/40 backdrop-blur-xl border border-indigo-500/50 rounded-3xl p-10 flex flex-col relative shadow-[0_0_40px_rgba(79,70,229,0.3)] hover:scale-105 transition-all duration-300">
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl">
                        MOST POPULAR
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Pro</h2>
                    <div className="text-5xl font-bold mb-6">$9.99<span className="text-lg text-gray-400 font-normal">/mo</span></div>
                    <ul className="space-y-4 mb-8 flex-1 text-gray-200">
                        <li className="flex items-center"><span className="text-pink-400 mr-2">✓</span> Unlimited Uploads</li>
                        <li className="flex items-center"><span className="text-pink-400 mr-2">✓</span> HD Quality (1080p/4K)</li>
                        <li className="flex items-center"><span className="text-pink-400 mr-2">✓</span> &quot;Pro&quot; Profile Badge</li>
                        <li className="flex items-center"><span className="text-pink-400 mr-2">✓</span> Priority Support</li>
                    </ul>
                    <button
                        onClick={handleUpgrade}
                        disabled={loading}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold shadow-lg hover:shadow-pink-500/40 hover:brightness-110 transition-all"
                    >
                        {loading ? "Processing..." : "Upgrade to Pro"}
                    </button>
                </div>
            </div>
        </div>
    );
}
