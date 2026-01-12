"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";

interface Message {
    role: "user" | "model";
    parts: string;
}

export default function ChatPage() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMessage = input.trim();
        setInput("");
        setMessages((prev) => [...prev, { role: "user", parts: userMessage }]);
        setLoading(true);

        try {
            // Format history for Gemini API (excluding the current message)
            const history = messages.map(m => ({
                role: m.role,
                parts: [{ text: m.parts }]
            }));

            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMessage,
                    history: history
                }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Failed to send message");

            setMessages((prev) => [...prev, { role: "model", parts: data.response }]);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages((prev) => [
                ...prev,
                { role: "model", parts: "Sorry, I encountered an error. Please try again." },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
            {/* Header */}
            <header className="border-b border-white/10 p-4 bg-black/20 backdrop-blur-lg sticky top-0 z-10">
                <div className="max-w-4xl mx-auto flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg">
                        <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            AI Assistant
                        </h1>
                        <p className="text-xs text-gray-400">Powered by Gemini Pro</p>
                    </div>
                </div>
            </header>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 max-w-4xl mx-auto w-full pb-32">
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4 opacity-50">
                        <Bot className="w-16 h-16 text-purple-500" />
                        <h2 className="text-2xl font-bold">How can I help you today?</h2>
                        <p className="text-gray-400 max-w-md">
                            Ask me anything about your videos, coding, or general knowledge.
                        </p>
                    </div>
                )}

                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"
                            }`}
                    >
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === "user"
                                    ? "bg-blue-600"
                                    : "bg-purple-600"
                                }`}
                        >
                            {msg.role === "user" ? (
                                <User className="w-5 h-5" />
                            ) : (
                                <Bot className="w-5 h-5" />
                            )}
                        </div>
                        <div
                            className={`p-4 rounded-2xl max-w-[80%] ${msg.role === "user"
                                    ? "bg-blue-600/20 border border-blue-500/30 text-blue-100 rounded-tr-none"
                                    : "bg-purple-600/20 border border-purple-500/30 text-purple-100 rounded-tl-none"
                                }`}
                        >
                            <p className="whitespace-pre-wrap leading-relaxed">{msg.parts}</p>
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                            <Bot className="w-5 h-5" />
                        </div>
                        <div className="bg-purple-600/20 border border-purple-500/30 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                            <span className="text-sm text-purple-300">Thinking...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/90 to-transparent">
                <div className="max-w-4xl mx-auto">
                    <form
                        onSubmit={handleSend}
                        className="relative flex items-center gap-2 bg-[#1a1a1a] border border-white/10 rounded-xl p-2 shadow-2xl focus-within:border-purple-500/50 transition-colors"
                    >
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 px-4 py-3"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || loading}
                            className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </form>
                    <p className="text-center text-xs text-gray-600 mt-2">
                        AI can make mistakes. Consider checking important information.
                    </p>
                </div>
            </div>
        </div>
    );
}
