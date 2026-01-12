// // "use client";
// // import { useRouter } from "next/navigation";
// // import React, { useState } from "react";

// // function RegisterPage() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [confirmPassword, setConfirmPassword] = useState("");
// //   const router = useRouter();

// //   const handleSumit = async (e: React.FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();
// //     if (password !== confirmPassword) {
// //       alert("passwords do not match");
// //       return;
// //     }

// //     try {
// //       // react-query
// //       // loading, error, debounce
// //       const res = await fetch("/api/auth/register", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           email,
// //           password,
// //         }),
// //       });
// //       const data = await res.json();

// //       if (!res.ok) {
// //         throw new Error(data.error || "Registration failed");
// //       }

// //       console.log(data);
// //       router.push("/login");
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };

// //   return (
// //     <div>
// //       <h1>Register</h1>
// //       <form onSubmit={handleSumit}>
// //         <input
// //           type="email"
// //           placeholder="Email"
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //         />
// //         <input
// //           type="password"
// //           placeholder="Password"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //         />
// //         <input
// //           type="password"
// //           placeholder="Confirm Password"
// //           value={confirmPassword}
// //           onChange={(e) => setConfirmPassword(e.target.value)}
// //         />
// //         <button type="submit">Register</button>
// //       </form>
// //       <div>
// //         <p>
// //           Already have an account? <a href="/login">Login</a>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// // export default RegisterPage;
// "use client";

// import { useState } from "react";
// import { signIn } from "next-auth/react";

// export default function RegisterPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();
//     // Normally here you will call an API route to create the user in MongoDB
//     await fetch("/api/auth/register", {
//       method: "POST",
//       body: JSON.stringify({ email, password }),
//       headers: { "Content-Type": "application/json" },
//     });

//     // After registering, log in automatically
//     await signIn("credentials", { email, password, callbackUrl: "/" });
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
//       <div className="bg-black/30 backdrop-blur-md p-10 rounded-2xl w-full max-w-md text-white flex flex-col gap-6 shadow-xl">
//         <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-500">
//           Create Account
//         </h1>
//         <form className="flex flex-col gap-4" onSubmit={handleRegister}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="bg-gray-900 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="bg-gray-900 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
//             required
//           />
//           <button
//             type="submit"
//             className="bg-pink-500 hover:bg-pink-400 transition-all duration-300 py-2 rounded-lg font-semibold text-black"
//           >
//             Register
//           </button>
//         </form>
//         <p className="text-gray-400 text-sm text-center">
//           Already have an account?{" "}
//           <a href="/login" className="text-pink-400 hover:underline">
//             Log In
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }
"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6">
      <div className="bg-black/30 backdrop-blur-md p-10 rounded-2xl flex flex-col gap-8 w-full max-w-md shadow-lg">
        <h1 className="text-3xl font-extrabold text-white text-center mb-6">
          Create Your Account
        </h1>

        {/* Google Sign Up */}
        <button
          onClick={() => signIn("google")}
          className="flex items-center justify-center gap-3 bg-white text-black font-semibold py-3 rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
        >
          <Image src="/google.png" alt="Google Logo" width={24} height={24} />
          Sign up with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 text-gray-400 text-sm">
          <hr className="flex-1 border-white/20" />
          <span>or</span>
          <hr className="flex-1 border-white/20" />
        </div>

        {/* Email / Password Registration */}
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="p-3 rounded-lg bg-white/10 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-lg bg-white/10 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-lg bg-white/10 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-400 py-3 rounded-lg font-bold text-black shadow-lg transition-all"
          >
            Sign Up
          </button>
        </form>

        <p className="text-gray-300 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-pink-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
