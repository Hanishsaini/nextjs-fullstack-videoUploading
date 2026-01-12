"use client";

import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FileText, Send, CheckCircle2 } from "lucide-react";

export default function ApplyPage() {
    const applicationSteps = [
        "Fill out the application form below",
        "Submit your resume and portfolio (if applicable)",
        "Our team will review your application within 5-7 business days",
        "Selected candidates will be invited for an interview",
    ];

    return (
        <main className="min-h-screen bg-[#030014] text-white">
            <Navbar />

            <section className="pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-5xl">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-6">
                            <span className="text-purple-300 text-sm font-semibold">💼 Internship Application</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
                                Apply to Join
                            </span>
                            <br />
                            <span className="text-white">Vidora AI</span>
                        </h1>

                        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            We&apos;re excited to learn more about you! Fill out the form below to apply for our internship program.
                        </p>
                    </motion.div>

                    {/* Application Process */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="glass rounded-2xl p-8 border border-white/10 mb-12"
                    >
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <FileText className="w-6 h-6 text-purple-400" />
                            Application Process
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {applicationSteps.map((step, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold">
                                        {index + 1}
                                    </div>
                                    <p className="text-gray-300 text-sm">{step}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Google Form Embed */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="glass rounded-2xl p-8 border border-white/10 mb-12"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <Send className="w-6 h-6 text-purple-400" />
                                Application Form
                            </h2>
                        </div>

                        {/* Placeholder for Google Form */}
                        <div className="bg-white/5 rounded-xl p-8 border border-white/10 min-h-[600px] flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6">
                                <FileText className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Google Form Integration</h3>
                            <p className="text-gray-400 mb-6 max-w-md">
                                To complete the integration, please create a Google Form and replace the iframe below with your form&apos;s embed code.
                            </p>

                            {/* Instructions */}
                            <div className="glass rounded-xl p-6 max-w-2xl text-left">
                                <h4 className="font-bold mb-3 text-purple-300">How to add your Google Form:</h4>
                                <ol className="space-y-2 text-sm text-gray-300">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                                        <span>Create a Google Form at <a href="https://forms.google.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">forms.google.com</a></span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                                        <span>Click &quot;Send&quot; → Select the &quot;&lt;/&gt;&quot; (embed) option</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                                        <span>Copy the iframe code</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                                        <span>Replace the placeholder div in this file with your iframe</span>
                                    </li>
                                </ol>

                                <div className="mt-6 p-4 bg-black/30 rounded-lg">
                                    <p className="text-xs text-gray-400 mb-2">Example iframe code:</p>
                                    <code className="text-xs text-purple-300 break-all">
                                        {`<iframe src="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true" width="100%" height="800" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>`}
                                    </code>
                                </div>
                            </div>
                        </div>

                        {/* Uncomment and replace with your Google Form iframe */}
                        {/* 
            <iframe 
              src="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true" 
              width="100%" 
              height="800" 
              frameBorder="0" 
              marginHeight={0} 
              marginWidth={0}
              className="rounded-xl"
            >
              Loading…
            </iframe> 
            */}
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="text-center"
                    >
                        <p className="text-gray-400 mb-2">
                            Have questions about the application process?
                        </p>
                        <a
                            href="mailto:careers@vidora.ai"
                            className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                        >
                            careers@vidora.ai
                        </a>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
