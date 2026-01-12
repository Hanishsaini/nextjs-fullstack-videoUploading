"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setLoginError("Invalid email or password");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      console.error("Login error:", err);
      setLoginError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6">
      <div className="bg-black/30 backdrop-blur-md p-10 rounded-2xl flex flex-col gap-8 w-full max-w-md shadow-lg border border-white/10">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to continue to your account</p>
        </div>

        {/* Error Message */}
        {(error || loginError) && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-3 rounded-lg flex items-center gap-2 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{loginError || "Authentication failed. Please try again."}</span>
          </div>
        )}

        {/* Google Sign In */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex items-center justify-center gap-3 bg-white text-black font-semibold py-3 rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
        >
          <Image src="/google.png" alt="Google Logo" width={24} height={24} />
          Sign in with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 text-gray-400 text-sm">
          <hr className="flex-1 border-white/20" />
          <span>or continue with email</span>
          <hr className="flex-1 border-white/20" />
        </div>

        {/* Email / Password Login */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="space-y-1">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-white/5 border border-white/10 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>
          <div className="space-y-1">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-white/5 border border-white/10 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg font-bold shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-gray-400 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-purple-400 hover:text-purple-300 font-semibold hover:underline">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
}
