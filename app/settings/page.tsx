"use client";

import { useSession } from "next-auth/react";
import { User, CreditCard, Shield, Zap, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function SettingsPage() {
    const { data: session } = useSession();

    if (!session) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
                <p>Please log in to view settings.</p>
            </div>
        );
    }

    const isPro = session.user?.isPro;

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Settings
                </h1>

                {/* Profile Section */}
                <div className="bg-[#111] border border-white/10 rounded-2xl p-6 space-y-6">
                    <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-2xl font-bold">
                            {session.user?.name?.[0] || "U"}
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold">{session.user?.name}</h2>
                            <p className="text-gray-400">{session.user?.email}</p>
                        </div>
                    </div>

                    <div className="grid gap-4">
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                            <div className="flex items-center gap-3">
                                <User className="w-5 h-5 text-purple-400" />
                                <span>Account Type</span>
                            </div>
                            <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/10">
                                Personal
                            </span>
                        </div>
                    </div>
                </div>

                {/* Subscription Section */}
                <div className="bg-[#111] border border-white/10 rounded-2xl p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-pink-400" />
                            Subscription
                        </h2>
                        {isPro ? (
                            <span className="px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r from-amber-400 to-orange-500 text-black">
                                PRO
                            </span>
                        ) : (
                            <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-700 text-gray-300">
                                Free Plan
                            </span>
                        )}
                    </div>

                    <div className="p-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20 rounded-xl">
                        <div className="flex items-start justify-between">
                            <div className="space-y-2">
                                <h3 className="text-lg font-medium">
                                    {isPro ? "You are a Pro Member!" : "Upgrade to Pro"}
                                </h3>
                                <p className="text-gray-400 max-w-md">
                                    {isPro
                                        ? "Enjoy unlimited uploads, priority support, and exclusive access to AI features."
                                        : "Unlock unlimited uploads, AI features, and more with our Pro plan."}
                                </p>
                            </div>
                            <Shield className={`w-12 h-12 ${isPro ? "text-amber-400" : "text-gray-600"}`} />
                        </div>

                        {!isPro && (
                            <Link
                                href="/pricing"
                                className="mt-6 inline-flex items-center gap-2 bg-white text-black px-6 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors"
                            >
                                <Zap className="w-4 h-4 fill-black" />
                                Upgrade Now
                            </Link>
                        )}
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="pt-8">
                    <button
                        onClick={() => signOut({ callbackUrl: "/login" })}
                        className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
}
